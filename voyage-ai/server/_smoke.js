const catalog = require('./data/destinationCatalog');
const { enrichWithCurrency } = require('./data/currencies');
const ai = require('./controllers/aiController');

async function main() {
  const all = Object.values(catalog).flat().filter(d => d && d.name);
  const find = (name) => all.find(d => d.name === name);
  const enrich = (d) => enrichWithCurrency({ ...d, _id: String(d.name) });

  const newDelhi = {
    _id: 'NewDelhi', name: 'New Delhi', country: 'India', continent: 'Asia',
    description: "New Delhi, India's capital, blends Mughal-era monuments with modern districts.",
    priceRange: '$', avgDailyBudget: 55, currency: 'INR',
    languages: ['Hindi', 'English'], timezone: 'IST (UTC+5:30)',
    bestTimeToVisit: 'October to March', climate: 'arid',
    tags: ['history', 'monuments', 'food', 'culture', 'bazaars'],
    highlights: ['Red Fort', 'India Gate', "Humayun's Tomb", 'Chandni Chowk'],
    safetyRating: 4, visaRequired: false,
    activities: [{ name: 'Old Delhi Food Walk', type: 'food', description: 'Street eats in Chandni Chowk', price: 8, duration: '3 hours', rating: 4.8 }]
  };

  const targets = ['Tokyo', 'Paris', 'Bali', 'Dubai', 'London', 'New York City'];
  const messages = [
    'What food should I try?',
    "What's the best way to get around?",
    'How much should I budget?',
    "What's the weather like?",
    'What is the nightlife like?',
    'Is it safe?',
    'Plan a trip for me',
  ];

  let pass = 0, fail = 0;
  for (const t of [...targets, 'New Delhi']) {
    const raw = find(t) || newDelhi;
    if (!raw) { console.log(`MISSING catalog entry: ${t}`); continue; }
    const d = enrich(raw);
    for (const m of messages) {
      const resp = await ai.generateAIResponse(m, 'assistant', {}, d, null, false);
      const ok = resp.toLowerCase().includes(d.name.toLowerCase());
      console.log(`${ok ? 'OK  ' : 'FAIL'} [${d.name}] ${m}${ok ? '' : '  --> ' + resp.split('\n')[0]}`);
      ok ? pass++ : fail++;
    }
  }

  const tokyo = enrich(find('Tokyo'));
  const kyoto = enrich(all.find(d => d.name === 'Kyoto'));
  const other = await ai.generateAIResponse('What about Kyoto?', 'assistant', {}, tokyo, kyoto, false);
  const otherOk = other.includes('Kyoto') && other.includes('keeping **Tokyo**');
  console.log(`${otherOk ? 'OK  ' : 'FAIL'} OTHER-DEST  -> ${other.replace(/\n/g, ' | ').slice(0, 160)}`);

  const switched = await ai.generateAIResponse('make Kyoto my destination', 'assistant', {}, kyoto, kyoto, true);
  const switchOk = switched.includes('**Kyoto, Japan**') && switched.includes('Destination: Kyoto, Japan');
  console.log(`${switchOk ? 'OK  ' : 'FAIL'} SWITCH      -> ${switched.split('\n')[0]}`);

  console.log(`\n== ${pass} passed, ${fail} failed ==`);
}

main().catch(e => { console.error(e); process.exit(1); });
