const AIConversation = require('../models/AIConversation');
const Destination = require('../models/Destination');
const Trip = require('../models/Trip');
const { enrichWithCurrency } = require('../data/currencies');

// ---------------------------------------------------------------------------
// Destination-aware AI helpers
// ---------------------------------------------------------------------------
// The assistant is simulated today (rule-based). All of this is structured so
// that when a real LLM is wired in later, the SAME destination context block
// (see buildDestinationBrief) becomes part of the model's system context —
// nothing in this file is hardcoded to any specific city.

const SUFFIX_CURRENCIES = ['NOK', 'ISK', 'XPF'];

// Convert a USD-denominated amount into the destination's local currency,
// mirroring the client-side formatter (server/data/currencies.js).
function formatLocal(usdValue, d) {
  const code = (d && d.currency) || 'USD';
  const rate = Number((d && d.currencyUsdRate)) || 1;
  const symbol = (d && d.currencySymbol) || '$';
  const amount = Math.round((Number(usdValue) || 0) * rate).toLocaleString('en-US');
  return SUFFIX_CURRENCIES.includes(code) ? `${amount} ${symbol}` : `${symbol}${amount}`;
}

// A compact, data-driven summary of the destination — this is the context block
// that would be handed to a real model provider.
function buildDestinationBrief(d) {
  if (!d) return 'Destination: unknown';
  const tags = (d.tags || []).slice(0, 4).join(', ');
  const highlights = (d.highlights || []).slice(0, 3).join('; ');
  const acts = (d.activities || []).slice(0, 3).map((a) => a.name).join('; ');
  return [
    `Destination: ${d.name}, ${d.country} (${d.continent || 'n/a'})`,
    `Climate: ${d.climate || 'n/a'} · Best time: ${d.bestTimeToVisit || 'n/a'}`,
    `Currency: ${d.currency || 'USD'} · Typical daily budget: ${formatLocal(d.avgDailyBudget, d)}`,
    `Safety rating: ${d.safetyRating != null ? `${d.safetyRating}/5` : 'n/a'}`,
    tags && `Tags: ${tags}`,
    highlights && `Highlights: ${highlights}`,
    acts && `Popular activities: ${acts}`,
  ].filter(Boolean).join('\n');
}

// Resolve the authoritative destination from the database. Never throws and
// never fails the request: invalid ids / deleted destinations collapse to the
// global (destination-less) fallback rather than crashing the conversation.
async function resolveDestination(destinationId) {
  if (!destinationId || typeof destinationId !== 'string') return null;
  try {
    const d = await Destination.findById(destinationId);
    if (!d) return null;
    return enrichWithCurrency(d.toObject ? d.toObject() : d);
  } catch {
    return null;
  }
}

// Whole-phrase, case-insensitive match — robust to surrounding punctuation
// (e.g. "what about Kyoto?" should match the destination name "Kyoto").
function hasWholeWord(text, phrase) {
  const needle = String(phrase || '').trim();
  if (!needle) return false;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i').test(text || '');
}

// Find any OTHER catalog destination explicitly named in the message. Used to
// answer "what about Kyoto?" without silently changing the active destination.
async function findMentionedDestination(message, activeId) {
  try {
    const active = activeId ? String(activeId) : null;
    const names = await Destination.find({}, 'name country').lean();
    const hit = names.find((d) => String(d._id) !== active && hasWholeWord(message, d.name));
    if (!hit) return null;
    const full = await Destination.findById(hit._id);
    return full ? enrichWithCurrency(full.toObject ? full.toObject() : full) : null;
  } catch {
    return null;
  }
}

// Does the message clearly switch focus to another destination (not just "what
// about X" — an explicit "make X my destination" style request)?
function isExplicitSwitch(lower) {
  return /\b(make|switch|switch to|focus on|move to|now planning)\b/.test(lower || '');
}

// @desc    Get AI conversations
// @route   GET /api/ai/conversations
exports.getConversations = async (req, res, next) => {
  try {
    const conversations = await AIConversation.find({ user: req.user.id, isActive: true })
      .sort({ updatedAt: -1 })
      .limit(20);
    res.status(200).json({ success: true, conversations });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single conversation
// @route   GET /api/ai/conversations/:id
exports.getConversation = async (req, res, next) => {
  try {
    const conversation = await AIConversation.findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }
    if (conversation.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.status(200).json({ success: true, conversation });
  } catch (error) {
    next(error);
  }
};

// @desc    Send message to AI assistant
// @route   POST /api/ai/chat
exports.chat = async (req, res, next) => {
  try {
    const { message, conversationId, type = 'assistant', destinationId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // Resolve the active destination from the authoritative database. We do NOT
    // trust arbitrary destination data sent from the client — only the id.
    let destination = await resolveDestination(destinationId);
    const mentioned = await findMentionedDestination(message, destination && destination._id);

    let conversation;
    if (conversationId) {
      conversation = await AIConversation.findById(conversationId);
      if (!conversation || conversation.user.toString() !== req.user.id) {
        return res.status(404).json({ success: false, message: 'Conversation not found' });
      }
    } else {
      conversation = await AIConversation.create({
        user: req.user.id,
        type,
        title: destination
          ? `${destination.name}: ${message.substring(0, 50)}...`
          : message.substring(0, 50) + '...',
        context: { destination: destination ? destination._id : null }
      });
    }

    // If the user clearly points at a named destination and switches focus,
    // adopt it as the active context. Otherwise asking about another
    // destination just answers about it while the primary context stays put.
    let switched = false;
    if (mentioned && (!destination || isExplicitSwitch(message.toLowerCase()))) {
      destination = mentioned;
      switched = true;
      conversation.context.destination = destination._id;
    } else if (destination) {
      // Persist the (possibly new) active destination for the whole conversation.
      conversation.context.destination = destination._id;
    }

    // Add user message
    conversation.messages.push({ role: 'user', content: message });

    // Generate AI response (simulated - replace with real AI provider). The
    // destination context block is data-driven and never hardcoded to a city.
    const aiResponse = await generateAIResponse(
      message, type, conversation.context, destination, mentioned, switched
    );

    // Add AI response
    conversation.messages.push({ role: 'assistant', content: aiResponse });
    await conversation.save();

    res.status(200).json({
      success: true,
      conversation,
      response: aiResponse,
      destination
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Plan trip with AI
// @route   POST /api/ai/plan-trip
exports.planTrip = async (req, res, next) => {
  try {
    const { destination, startDate, endDate, budget, travelers, preferences, travelStyle, interests } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate before computing the itinerary — bad dates produce NaN/negative
    // days and a broken trip record.
    if (!destination || isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ success: false, message: 'A valid destination, start date and end date are required' });
    }
    if (end <= start) {
      return res.status(400).json({ success: false, message: 'End date must be after the start date' });
    }
    const budgetNum = Number(budget);
    if (budget === undefined || budget === '' || isNaN(budgetNum) || budgetNum <= 0) {
      return res.status(400).json({ success: false, message: 'A positive numeric budget is required' });
    }

    const style = travelStyle || preferences || 'adventure';

    const dest = await Destination.findOne({
      $or: [
        { name: { $regex: destination, $options: 'i' } },
        { country: { $regex: destination, $options: 'i' } }
      ]
    });

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    // Generate trip plan (simulated AI response). Day dates anchor to the
    // trip's actual start date, not "now" — otherwise a plan made for October
    // ships an itinerary dated today.
    const itinerary = generateTripPlan(dest || { name: destination }, days, budgetNum, interests, style, start);

    // Create trip
    const trip = await Trip.create({
      user: req.user.id,
      title: `${destination} Adventure`,
      destination: dest?._id,
      destinationName: destination,
      startDate,
      endDate,
      budget: { total: budgetNum, currency: 'USD' },
      travelers: travelers || 1,
      itinerary,
      aiGenerated: true,
      status: 'planning'
    });

    res.status(201).json({ success: true, trip, itinerary });
  } catch (error) {
    next(error);
  }
};

// @desc    Optimize itinerary
// @route   POST /api/ai/optimize-itinerary
exports.optimizeItinerary = async (req, res, next) => {
  try {
    const { tripId } = req.body;
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    // Ownership check — otherwise any authenticated user could rewrite another
    // user's itinerary by guessing a trip id (IDOR).
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Simulated optimization
    const optimizedItinerary = trip.itinerary.map((day, index) => ({
      ...day,
      day: index + 1,
      activities: day.activities.sort((a, b) => {
        const timeA = a.time ? parseInt(a.time.replace(':', '')) : 0;
        const timeB = b.time ? parseInt(b.time.replace(':', '')) : 0;
        return timeA - timeB;
      })
    }));

    trip.itinerary = optimizedItinerary;
    await trip.save();

    res.status(200).json({ success: true, trip, message: 'Itinerary optimized successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI budget suggestions
// @route   POST /api/ai/budget-plan
exports.budgetPlan = async (req, res, next) => {
  try {
    const { destination, duration, budget, style } = req.body;

    const suggestions = {
      accommodation: Math.round(budget * 0.30),
      transportation: Math.round(budget * 0.20),
      food: Math.round(budget * 0.25),
      activities: Math.round(budget * 0.15),
      shopping: Math.round(budget * 0.05),
      other: Math.round(budget * 0.05),
      tips: [
        'Book accommodations early for better rates',
        'Use public transportation to save on travel costs',
        'Try local street food for authentic and affordable meals',
        'Look for free walking tours and activities',
        'Set aside 10% of your budget as emergency fund'
      ]
    };

    res.status(200).json({ success: true, budgetPlan: suggestions });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI packing list
// @route   POST /api/ai/packing-list
exports.packingList = async (req, res, next) => {
  try {
    const { destination, duration, activities: actList, climate } = req.body;

    const packingList = {
      essentials: ['Passport', 'Travel insurance', 'Phone & charger', 'Wallet', 'Medications'],
      clothing: climate === 'tropical'
        ? ['Light shirts', 'Shorts', 'Swimwear', 'Sandals', 'Sun hat', 'Light jacket']
        : climate === 'cold'
        ? ['Winter coat', 'Thermal layers', 'Gloves', 'Scarf', 'Boots', 'Warm socks']
        : ['T-shirts', 'Jeans', 'Light jacket', 'Comfortable shoes', 'Sneakers'],
      tech: ['Phone charger', 'Power bank', 'Headphones', 'Camera', 'Travel adapter'],
      toiletries: ['Toothbrush', 'Sunscreen', 'Insect repellent', 'Basic first aid kit', 'Hand sanitizer'],
      documents: ['Passport', 'Visa (if required)', 'Travel insurance', 'Hotel confirmations', 'Flight tickets']
    };

    res.status(200).json({ success: true, packingList });
  } catch (error) {
    next(error);
  }
};

// Helper functions

// Destination-aware answer — used when we know which destination the user is
// asking about. The `brief` is the compact data-driven context block that
// would be handed to a real LLM in production.
function destinationAnswer(message, destination) {
  const brief = buildDestinationBrief(destination);
  const d = destination;
  const budget = formatLocal(d.avgDailyBudget, d);
  const lower = message.toLowerCase();

  if (lower.includes('budget') || lower.includes('cost') || lower.includes('how much')) {
    return [
      `**Daily budget for ${d.name}**`,
      '',
      `A comfortable daily budget in **${d.name}** is around **${budget}**.`,
      `That typically breaks down into accommodation, local transport, food and a couple of activities.`,
      '',
      '**Tips to save:**',
      `- Eat where locals eat — street stalls and markets are usually ${formatLocal(Math.round(d.avgDailyBudget * 0.12), d)}–${formatLocal(Math.round(d.avgDailyBudget * 0.18), d)} per meal.`,
      `- Use public transit — a single ride in ${d.name} is typically ${formatLocal(1.5, d)}–${formatLocal(4, d)}.`,
      `- Book accommodation in advance during ${d.bestTimeToVisit || 'high season'}.`,
      '',
      'Would you like a full budget breakdown or a trip plan?',
    ].join('\n');
  }

  if (lower.includes('pack') || lower.includes('luggage')) {
    const climateNote = d.climate === 'tropical'
      ? 'Light, breathable fabrics — think shorts, swimwear, sandals and a rain jacket.'
      : d.climate === 'cold'
      ? 'Layer up: thermal base, fleece, waterproof outer shell, warm boots and gloves.'
      : d.climate === 'arid'
      ? 'Sun protection is key — hat, sunglasses, high SPF sunscreen and plenty of layers for cool evenings.'
      : 'Pack versatile layers you can mix and match throughout the day.';
    return [
      `**Packing list for ${d.name}**`,
      '',
      climateNote,
      '',
      '**Don\'t forget:**',
      `- Passport & travel insurance${d.visaRequired ? ' (visa required for ' + d.country + ')' : ''}`,
      '- Phone charger, power bank and travel adapter',
      '- Comfortable walking shoes',
      '- Any medications and basic first-aid supplies',
      '',
      'Want a full itemised packing list for your trip dates?',
    ].join('\n');
  }

  if (lower.includes('best time') || lower.includes('when to visit') || lower.includes('weather')) {
    return [
      `**Best time to visit ${d.name}**`,
      '',
      `${d.name} is best visited **${d.bestTimeToVisit || 'year-round'}**.`,
      `Climate: ${d.climate || 'varies'} · ${d.timezone || ''}`,
      '',
      d.highlights?.length
        ? `Top highlights to aim for: ${d.highlights.slice(0, 3).join(', ')}.`
        : '',
      '',
      'Want me to plan an itinerary for your dates?',
    ].filter(Boolean).join('\n');
  }

  if (lower.includes('itinerary') || lower.includes('plan') || lower.includes('schedule')) {
    return [
      `**Trip plan for ${d.name}**`,
      '',
      `I can build a day-by-day itinerary for **${d.name}** — just tell me:`,
      '1. Your travel dates',
      '2. Your budget',
      '3. What you\'re most into (adventure, food, culture, nightlife, relaxation)',
      '',
      d.highlights?.length
        ? `Must-sees in ${d.name}: ${d.highlights.slice(0, 4).join(', ')}.`
        : '',
      d.activities?.length
        ? `Popular activities: ${d.activities.slice(0, 3).map(a => a.name).join(', ')}.`
        : '',
    ].filter(Boolean).join('\n');
  }

  if (lower.includes('safety') || lower.includes('safe')) {
    const rating = d.safetyRating != null ? `${d.safetyRating}/5` : 'N/A';
    return [
      `**Safety in ${d.name}**`,
      '',
      `Safety rating: **${rating}**`,
      '',
      'General tips:',
      '- Keep digital and physical copies of important documents.',
      '- Stay aware of your surroundings, especially in crowded areas.',
      '- Use licensed taxis or reputable ride-sharing services.',
      `- Keep emergency contacts handy — in ${d.country}, dial the local emergency number.`,
      '',
      d.visaRequired
        ? `Note: A visa is required for entry into ${d.country}.`
        : `No visa is typically required for ${d.country}.`,
    ].join('\n');
  }

  if (lower.includes('food') || lower.includes('eat') || lower.includes('restaurant')) {
    const tags = (d.tags || []).filter(t => ['food', 'street-food', 'culinary', 'restaurants'].includes(t));
    return [
      `**Food in ${d.name}**`,
      '',
      `Exploring local food is a highlight of any trip to ${d.name}!`,
      tags.length ? `Known for: ${tags.join(', ')}.` : '',
      '',
      'Tips:',
      '- Ask locals for their favourite spots — the best meals are often off the tourist trail.',
      '- Street food markets are great for budget-friendly, authentic dishes.',
      `- Budget roughly ${formatLocal(Math.round(d.avgDailyBudget * 0.25), d)}–${formatLocal(Math.round(d.avgDailyBudget * 0.35), d)} per day for food.`,
      '',
      d.activities?.length
        ? `A popular food-related activity: ${d.activities.find(a => /food|eat|dining|culinary/i.test(a.name))?.name || d.activities[0].name}.`
        : '',
    ].filter(Boolean).join('\n');
  }

  if (lower.includes('transport') || lower.includes('get around') || lower.includes('commute')) {
    return [
      `**Getting around ${d.name}**`,
      '',
      `${d.name} in ${d.country} is best explored by`,
      d.tags?.includes('compact') ? 'walking — the city centre is very walkable.' : 'a mix of public transport and walking.',
      '',
      'Tips:',
      '- Buy a day-pass for public transit if available.',
      '- Ride-share apps are a convenient fallback.',
      `- Budget around ${formatLocal(3, d)}–${formatLocal(10, d)} per trip for local transport.`,
    ].join('\n');
  }

  // Fallback for destination context
  return [
    `**${d.name}, ${d.country}**`,
    '',
    d.description || '',
    '',
    `Average daily budget: ${budget} · Climate: ${d.climate || 'varies'}`,
    d.highlights?.length ? `Highlights: ${d.highlights.slice(0, 3).join(', ')}` : '',
    '',
    'Ask me about food, budget, safety, packing, or planning a trip!',
  ].filter(Boolean).join('\n');
}

// Global (no destination) fallback answer.
function globalAnswer(message) {
  const lower = message.toLowerCase();

  if (lower.includes('budget') || lower.includes('cost') || lower.includes('cheap')) {
    return "I'd recommend budgeting around $50–100 per day for a comfortable trip. This includes accommodation ($20–50), food ($15–30), transport ($5–15), and activities ($10–25). Tell me a destination and I'll give you a tailored breakdown.";
  }
  if (lower.includes('pack') || lower.includes('luggage')) {
    return "For packing, I always recommend the essentials: comfortable walking shoes, weather-appropriate clothing layers, a portable charger, and a small daypack. Tell me where you're headed and I'll customise a list for you.";
  }
  if (lower.includes('best time') || lower.includes('when')) {
    return "The best time to visit depends on the destination! Generally, shoulder seasons (just before or after peak) offer the best balance of good weather and fewer crowds. Which destination are you interested in?";
  }
  if (lower.includes('itinerary') || lower.includes('plan') || lower.includes('schedule')) {
    return "I can help you create a personalised itinerary! Just tell me your destination, travel dates, and interests (adventure, culture, food, nightlife, relaxation), and I'll craft a day-by-day plan.";
  }
  if (lower.includes('safety') || lower.includes('safe')) {
    return "Safety tips for any trip: keep copies of important documents, stay aware of your surroundings, use trusted transport services, and keep emergency contacts handy. Tell me your destination for specific advice.";
  }
  if (lower.includes('food') || lower.includes('eat') || lower.includes('restaurant')) {
    return "Exploring local cuisine is one of the best parts of travel! I recommend trying street food for authentic flavours, asking locals for their favourite spots, and using food apps to find highly-rated restaurants. Which destination are you visiting?";
  }

  return [
    "I'm your AI travel assistant! I can help you with:",
    '',
    '• **Trip Planning** – Create personalised itineraries',
    '• **Budget Optimisation** – Smart spending suggestions',
    '• **Packing Lists** – Customised for your destination',
    '• **Local Recommendations** – Food, activities, attractions',
    '• **Safety Tips** – Stay safe while travelling',
    '',
    'Tell me a destination to get started!',
  ].join('\n');
}

async function generateAIResponse(message, type, context, destination, mentioned, switched) {
  const lowerMsg = message.toLowerCase();

  // If the user explicitly switched destination, answer about the NEW one.
  if (switched && mentioned) {
    return destinationAnswer(message, mentioned);
  }

  // If the user asked about another destination without switching, answer
  // about that destination while noting the active context stays the same.
  if (mentioned && destination && mentioned._id !== destination._id) {
    const otherResp = destinationAnswer(message, mentioned);
    return `${otherResp}\n\n---\n*Keeping **${destination.name}** as your active destination. Say "make ${mentioned.name} my destination" to switch.*`;
  }

  // If we have an active destination, use the destination-aware answer.
  if (destination) {
    return destinationAnswer(message, destination);
  }

  // No destination context — global fallback.
  return globalAnswer(message);
}

function generateTripPlan(destination, days, budget, interests, style, start) {
  const itinerary = [];
  const dailyBudget = Math.round(budget / days);
  const startDate = new Date(start);
  const name = destination.name || 'your destination';
  const highlights = destination.highlights || [];
  const activities = destination.activities || [];
  const tagPool = destination.tags || [];

  // Map Destination activity types to Trip itinerary activity categories
  const categoryMap = {
    adventure: 'activity',
    cultural: 'sightseeing',
    relaxation: 'sightseeing',
    food: 'food',
    nightlife: 'activity',
    nature: 'sightseeing',
    shopping: 'shopping',
    sightseeing: 'sightseeing'
  };

  const dayThemes = [
    'Arrival & Orientation',
    'Culture & History',
    'Adventure & Nature',
    'Local Food & Markets',
    'Hidden Gems',
    'Relaxation & Leisure',
    'Full-Day Excursion',
    'Art & Architecture',
    'Coastal & Scenic',
    'Shopping & Nightlife',
    'Wildlife & Outdoors',
    'Day Trip',
  ];

  for (let i = 1; i <= days; i++) {
    const theme = dayThemes[(i - 1) % dayThemes.length];
    const highlight = highlights[i - 1] || highlights[i % highlights.length] || name;
    const matchingActivity = activities.length
      ? activities[(i - 1) % activities.length]
      : null;

    itinerary.push({
      day: i,
      date: new Date(startDate.getTime() + (i - 1) * 24 * 60 * 60 * 1000),
      title: `Day ${i} — ${theme}: ${highlight}`,
      activities: [
        {
          time: '08:00',
          title: 'Breakfast at a local spot',
          description: `Kick off the day near ${name}`,
          category: 'food',
          cost: Math.round(dailyBudget * 0.1),
          completed: false
        },
        {
          time: '10:00',
          title: matchingActivity ? matchingActivity.name : `Explore ${highlight}`,
          description: matchingActivity
            ? matchingActivity.description || `Experience ${matchingActivity.name}`
            : `Discover the best of ${highlight} in ${name}`,
          category: matchingActivity ? (categoryMap[matchingActivity.type] || 'sightseeing') : 'sightseeing',
          cost: matchingActivity ? matchingActivity.price : Math.round(dailyBudget * 0.3),
          completed: false
        },
        {
          time: '13:00',
          title: interests?.includes('local cuisine') ? 'Local Cuisine Experience' : 'Lunch',
          description: interests?.includes('local cuisine')
            ? `Taste authentic dishes at a recommended restaurant in ${name}`
            : `Enjoy a well-rated restaurant in the area`,
          category: 'food',
          cost: Math.round(dailyBudget * 0.15),
          completed: false
        },
        {
          time: '15:00',
          title: style === 'adventure' ? 'Afternoon Expedition' : style === 'relaxation' ? 'Relaxation Session' : style === 'cultural' ? 'Museum or Gallery Visit' : 'Afternoon Activity',
          description: `Afternoon activity: ${tagPool.length ? tagPool[i % tagPool.length] : theme}`,
          category: 'activity',
          cost: Math.round(dailyBudget * 0.25),
          completed: false
        },
        {
          time: '19:00',
          title: style === 'romantic' ? 'Candlelight Dinner' : interests?.includes('nightlife') ? 'Dinner & Night Out' : 'Dinner',
          description: `Evening dining in ${name}`,
          category: 'food',
          cost: Math.round(dailyBudget * 0.15),
          completed: false
        }
      ],
      notes: i === days ? 'Pack up and prepare for departure' : ''
    });
  }
  return itinerary;
}

// Exported for testing / reuse — not part of the API surface.
module.exports.generateAIResponse = generateAIResponse;
module.exports.buildDestinationBrief = buildDestinationBrief;
module.exports.formatLocal = formatLocal;
module.exports.destinationAnswer = destinationAnswer;
module.exports.globalAnswer = globalAnswer;
module.exports.findMentionedDestination = findMentionedDestination;
module.exports.isExplicitSwitch = isExplicitSwitch;
