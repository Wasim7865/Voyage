/**
 * Voyage AI — Centralized Destination Catalog
 * ============================================
 *
 * This is the single source of truth for all destination data. It is imported
 * by the seed script (server/seed/seed.js) and inserted into MongoDB.
 * No destination is hardcoded anywhere in the UI — everything is served
 * through the destinations API.
 *
 * HOW TO ADD A DESTINATION
 * ------------------------
 * 1. Add an object to the region array that matches its continent below.
 * 2. Every field in the Mongoose schema (server/models/Destination.js) is
 *    required for a complete card + detail page. At minimum provide:
 *    name, country, continent, description, shortDescription, image,
 *    images, rating, reviewCount, priceRange, avgDailyBudget, currency,
 *    languages, timezone, bestTimeToVisit, climate, tags, highlights,
 *    coordinates, safetyRating and activities.
 * 3. Make sure `image` is a working images.unsplash.com URL that actually
 *    depicts the destination (local photos). Run the image checker in
 *    scripts/check-destination-images.js after adding new ones.
 * 4. Keep `name` unique — duplicates will be rejected by the seed import.
 *
 * Fields:
 * - priceRange:  '$' | '$$' | '$$$' | '$$$$'
 * - climate:     'tropical' | 'temperate' | 'arid' | 'mediterranean' |
 *                'continental' | 'polar' | 'monsoon'
 * - activity.type: 'adventure' | 'cultural' | 'relaxation' | 'food' |
 *                'nightlife' | 'nature' | 'shopping' | 'sightseeing'
 */

const asia = [
  /* ------------------------ INDONESIA ------------------------ */
  {
    name: 'Bali',
    country: 'Indonesia',
    continent: 'Asia',
    description: 'Bali, known as the Island of the Gods, offers a perfect blend of stunning beaches, ancient temples, lush rice terraces, and vibrant arts culture. From the spiritual heart of Ubud to the beach clubs of Seminyak and the dramatic cliffs of Uluwatu, Bali captivates every visitor.',
    shortDescription: 'Tropical paradise with rich culture, stunning beaches, and ancient temples',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 2847,
    priceRange: '$$',
    avgDailyBudget: 75,
    currency: 'IDR',
    languages: ['Indonesian', 'English'],
    timezone: 'WITA (UTC+8)',
    bestTimeToVisit: 'April to October (dry season)',
    climate: 'tropical',
    tags: ['beach', 'temples', 'culture', 'surfing', 'rice-terraces', 'yoga'],
    highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Seminyak Beach', 'Mount Batur Sunrise Trek', 'Uluwatu Temple'],
    coordinates: { lat: -8.3405, lng: 115.092 },
    safetyRating: 4,
    featured: true,
    trending: true,
    featuredOrder: 1,
    activities: [
      { name: 'Tegallalang Rice Terrace Walk', type: 'nature', description: 'Walk through stunning terraced rice paddies', price: 15, duration: '3 hours', rating: 4.7 },
      { name: 'Mount Batur Sunrise Trek', type: 'adventure', description: 'Trek to the summit for a breathtaking sunrise', price: 45, duration: '8 hours', rating: 4.8 },
      { name: 'Uluwatu Temple & Kecak Dance', type: 'cultural', description: 'Visit clifftop temple and watch traditional dance', price: 20, duration: '4 hours', rating: 4.6 },
      { name: 'Seminyak Beach Club Day', type: 'relaxation', description: 'Enjoy world-class beach clubs', price: 50, duration: '6 hours', rating: 4.5 }
    ]
  },

  /* -------------------------- JAPAN -------------------------- */
  {
    name: 'Tokyo',
    country: 'Japan',
    continent: 'Asia',
    description: 'Tokyo seamlessly blends ultramodern with traditional, from neon-lit skyscrapers to historic temples. The city offers incredible food, cutting-edge technology, beautiful gardens, and a fascinating cultural experience that seamlessly weaves ancient traditions with futuristic innovation.',
    shortDescription: 'Where tradition meets innovation - temples, tech, and incredible cuisine',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 4201,
    priceRange: '$$$',
    avgDailyBudget: 120,
    currency: 'JPY',
    languages: ['Japanese', 'English'],
    timezone: 'JST (UTC+9)',
    bestTimeToVisit: 'March to May (cherry blossoms) and October to November',
    climate: 'temperate',
    tags: ['culture', 'food', 'technology', 'anime', 'temples', 'shopping'],
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Tsukiji Outer Market', 'Meiji Shrine', 'Akihabara'],
    coordinates: { lat: 35.6762, lng: 139.6503 },
    safetyRating: 5,
    featured: true,
    trending: true,
    featuredOrder: 3,
    activities: [
      { name: 'Tsukiji Outer Market Tour', type: 'food', description: 'Explore the famous food market', price: 80, duration: '3 hours', rating: 4.8 },
      { name: 'TeamLab Borderless', type: 'cultural', description: 'Immersive digital art museum', price: 30, duration: '3 hours', rating: 4.7 },
      { name: 'Cherry Blossom Viewing', type: 'nature', description: 'Hanami in Ueno Park', price: 0, duration: '2 hours', rating: 4.9 }
    ]
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    continent: 'Asia',
    description: 'Kyoto, Japan\'s cultural heart, is home to over 1,600 Buddhist temples, 400 Shinto shrines, and the breathtaking Fushimi Inari shrine. Wander through bamboo forests, geisha districts in Gion, and golden pavilions for an immersive journey into traditional Japan.',
    shortDescription: 'Japan\'s ancient capital of temples, shrines, and tranquil bamboo groves',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 3728,
    priceRange: '$$$',
    avgDailyBudget: 110,
    currency: 'JPY',
    languages: ['Japanese', 'English'],
    timezone: 'JST (UTC+9)',
    bestTimeToVisit: 'March to May and October to November',
    climate: 'temperate',
    tags: ['temples', 'culture', 'history', 'garden', 'food', 'photography'],
    highlights: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji', 'Gion District', 'Nijo Castle'],
    coordinates: { lat: 35.0116, lng: 135.7681 },
    safetyRating: 5,
    trending: true,
    activities: [
      { name: 'Fushimi Inari Shrine Walk', type: 'cultural', description: 'Hike through thousands of torii gates', price: 0, duration: '3 hours', rating: 4.9 },
      { name: 'Tea Ceremony Experience', type: 'cultural', description: 'Traditional matcha ceremony in Gion', price: 40, duration: '1 hour', rating: 4.8 },
      { name: 'Gion Evening Walk', type: 'sightseeing', description: 'Spot geisha in the historic district', price: 0, duration: '2 hours', rating: 4.7 }
    ]
  },

  /* --------------------- UNITED ARAB EMIRATES --------------------- */
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    continent: 'Asia',
    description: 'Dubai is a city of superlatives, home to the world\'s tallest building, largest mall, and most luxurious hotels. This futuristic city in the desert offers incredible shopping, adventure activities, stunning architecture, and a vibrant nightlife scene.',
    shortDescription: 'Futuristic desert city of superlatives - luxury, adventure, and innovation',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 3421,
    priceRange: '$$$$',
    avgDailyBudget: 180,
    currency: 'AED',
    languages: ['Arabic', 'English'],
    timezone: 'GST (UTC+4)',
    bestTimeToVisit: 'November to March',
    climate: 'arid',
    tags: ['luxury', 'shopping', 'architecture', 'desert', 'nightlife', 'beaches'],
    highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Desert Safari', 'Dubai Marina'],
    coordinates: { lat: 25.2048, lng: 55.2708 },
    safetyRating: 5,
    featured: true,
    featuredOrder: 6,
    activities: [
      { name: 'Burj Khalifa Observation Deck', type: 'sightseeing', description: 'Visit the world\'s tallest building', price: 40, duration: '2 hours', rating: 4.7 },
      { name: 'Desert Safari Adventure', type: 'adventure', description: 'Dune bashing and camel riding', price: 85, duration: '6 hours', rating: 4.8 },
      { name: 'Dubai Frame Visit', type: 'cultural', description: 'See old and new Dubai from a stunning frame', price: 15, duration: '1.5 hours', rating: 4.5 }
    ]
  },

  /* ------------------------- MALDIVES ------------------------- */
  {
    name: 'Maldives',
    country: 'Maldives',
    continent: 'Asia',
    description: 'The Maldives is a tropical paradise of crystal-clear waters, overwater bungalows, pristine white-sand beaches, and vibrant coral reefs. Perfect for honeymooners and luxury travelers seeking an idyllic escape.',
    shortDescription: 'Ultimate tropical luxury - overwater villas and crystal-clear lagoons',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 1892,
    priceRange: '$$$$',
    avgDailyBudget: 350,
    currency: 'MVR',
    languages: ['Dhivehi', 'English'],
    timezone: 'MVT (UTC+5)',
    bestTimeToVisit: 'November to April',
    climate: 'tropical',
    tags: ['beach', 'luxury', 'honeymoon', 'diving', 'romance', 'overwater-villa'],
    highlights: ['Overwater Bungalow', 'Snorkeling with Manta Rays', 'Sunset Dolphin Cruise', 'Underwater Restaurant', 'Private Island Dinner'],
    coordinates: { lat: 3.2028, lng: 73.2207 },
    safetyRating: 5,
    featured: true,
    featuredOrder: 8,
    activities: [
      { name: 'Scuba Diving with Whale Sharks', type: 'adventure', description: 'Dive with gentle giants of the ocean', price: 200, duration: '4 hours', rating: 4.9 },
      { name: 'Sunset Dolphin Cruise', type: 'relaxation', description: 'Watch dolphins play at sunset', price: 60, duration: '2 hours', rating: 4.8 },
      { name: 'Spa & Wellness Day', type: 'relaxation', description: 'Indulge in overwater spa treatments', price: 150, duration: '5 hours', rating: 4.9 }
    ]
  },

  /* -------------------------- INDIA -------------------------- */
  {
    name: 'Jaipur',
    country: 'India',
    continent: 'Asia',
    description: 'Jaipur, the Pink City of Rajasthan, dazzles with honey-hued palaces, hilltop forts, and vibrant bazaars. From the iconic Hawa Mahal to the majestic Amber Fort, the city offers a royal experience steeped in Rajput history and incredible local cuisine.',
    shortDescription: 'The romantic Pink City of Rajasthan - forts, palaces, and vibrant bazaars',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
      'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 2310,
    priceRange: '$$',
    avgDailyBudget: 60,
    currency: 'INR',
    languages: ['Hindi', 'English'],
    timezone: 'IST (UTC+5:30)',
    bestTimeToVisit: 'October to March',
    climate: 'arid',
    tags: ['history', 'culture', 'city', 'heritage', 'food', 'shopping'],
    highlights: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar', 'Bapu Bazaar'],
    coordinates: { lat: 26.9124, lng: 75.7873 },
    safetyRating: 4,
    trending: true,
    activities: [
      { name: 'Amber Fort Elephant Ride', type: 'cultural', description: 'Arrive at the majestic fort like a maharaja', price: 25, duration: '4 hours', rating: 4.7 },
      { name: 'Pink City Heritage Walk', type: 'sightseeing', description: 'Explore Hawa Mahal and old bazaars', price: 10, duration: '3 hours', rating: 4.6 },
      { name: 'Royal Rajasthani Thali Dinner', type: 'food', description: 'Feast on traditional Rajasthani cuisine', price: 15, duration: '2 hours', rating: 4.8 }
    ]
  },
  {
    name: 'Agra',
    country: 'India',
    continent: 'Asia',
    description: 'Agra is home to the world\'s most iconic monument of love — the Taj Mahal. Beyond the marble masterpiece, discover the red-sandstone Agra Fort and Fatehpur Sikri, and taste the legendary petha sweets that have made the city famous.',
    shortDescription: 'Home of the Taj Mahal - India\'s most iconic monument of love',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 4015,
    priceRange: '$$',
    avgDailyBudget: 55,
    currency: 'INR',
    languages: ['Hindi', 'English'],
    timezone: 'IST (UTC+5:30)',
    bestTimeToVisit: 'October to March',
    climate: 'arid',
    tags: ['history', 'heritage', 'architecture', 'culture', 'romance', 'photography'],
    highlights: ['Taj Mahal at Sunrise', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh', 'Taj Museum'],
    coordinates: { lat: 27.1767, lng: 78.0081 },
    safetyRating: 4,
    activities: [
      { name: 'Taj Mahal Sunrise Tour', type: 'sightseeing', description: 'Watch the marble glow at dawn', price: 13, duration: '3 hours', rating: 4.9 },
      { name: 'Agra Fort Exploration', type: 'cultural', description: 'Roam the UNESCO red-sandstone fort', price: 6, duration: '3 hours', rating: 4.6 },
      { name: 'Mehtab Bagh Sunset View', type: 'relaxation', description: 'Best view of the Taj across the river', price: 3, duration: '1 hour', rating: 4.7 }
    ]
  },
  {
    name: 'Varanasi',
    country: 'India',
    continent: 'Asia',
    description: 'Varanasi, one of the world\'s oldest living cities, is a deeply spiritual epicenter on the banks of the Ganges. Witness the mesmerizing Ganga Aarti at Dashashwamedh Ghat, take a sunrise boat ride, and wander winding lanes lined with ancient temples.',
    shortDescription: 'The spiritual heart of India on the sacred Ganges river',
    image: 'https://images.unsplash.com/photo-1715193678341-31634700f56b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1715193678341-31634700f56b?w=800&q=80',
      'https://images.unsplash.com/photo-1561359313-0639aad49ca6?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 1988,
    priceRange: '$',
    avgDailyBudget: 35,
    currency: 'INR',
    languages: ['Hindi', 'English'],
    timezone: 'IST (UTC+5:30)',
    bestTimeToVisit: 'November to February',
    climate: 'monsoon',
    tags: ['culture', 'spiritual', 'history', 'river', 'photography', 'budget'],
    highlights: ['Ganga Aarti Ceremony', 'Sunrise Boat Ride', 'Kashi Vishwanath Temple', 'Sarnath', 'Assi Ghat'],
    coordinates: { lat: 25.3176, lng: 82.9739 },
    safetyRating: 3,
    activities: [
      { name: 'Sunrise Ganges Boat Ride', type: 'sightseeing', description: 'Float past ghats as the city wakes', price: 8, duration: '2 hours', rating: 4.8 },
      { name: 'Ganga Aarti Evening', type: 'cultural', description: 'Witness the fire ritual at the ghats', price: 0, duration: '2 hours', rating: 4.9 },
      { name: 'Kashi Vishwanath Darshan', type: 'cultural', description: 'Visit the sacred golden temple', price: 5, duration: '2 hours', rating: 4.6 }
    ]
  },
  {
    name: 'Kerala Backwaters',
    country: 'India',
    continent: 'Asia',
    description: 'The Kerala backwaters are a serene network of lagoons, lakes, and canals stretching along the Malabar coast. Drift through palm-fringed waterways on a traditional houseboat, dine on fresh seafood, and unwind in one of God\'s Own Country\'s tranquil villages.',
    shortDescription: 'Serene palm-fringed houseboat cruises through tropical lagoons',
    image: 'https://images.unsplash.com/photo-1677475455506-1e429162f44f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1677475455506-1e429162f44f?w=800&q=80',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 1432,
    priceRange: '$$',
    avgDailyBudget: 55,
    currency: 'INR',
    languages: ['Malayalam', 'Hindi', 'English'],
    timezone: 'IST (UTC+5:30)',
    bestTimeToVisit: 'September to March',
    climate: 'tropical',
    tags: ['nature', 'relaxation', 'backwaters', 'hidden-gem', 'romance', 'houseboat'],
    highlights: ['Alleppey Houseboat Cruise', 'Kumarakom Bird Sanctuary', 'Vembanad Lake', 'Kochi Fort', 'Ayurvedic Spa'],
    coordinates: { lat: 9.4981, lng: 76.3388 },
    safetyRating: 4,
    activities: [
      { name: 'Houseboat Overnight Cruise', type: 'relaxation', description: 'Sleep on the tranquil backwaters', price: 120, duration: '24 hours', rating: 4.9 },
      { name: 'Kumarakom Bird Sanctuary', type: 'nature', description: 'Spot migratory birds at dawn', price: 5, duration: '2 hours', rating: 4.5 },
      { name: 'Kochi Heritage Walk', type: 'cultural', description: 'Chinese fishing nets and colonial lanes', price: 10, duration: '3 hours', rating: 4.6 }
    ]
  },
  {
    name: 'Goa',
    country: 'India',
    continent: 'Asia',
    description: 'Goa is India\'s beach paradise — 60 miles of golden sand, Portuguese-era churches, and a relaxed counter-culture vibe. Party at legendary beach shacks in Baga, watch hippie sunsets at Anjuna, and savor vindaloo on a shoestring budget.',
    shortDescription: 'India\'s sun-soaked beach paradise with Portuguese heritage',
    image: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=800&q=80',
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80'
    ],
    rating: 4.5,
    reviewCount: 2876,
    priceRange: '$',
    avgDailyBudget: 45,
    currency: 'INR',
    languages: ['Konkani', 'Hindi', 'English'],
    timezone: 'IST (UTC+5:30)',
    bestTimeToVisit: 'November to February',
    climate: 'tropical',
    tags: ['beach', 'budget', 'nightlife', 'party', 'water-sports', 'food'],
    highlights: ['Baga Beach', 'Old Goa Churches', 'Dudhsagar Falls', 'Anjuna Flea Market', 'Palolem Beach'],
    coordinates: { lat: 15.2993, lng: 74.124 },
    safetyRating: 4,
    activities: [
      { name: 'Water Sports at Baga', type: 'adventure', description: 'Parasailing, jet skiing and more', price: 30, duration: '3 hours', rating: 4.5 },
      { name: 'Old Goa Church Tour', type: 'cultural', description: 'Visit Se Cathedral and Basilica', price: 5, duration: '3 hours', rating: 4.6 },
      { name: 'Goan Seafood Market Dinner', type: 'food', description: 'Fresh catch by the beach', price: 15, duration: '2 hours', rating: 4.7 }
    ]
  },
  {
    name: 'Ladakh',
    country: 'India',
    continent: 'Asia',
    description: 'Ladakh, the "Land of High Passes", is a breathtaking high-altitude desert in the Himalayas. Turquoise lakes like Pangong Tso, dramatic mountain passes, ancient monasteries clinging to cliffs, and adventure routes for road-trippers make it a dream destination.',
    shortDescription: 'High-altitude Himalayan desert of turquoise lakes and ancient monasteries',
    image: 'https://images.unsplash.com/photo-1577499960887-4f418444b8dc?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1577499960887-4f418444b8dc?w=800&q=80',
      'https://images.unsplash.com/photo-1648851460314-ba293ba2cdcf?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 1204,
    priceRange: '$$$',
    avgDailyBudget: 100,
    currency: 'INR',
    languages: ['Ladakhi', 'Hindi', 'English'],
    timezone: 'IST (UTC+5:30)',
    bestTimeToVisit: 'June to September',
    climate: 'continental',
    tags: ['mountains', 'adventure', 'nature', 'photography', 'monasteries', 'road-trip'],
    highlights: ['Pangong Tso Lake', 'Khardung La Pass', 'Thiksey Monastery', 'Nubra Valley', 'Leh Palace'],
    coordinates: { lat: 34.1526, lng: 77.5771 },
    safetyRating: 4,
    activities: [
      { name: 'Sham Valley Monastery Drive', type: 'cultural', description: 'Visit cliff-hanging monasteries', price: 30, duration: '6 hours', rating: 4.7 },
      { name: 'Pangong Lake Day Trip', type: 'nature', description: 'The blue lake from 3 Idiots', price: 60, duration: '10 hours', rating: 4.9 },
      { name: 'Khardung La High Pass', type: 'adventure', description: 'One of the world\'s highest roads', price: 40, duration: '8 hours', rating: 4.8 }
    ]
  },
  {
    name: 'Udaipur',
    country: 'India',
    continent: 'Asia',
    description: 'Udaipur, the Venice of the East, is a city of shimmering lakes and marble palaces. The Lake Pichola, the floating Lake Palace, and the hilltop Monsoon Palace create a romantic fairytale setting straight out of a James Bond film.',
    shortDescription: 'The romantic City of Lakes with floating marble palaces',
    image: 'https://images.unsplash.com/photo-1695956353120-54ce5e91632b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1695956353120-54ce5e91632b?w=800&q=80',
      'https://images.unsplash.com/photo-1589901164570-f9de6556e1c1?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 1756,
    priceRange: '$$',
    avgDailyBudget: 65,
    currency: 'INR',
    languages: ['Hindi', 'English'],
    timezone: 'IST (UTC+5:30)',
    bestTimeToVisit: 'October to March',
    climate: 'arid',
    tags: ['romance', 'lakes', 'palace', 'history', 'culture', 'luxury'],
    highlights: ['Lake Pichola Sunset Cruise', 'City Palace', 'Jag Mandir', 'Hawa Mahal Viewpoint', 'Monsoon Palace'],
    coordinates: { lat: 24.5854, lng: 73.7125 },
    safetyRating: 4,
    activities: [
      { name: 'Lake Pichola Boat Ride', type: 'relaxation', description: 'Sunset cruise past shimmering temples', price: 10, duration: '1.5 hours', rating: 4.9 },
      { name: 'City Palace Tour', type: 'cultural', description: 'Explore the grand Mewar seat', price: 8, duration: '3 hours', rating: 4.6 },
      { name: 'Bagore Ki Haveli Dance Show', type: 'nightlife', description: 'Traditional Rajasthani folk evening', price: 5, duration: '2 hours', rating: 4.7 }
    ]
  },
  {
    name: 'Rishikesh',
    country: 'India',
    continent: 'Asia',
    description: 'Rishikesh, the yoga capital of the world, nestles in the Himalayan foothills on the banks of the Ganges. White-water rafting, cliff jumping, Beatles ashram history, and sunrise meditation combine adventure with spirituality in one unforgettable town.',
    shortDescription: 'Yoga, white-water rafting, and spirituality in the Himalayan foothills',
    image: 'https://images.unsplash.com/photo-1724864814923-548d7fd5f42e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1724864814923-548d7fd5f42e?w=800&q=80',
      'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 987,
    priceRange: '$',
    avgDailyBudget: 35,
    currency: 'INR',
    languages: ['Hindi', 'English'],
    timezone: 'IST (UTC+5:30)',
    bestTimeToVisit: 'September to June',
    climate: 'monsoon',
    tags: ['adventure', 'yoga', 'spiritual', 'river-rafting', 'budget', 'nature'],
    highlights: ['Ganges River Rafting', 'Lakshman Jhula Bridge', 'Triveni Ghat Aarti', 'Neelkanth Temple Trek', 'Parmarth Niketan'],
    coordinates: { lat: 30.0869, lng: 78.2676 },
    safetyRating: 4,
    activities: [
      { name: 'White-Water Rafting', type: 'adventure', description: 'Rapid-filled ride on the Ganges', price: 25, duration: '3 hours', rating: 4.8 },
      { name: 'Yoga Class at Sunrise', type: 'relaxation', description: 'River-view meditation & asana', price: 10, duration: '2 hours', rating: 4.7 },
      { name: 'Triveni Ghat Aarti', type: 'cultural', description: 'Evening fire ceremony on the ghats', price: 0, duration: '1 hour', rating: 4.8 }
    ]
  },
  {
    name: 'Andaman Islands',
    country: 'India',
    continent: 'Asia',
    description: 'The Andaman Islands are India\'s answer to the Maldives — powder-white beaches, crystal-clear turquoise water, and coral reefs teeming with marine life. Radhanagar Beach is regularly ranked among the best beaches in Asia.',
    shortDescription: 'India\'s tropical island escape with world-class beaches and reefs',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 1103,
    priceRange: '$$',
    avgDailyBudget: 70,
    currency: 'INR',
    languages: ['Hindi', 'Bengali', 'Tamil', 'English'],
    timezone: 'IST (UTC+5:30)',
    bestTimeToVisit: 'October to May',
    climate: 'tropical',
    tags: ['beach', 'diving', 'nature', 'hidden-gem', 'island', 'snorkeling'],
    highlights: ['Radhanagar Beach', 'Havelock Island', 'Scuba Diving', 'Ross Island', 'Cellular Jail'],
    coordinates: { lat: 11.7401, lng: 92.6586 },
    safetyRating: 4,
    activities: [
      { name: 'Scuba Diving at Havelock', type: 'adventure', description: 'Discover vibrant coral gardens', price: 60, duration: '4 hours', rating: 4.9 },
      { name: 'Radhanagar Beach Sunset', type: 'relaxation', description: 'Walk Asia\'s best beach', price: 0, duration: '3 hours', rating: 4.9 },
      { name: 'Cellular Jail Light Show', type: 'cultural', description: 'Freedom-fighter history with sound', price: 5, duration: '1.5 hours', rating: 4.5 }
    ]
  },
  {
    name: 'Manali',
    country: 'India',
    continent: 'Asia',
    description: 'Manali is a charming Himalayan hill station in Himachal Pradesh, draped in pine forests and snow-capped peaks. From Solang Valley adventure sports to old-town temples and apple orchards, it is the perfect budget mountain getaway.',
    shortDescription: 'Snowy Himalayan hill station of adventures and cozy mountain charm',
    image: 'https://images.unsplash.com/photo-1606667544139-81e47935d769?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1606667544139-81e47935d769?w=800&q=80',
      'https://images.unsplash.com/photo-1646125212667-e538ef46ca66?w=800&q=80'
    ],
    rating: 4.5,
    reviewCount: 1784,
    priceRange: '$',
    avgDailyBudget: 40,
    currency: 'INR',
    languages: ['Hindi', 'English', 'Pahari'],
    timezone: 'IST (UTC+5:30)',
    bestTimeToVisit: 'October to June',
    climate: 'continental',
    tags: ['mountains', 'adventure', 'budget', 'snow', 'nature', 'trekking'],
    highlights: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple', 'Old Manali', 'Kullu Rafting'],
    coordinates: { lat: 32.2396, lng: 77.1887 },
    safetyRating: 4,
    activities: [
      { name: 'Solang Valley Paragliding', type: 'adventure', description: 'Soar over snow-clad valleys', price: 45, duration: '1 hour', rating: 4.7 },
      { name: 'Hadimba Temple & Old Town Walk', type: 'cultural', description: 'Explore quirky cafes and cedar temple', price: 5, duration: '3 hours', rating: 4.5 },
      { name: 'Snow Trek at Rohtang Pass', type: 'adventure', description: 'Play in the high-altitude snow', price: 35, duration: '6 hours', rating: 4.6 }
    ]
  },

  /* ------------------------- SOUTH KOREA ------------------------- */
  {
    name: 'Seoul',
    country: 'South Korea',
    continent: 'Asia',
    description: 'Seoul is a mega-city where 600-year-old palaces meet K-pop neon and high-tech districts. Browse Myeongdong street food, hike the fortress walls of Bukchon, and experience the vibrant café culture that has made the city a global trendsetter.',
    shortDescription: 'K-pop, palaces, and neon-lit streets in Korea\'s dynamic capital',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80',
      'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 2650,
    priceRange: '$$$',
    avgDailyBudget: 110,
    currency: 'KRW',
    languages: ['Korean', 'English'],
    timezone: 'KST (UTC+9)',
    bestTimeToVisit: 'March to May and September to November',
    climate: 'temperate',
    tags: ['city', 'culture', 'food', 'shopping', 'nightlife', 'technology'],
    highlights: ['Gyeongbokgung Palace', 'N Seoul Tower', 'Myeongdong Shopping', 'Bukchon Hanok Village', 'Hongdae Nightlife'],
    coordinates: { lat: 37.5665, lng: 126.978 },
    safetyRating: 5,
    activities: [
      { name: 'Gyeongbokgung Palace Tour', type: 'cultural', description: 'Watch the guard-changing ceremony', price: 3, duration: '3 hours', rating: 4.7 },
      { name: 'Myeongdong Street Food', type: 'food', description: 'Sample tteokbokki and skewers', price: 15, duration: '2 hours', rating: 4.8 },
      { name: 'N Seoul Tower Night View', type: 'sightseeing', description: 'Lock of love and city lights', price: 10, duration: '2 hours', rating: 4.6 }
    ]
  },

  /* ------------------------- SINGAPORE ------------------------- */
  {
    name: 'Singapore',
    country: 'Singapore',
    continent: 'Asia',
    description: 'Singapore is a dazzling city-state where futuristic gardens, hawker centres, and colonial heritage sit side by side. Marvel at the Supertrees of Gardens by the Bay, feast on Michelin-starred street food, and sail down the neon-lit Singapore River.',
    shortDescription: 'Futuristic city-state of supertrees, hawker feasts, and harbor lights',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 3120,
    priceRange: '$$$$',
    avgDailyBudget: 140,
    currency: 'SGD',
    languages: ['English', 'Malay', 'Mandarin', 'Tamil'],
    timezone: 'SGT (UTC+8)',
    bestTimeToVisit: 'February to April',
    climate: 'tropical',
    tags: ['city', 'luxury', 'food', 'architecture', 'shopping', 'clean'],
    highlights: ['Gardens by the Bay', 'Marina Bay Sands', 'Singapore Botanic Gardens', 'Sentosa Island', 'Chinatown'],
    coordinates: { lat: 1.3521, lng: 103.8198 },
    safetyRating: 5,
    activities: [
      { name: 'Gardens by the Bay Light Show', type: 'sightseeing', description: 'Supertree Grove evening spectacle', price: 0, duration: '2 hours', rating: 4.9 },
      { name: 'Hawker Centre Food Tour', type: 'food', description: 'Michelin-starred street eats', price: 20, duration: '3 hours', rating: 4.8 },
      { name: 'Singapore River Cruise', type: 'relaxation', description: 'Glide past colonial & modern skyline', price: 22, duration: '1 hour', rating: 4.5 }
    ]
  },

  /* ------------------------- THAILAND ------------------------- */
  {
    name: 'Bangkok',
    country: 'Thailand',
    continent: 'Asia',
    description: 'Bangkok is a chaotic, thrilling metropolis of golden temples, floating markets, and the world\'s best street food. Glide along the Chao Phraya, bargain in Chatuchak, and experience a city that never stops moving.',
    shortDescription: 'Golden temples, floating markets, and unforgettable street food',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 3450,
    priceRange: '$',
    avgDailyBudget: 50,
    currency: 'THB',
    languages: ['Thai', 'English'],
    timezone: 'ICT (UTC+7)',
    bestTimeToVisit: 'November to February',
    climate: 'tropical',
    tags: ['city', 'food', 'budget', 'temples', 'nightlife', 'culture'],
    highlights: ['Grand Palace', 'Wat Pho', 'Chatuchak Market', 'Boat Ride on Chao Phraya', 'Khao San Road'],
    coordinates: { lat: 13.7563, lng: 100.5018 },
    safetyRating: 4,
    activities: [
      { name: 'Grand Palace & Wat Pho', type: 'cultural', description: 'Emerald Buddha & Reclining Buddha', price: 15, duration: '4 hours', rating: 4.8 },
      { name: 'Chao Phraya Boat Tour', type: 'sightseeing', description: 'Cruise past river temples', price: 20, duration: '2 hours', rating: 4.5 },
      { name: 'Street Food Night Market', type: 'food', description: 'Pad thai, mango sticky rice & more', price: 12, duration: '3 hours', rating: 4.9 }
    ]
  },
  {
    name: 'Chiang Mai',
    country: 'Thailand',
    continent: 'Asia',
    description: 'Chiang Mai, the rose of the north, surrounds itself with misty mountains, ancient temples, and friendly elephants. Take part in the magical Yi Peng lantern festival, trek through jungle hill towns, and recharge at coffee shops by the Ping River.',
    shortDescription: 'Northern Thailand\'s temple-filled mountain city with misty charm',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80',
      'https://images.unsplash.com/photo-1582118315324-a1af6b1c0582?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 2208,
    priceRange: '$',
    avgDailyBudget: 45,
    currency: 'THB',
    languages: ['Thai', 'English'],
    timezone: 'ICT (UTC+7)',
    bestTimeToVisit: 'November to February',
    climate: 'tropical',
    tags: ['temples', 'mountains', 'budget', 'culture', 'elephants', 'adventure'],
    highlights: ['Doi Suthep Temple', 'Yi Peng Lantern Festival', 'Elephant Sanctuary', 'Old City Walled Streets', 'Sunday Night Market'],
    coordinates: { lat: 18.7883, lng: 98.9853 },
    safetyRating: 4,
    activities: [
      { name: 'Doi Suthep Sunrise Visit', type: 'cultural', description: 'Golden temple above the clouds', price: 6, duration: '4 hours', rating: 4.9 },
      { name: 'Ethical Elephant Sanctuary Day', type: 'nature', description: 'Feed and walk with rescued elephants', price: 70, duration: '6 hours', rating: 4.9 },
      { name: 'Old City Temple Walk', type: 'sightseeing', description: 'Wat Chedi Luang and more', price: 0, duration: '3 hours', rating: 4.6 }
    ]
  },

  /* ------------------------- VIETNAM ------------------------- */
  {
    name: 'Hoi An',
    country: 'Vietnam',
    continent: 'Asia',
    description: 'Hoi An is a perfectly preserved trading port whose lantern-lit streets glow amber at dusk. Tailor shops, ancient wooden houses, the Japanese Covered Bridge, and cooking classes on the Thu Bon river make it Vietnam\'s most photogenic town.',
    shortDescription: 'Ancient lantern-lit trading town fabled for tailor shops and cuisine',
    image: 'https://images.unsplash.com/photo-1694391744914-8d82068cb46f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1694391744914-8d82068cb46f?w=800&q=80',
      'https://images.unsplash.com/photo-1563354860-799d15199ac3?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 1435,
    priceRange: '$',
    avgDailyBudget: 40,
    currency: 'VND',
    languages: ['Vietnamese', 'English'],
    timezone: 'ICT (UTC+7)',
    bestTimeToVisit: 'February to April',
    climate: 'monsoon',
    tags: ['history', 'budget', 'culture', 'lanterns', 'food', 'romance'],
    highlights: ['Japanese Covered Bridge', 'Ancient Town Lanterns', 'An Bang Beach', 'Tailor Shops', 'My Son Sanctuary'],
    coordinates: { lat: 15.8801, lng: 108.338 },
    safetyRating: 4,
    activities: [
      { name: 'Lantern Boat Ride', type: 'relaxation', description: 'Float lanterns on the Thu Bon', price: 5, duration: '1 hour', rating: 4.8 },
      { name: 'Vietnamese Cooking Class', type: 'food', description: 'Make cao lau and spring rolls', price: 25, duration: '3 hours', rating: 4.7 },
      { name: 'Tailor Shop Visit', type: 'shopping', description: 'Bespoke suit in 48 hours', price: 60, duration: '3 hours', rating: 4.5 }
    ]
  },

  /* ------------------------- CAMBODIA ------------------------- */
  {
    name: 'Siem Reap',
    country: 'Cambodia',
    continent: 'Asia',
    description: 'Siem Reap is the gateway to Angkor, the magnificent Khmer temple complex including the legendary Angkor Wat. Ride tuk-tuks between jungle temples, watch sunrise over the ancient city, and discover a charming riverside town of fusion cuisine.',
    shortDescription: 'Gateway to the majestic temples of Angkor Wat',
    image: 'https://images.unsplash.com/photo-1599283787923-51b965a58b05?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1599283787923-51b965a58b05?w=800&q=80',
      'https://images.unsplash.com/photo-1566706546199-a93ba33ce9f7?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 1901,
    priceRange: '$',
    avgDailyBudget: 48,
    currency: 'KHR',
    languages: ['Khmer', 'English'],
    timezone: 'ICT (UTC+7)',
    bestTimeToVisit: 'November to March',
    climate: 'tropical',
    tags: ['history', 'heritage', 'budget', 'adventure', 'culture', 'photography'],
    highlights: ['Angkor Wat Sunrise', 'Bayon Temple', 'Ta Prohm (Tomb Raider)', 'Angkor Thom', 'Pub Street'],
    coordinates: { lat: 13.3679, lng: 103.855 },
    safetyRating: 4,
    trending: true,
    activities: [
      { name: 'Angkor Wat Sunrise Tour', type: 'cultural', description: 'Iconic reflection at dawn', price: 37, duration: '5 hours', rating: 4.9 },
      { name: 'Ta Prohm Jungle Temple', type: 'adventure', description: 'Strangler figs over ruins', price: 37, duration: '3 hours', rating: 4.8 },
      { name: 'Bike the Angkor Circuit', type: 'adventure', description: 'Ride between ancient temples', price: 20, duration: '8 hours', rating: 4.6 }
    ]
  },

  /* ------------------------- SRI LANKA ------------------------- */
  {
    name: 'Galle',
    country: 'Sri Lanka',
    continent: 'Asia',
    description: 'Galle is a walled colonial town on Sri Lanka\'s south coast, where Dutch ramparts meet palm-fringed beaches. Walk the ramparts at sunset, watch stilt fishermen, and pair the town with nearby rainforests and whale-watching in Mirissa.',
    shortDescription: 'Colonial walled town on Sri Lanka\'s palm-fringed south coast',
    image: 'https://images.unsplash.com/photo-1654561773591-57b9413c45c0?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1654561773591-57b9413c45c0?w=800&q=80',
      'https://images.unsplash.com/photo-1767710048839-4bead77ab4a5?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 883,
    priceRange: '$',
    avgDailyBudget: 45,
    currency: 'LKR',
    languages: ['Sinhala', 'Tamil', 'English'],
    timezone: 'IST (UTC+5:30)',
    bestTimeToVisit: 'December to March',
    climate: 'tropical',
    tags: ['history', 'beach', 'hidden-gem', 'budget', 'culture', 'sunset'],
    highlights: ['Galle Fort Ramparts', 'Light House Beach', 'Stilt Fishermen', 'Mirissa Whale Watching', 'Dutch Reformed Church'],
    coordinates: { lat: 6.0326, lng: 80.218 },
    safetyRating: 4,
    activities: [
      { name: 'Fort Rampart Sunset Walk', type: 'sightseeing', description: 'Colonial walls over the ocean', price: 0, duration: '2 hours', rating: 4.8 },
      { name: 'Whale Watching in Mirissa', type: 'adventure', description: 'Blue whales off the south coast', price: 50, duration: '5 hours', rating: 4.7 },
      { name: 'Stilt Fishermen Visit', type: 'cultural', description: 'Iconic fishing technique photo op', price: 5, duration: '1 hour', rating: 4.4 }
    ]
  }
];

const europe = [
  /* ------------------------- GREECE ------------------------- */
  {
    name: 'Santorini',
    country: 'Greece',
    continent: 'Europe',
    description: 'Santorini is a crescent-shaped volcanic island famous for its dramatic views, stunning sunsets, white-washed buildings with blue domes, and crystal-clear waters. The island offers a romantic atmosphere, delicious Mediterranean cuisine, and unforgettable caldera views.',
    shortDescription: 'Iconic Greek island with stunning sunsets and blue-domed churches',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 3156,
    priceRange: '$$$',
    avgDailyBudget: 150,
    currency: 'EUR',
    languages: ['Greek', 'English'],
    timezone: 'EET (UTC+2)',
    bestTimeToVisit: 'May to October',
    climate: 'mediterranean',
    tags: ['romance', 'sunsets', 'beaches', 'architecture', 'wine', 'photography'],
    highlights: ['Oia Sunset', 'Red Beach', 'Caldera View', 'Wine Tasting Tour', 'Fira Town'],
    coordinates: { lat: 36.3932, lng: 25.4615 },
    safetyRating: 5,
    featured: true,
    trending: true,
    featuredOrder: 2,
    activities: [
      { name: 'Oia Sunset Viewing', type: 'sightseeing', description: 'Watch the famous Santorini sunset from Oia', price: 0, duration: '2 hours', rating: 4.9 },
      { name: 'Caldera Sailing Tour', type: 'adventure', description: 'Sail around the volcanic caldera', price: 120, duration: '5 hours', rating: 4.8 },
      { name: 'Wine Tasting Tour', type: 'food', description: 'Sample Assyrtiko wines at local wineries', price: 65, duration: '4 hours', rating: 4.7 }
    ]
  },
  {
    name: 'Mykonos',
    country: 'Greece',
    continent: 'Europe',
    description: 'Mykonos is the glamorous party island of the Cyclades — windmills, whitewashed lanes, and dazzling beach clubs. By day swim at Paradise Beach; by night dance until sunrise in Little Venice beneath the windmill silhouette.',
    shortDescription: 'Glamorous Greek party island of windmills and beach clubs',
    image: 'https://images.unsplash.com/photo-1669842360697-c7eba7310a85?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1669842360697-c7eba7310a85?w=800&q=80',
      'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 1430,
    priceRange: '$$$',
    avgDailyBudget: 145,
    currency: 'EUR',
    languages: ['Greek', 'English'],
    timezone: 'EET (UTC+2)',
    bestTimeToVisit: 'June to September',
    climate: 'mediterranean',
    tags: ['beach', 'nightlife', 'luxury', 'party', 'romance', 'city'],
    highlights: ['Little Venice', 'Kastro Windmills', 'Paradise Beach', 'Delos Island', 'Matoyianni Street'],
    coordinates: { lat: 37.4467, lng: 25.3289 },
    safetyRating: 5,
    activities: [
      { name: 'Paradise Beach Day', type: 'relaxation', description: 'Iconic beach club scene', price: 20, duration: '6 hours', rating: 4.6 },
      { name: 'Delos Archaeological Tour', type: 'cultural', description: 'Sacred island birthplace of Apollo', price: 40, duration: '5 hours', rating: 4.7 },
      { name: 'Little Venice Sunset', type: 'nightlife', description: 'Cocktails over the Aegean', price: 25, duration: '3 hours', rating: 4.8 }
    ]
  },

  /* ----------------------- SWITZERLAND ----------------------- */
  {
    name: 'Swiss Alps',
    country: 'Switzerland',
    continent: 'Europe',
    description: 'The Swiss Alps offer some of the most spectacular mountain scenery in the world. With charming villages, world-class skiing, scenic train rides, and pristine lakes, this destination is a paradise for nature lovers and adventure seekers.',
    shortDescription: 'Majestic mountains, pristine lakes, and world-class skiing',
    image: 'https://images.unsplash.com/photo-1507039915464-9d829b6d2d78?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507039915464-9d829b6d2d78?w=800&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 2105,
    priceRange: '$$$$',
    avgDailyBudget: 200,
    currency: 'CHF',
    languages: ['German', 'French', 'Italian', 'English'],
    timezone: 'CET (UTC+1)',
    bestTimeToVisit: 'December to March (skiing) and June to September (hiking)',
    climate: 'continental',
    tags: ['mountains', 'skiing', 'hiking', 'nature', 'luxury', 'scenic-trains'],
    highlights: ['Matterhorn', 'Jungfraujoch', 'Lake Geneva', 'Glacier Express', 'Interlaken'],
    coordinates: { lat: 46.8182, lng: 8.2275 },
    safetyRating: 5,
    featured: true,
    featuredOrder: 4,
    activities: [
      { name: 'Glacier Express Ride', type: 'adventure', description: 'Scenic train through the Alps', price: 150, duration: '8 hours', rating: 4.9 },
      { name: 'Jungfraujoch Excursion', type: 'adventure', description: 'Visit the Top of Europe', price: 180, duration: '6 hours', rating: 4.8 },
      { name: 'Paragliding in Interlaken', type: 'adventure', description: 'Tandem paragliding over the Alps', price: 200, duration: '1 hour', rating: 4.9 }
    ]
  },

  /* ------------------------- FRANCE ------------------------- */
  {
    name: 'Paris',
    country: 'France',
    continent: 'Europe',
    description: 'Paris, the City of Light, enchants visitors with its iconic landmarks, world-class art museums, romantic atmosphere, and exquisite cuisine. From the Eiffel Tower to the Louvre, Montmartre to the Champs-Élysées, Paris is timeless.',
    shortDescription: 'The City of Light - romance, art, cuisine, and iconic landmarks',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 6102,
    priceRange: '$$$',
    avgDailyBudget: 160,
    currency: 'EUR',
    languages: ['French', 'English'],
    timezone: 'CET (UTC+1)',
    bestTimeToVisit: 'April to June and October to November',
    climate: 'temperate',
    tags: ['romance', 'art', 'food', 'architecture', 'fashion', 'museums'],
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Montmartre', 'Seine River Cruise'],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    safetyRating: 4,
    featured: true,
    featuredOrder: 7,
    activities: [
      { name: 'Eiffel Tower Visit', type: 'sightseeing', description: 'Ascend the iconic iron tower', price: 26, duration: '2 hours', rating: 4.8 },
      { name: 'Louvre Museum Tour', type: 'cultural', description: 'See the Mona Lisa and thousands of masterpieces', price: 17, duration: '4 hours', rating: 4.7 },
      { name: 'Seine River Cruise', type: 'relaxation', description: 'Romantic cruise past illuminated landmarks', price: 15, duration: '1 hour', rating: 4.6 }
    ]
  },

  /* -------------------------- ITALY -------------------------- */
  {
    name: 'Rome',
    country: 'Italy',
    continent: 'Europe',
    description: 'Rome, the Eternal City, layers 2,500 years of history across cobbled streets, ancient ruins, and baroque piazzas. Throw a coin in the Trevi Fountain, stand before the Colosseum, and explore the Vatican\'s staggering art collections.',
    shortDescription: 'The Eternal City of ancient ruins, Vatican treasures, and la dolce vita',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
      'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 5510,
    priceRange: '$$$',
    avgDailyBudget: 130,
    currency: 'EUR',
    languages: ['Italian', 'English'],
    timezone: 'CET (UTC+1)',
    bestTimeToVisit: 'April to June and September to October',
    climate: 'mediterranean',
    tags: ['history', 'culture', 'food', 'architecture', 'art', 'city'],
    highlights: ['Colosseum', 'Vatican Museums', 'Trevi Fountain', 'Pantheon', 'Roman Forum'],
    coordinates: { lat: 41.9028, lng: 12.4964 },
    safetyRating: 4,
    trending: true,
    activities: [
      { name: 'Colosseum & Forum Tour', type: 'cultural', description: 'Gladiator arena and ancient Rome', price: 32, duration: '4 hours', rating: 4.8 },
      { name: 'Vatican Museums & Sistine Chapel', type: 'cultural', description: 'Michelangelo and Raphael masterpieces', price: 25, duration: '4 hours', rating: 4.9 },
      { name: 'Trastevere Food Walk', type: 'food', description: 'Porchetta, gelato and pasta', price: 45, duration: '3 hours', rating: 4.8 }
    ]
  },
  {
    name: 'Venice',
    country: 'Italy',
    continent: 'Europe',
    description: 'Venice is a dreamlike city built on 100 small islands threaded by canals. Glide beneath the Rialto Bridge, wander the maze of San Marco, and get lost in the serenity of hidden courtyards and gondola-filled waterways.',
    shortDescription: 'Romantic floating city of canals, gondolas, and priceless art',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 4215,
    priceRange: '$$$',
    avgDailyBudget: 135,
    currency: 'EUR',
    languages: ['Italian', 'English'],
    timezone: 'CET (UTC+1)',
    bestTimeToVisit: 'April to June and September to October',
    climate: 'mediterranean',
    tags: ['romance', 'architecture', 'history', 'art', 'city', 'photography'],
    highlights: ['St. Mark\'s Square', 'Rialto Bridge', 'Grand Canal', 'Doge\'s Palace', 'Burano Island'],
    coordinates: { lat: 45.4408, lng: 12.3155 },
    safetyRating: 5,
    activities: [
      { name: 'Gondola Ride', type: 'relaxation', description: 'Drift through narrow canals', price: 80, duration: '30 minutes', rating: 4.7 },
      { name: 'St Mark\'s & Doge\'s Palace', type: 'cultural', description: 'Venetian Gothic masterpieces', price: 30, duration: '3 hours', rating: 4.7 },
      { name: 'Murano & Burano Trip', type: 'sightseeing', description: 'Glassblowing and rainbow houses', price: 20, duration: '4 hours', rating: 4.6 }
    ]
  },
  {
    name: 'Amalfi Coast',
    country: 'Italy',
    continent: 'Europe',
    description: 'The Amalfi Coast is a dazzling ribbon of cliffside villages, lemon groves, and turquoise coves along southern Italy. Wind down the famous road from Positano to Ravello and savor limoncello overlooking the Tyrrhenian Sea.',
    shortDescription: 'Cliff-hugging Mediterranean villages strung along turquoise coves',
    image: 'https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=800&q=80',
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 2764,
    priceRange: '$$$',
    avgDailyBudget: 145,
    currency: 'EUR',
    languages: ['Italian', 'English'],
    timezone: 'CET (UTC+1)',
    bestTimeToVisit: 'May to September',
    climate: 'mediterranean',
    tags: ['beach', 'romance', 'luxury', 'food', 'scenic', 'coastline'],
    highlights: ['Positano', 'Amalfi Old Town', 'Ravello Gardens', 'Path of the Gods', 'Capri Boat Trip'],
    coordinates: { lat: 40.634, lng: 14.6028 },
    safetyRating: 4,
    activities: [
      { name: 'Path of the Gods Hike', type: 'adventure', description: 'Cliff-top trail with sea views', price: 10, duration: '4 hours', rating: 4.9 },
      { name: 'Capri Day Cruise', type: 'relaxation', description: 'Blue Grotto and Faraglioni rocks', price: 60, duration: '6 hours', rating: 4.8 },
      { name: 'Lemon Grove & Limoncello Tour', type: 'food', description: 'Taste the coast\'s signature liqueur', price: 15, duration: '2 hours', rating: 4.6 }
    ]
  },

  /* -------------------------- SPAIN -------------------------- */
  {
    name: 'Barcelona',
    country: 'Spain',
    continent: 'Europe',
    description: 'Barcelona pairs sun-soaked beaches with surreal Gaudí architecture. Marvel at the still-unfinished Sagrada Família, stroll the Gothic Quarter, munch tapas on Las Ramblas, and watch the city from the terraces of Park Güell.',
    shortDescription: 'Sun-soaked Catalan city of Gaudí masterpieces and tapas',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 4369,
    priceRange: '$$',
    avgDailyBudget: 120,
    currency: 'EUR',
    languages: ['Catalan', 'Spanish', 'English'],
    timezone: 'CET (UTC+1)',
    bestTimeToVisit: 'May to June and September',
    climate: 'mediterranean',
    tags: ['architecture', 'beach', 'food', 'nightlife', 'art', 'city'],
    highlights: ['Sagrada Família', 'Park Güell', 'Gothic Quarter', 'Casa Batlló', 'Barceloneta Beach'],
    coordinates: { lat: 41.3874, lng: 2.1686 },
    safetyRating: 4,
    activities: [
      { name: 'Sagrada Família Guided Tour', type: 'cultural', description: 'Gaudí\'s breathtaking basilica', price: 30, duration: '3 hours', rating: 4.9 },
      { name: 'Gothic Quarter Food Walk', type: 'food', description: 'Tapas crawl through medieval lanes', price: 50, duration: '3 hours', rating: 4.7 },
      { name: 'Barceloneta Beach Day', type: 'relaxation', description: 'Sand, sea, and beachfront paella', price: 20, duration: '5 hours', rating: 4.5 }
    ]
  },

  /* ------------------------- PORTUGAL ------------------------- */
  {
    name: 'Lisbon',
    country: 'Portugal',
    continent: 'Europe',
    description: 'Lisbon climbs seven hills above the Tagus river, a city of sun-bleached facades, vintage yellow trams, and fado music. Ride Tram 28 through Alfama, gape at Belém Tower, and try the custard tarts that made Pastéis de Belém famous.',
    shortDescription: 'Hillside European capital of trams, fado, and custard tarts',
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80',
      'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 2211,
    priceRange: '$$',
    avgDailyBudget: 95,
    currency: 'EUR',
    languages: ['Portuguese', 'English'],
    timezone: 'WET (UTC+0)',
    bestTimeToVisit: 'March to May and September to October',
    climate: 'mediterranean',
    tags: ['city', 'culture', 'food', 'budget', 'history', 'music'],
    highlights: ['Alfama District', 'Belém Tower', 'Jerónimos Monastery', 'Tram 28', 'Rossio Square'],
    coordinates: { lat: 38.7223, lng: -9.1393 },
    safetyRating: 4,
    activities: [
      { name: 'Tram 28 Ride', type: 'sightseeing', description: 'Wooden tram through the hills', price: 3, duration: '1 hour', rating: 4.7 },
      { name: 'Fado Night in Alfama', type: 'nightlife', description: 'Traditional Portuguese blues', price: 25, duration: '3 hours', rating: 4.8 },
      { name: 'Pastéis de Belém Tasting', type: 'food', description: 'World-famous custard tarts', price: 5, duration: '1 hour', rating: 4.8 }
    ]
  },

  /* ---------------------- NETHERLANDS ---------------------- */
  {
    name: 'Amsterdam',
    country: 'Netherlands',
    continent: 'Europe',
    description: 'Amsterdam weaves 17th-century canals, world-class museums, and cozy brown cafés into a laid-back cycling city. Tour the Van Gogh Museum, pedal through the Jordaan, and see windmills at nearby Zaanse Schans.',
    shortDescription: 'Canal-laced cycling capital of art, tulips, and golden-age charm',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
      'https://images.unsplash.com/photo-1583295125721-766a0088cd3f?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 3980,
    priceRange: '$$$',
    avgDailyBudget: 125,
    currency: 'EUR',
    languages: ['Dutch', 'English'],
    timezone: 'CET (UTC+1)',
    bestTimeToVisit: 'April to May (tulips) and September',
    climate: 'temperate',
    tags: ['city', 'canals', 'art', 'museums', 'cycling', 'food'],
    highlights: ['Van Gogh Museum', 'Anne Frank House', 'Canal Ring', 'Rijksmuseum', 'Zaanse Schans'],
    coordinates: { lat: 52.3676, lng: 4.9041 },
    safetyRating: 4,
    activities: [
      { name: 'Canal Boat Tour', type: 'sightseeing', description: 'Glide under 17th-century bridges', price: 15, duration: '1.5 hours', rating: 4.6 },
      { name: 'Van Gogh Museum Visit', type: 'cultural', description: 'World\'s largest Van Gogh collection', price: 20, duration: '3 hours', rating: 4.8 },
      { name: 'Bike Tour to Zaanse Schans', type: 'adventure', description: 'Windmills and cheese farms', price: 35, duration: '5 hours', rating: 4.6 }
    ]
  },

  /* ------------------------ CZECHIA ------------------------ */
  {
    name: 'Prague',
    country: 'Czechia',
    continent: 'Europe',
    description: 'Prague, the City of a Hundred Spires, is a Gothic fairy tale of cobblestones, castle ramparts, and baroque domes. Cross the Charles Bridge at dawn, watch the Astronomical Clock chime, and sip Pilsner beneath Old Town gables.',
    shortDescription: 'Gothic fairy-tale capital of spires, bridges, and castles',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',
      'https://images.unsplash.com/photo-1600623471616-8c1966c91ff6?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 3525,
    priceRange: '$$',
    avgDailyBudget: 90,
    currency: 'CZK',
    languages: ['Czech', 'English'],
    timezone: 'CET (UTC+1)',
    bestTimeToVisit: 'May to September',
    climate: 'continental',
    tags: ['history', 'architecture', 'city', 'budget', 'beer', 'romance'],
    highlights: ['Charles Bridge', 'Prague Castle', 'Old Town Square', 'Astronomical Clock', 'Petrin Hill'],
    coordinates: { lat: 50.0755, lng: 14.4378 },
    safetyRating: 5,
    activities: [
      { name: 'Prague Castle Tour', type: 'cultural', description: 'Gothic St Vitus & royal courtyards', price: 13, duration: '3 hours', rating: 4.8 },
      { name: 'Old Town & Clock Walk', type: 'sightseeing', description: 'Astronomical clock show at noon', price: 0, duration: '2 hours', rating: 4.7 },
      { name: 'Czech Beer Tasting', type: 'food', description: 'Pilsner in a medieval cellar', price: 18, duration: '2 hours', rating: 4.6 }
    ]
  },

  /* ------------------------ ICELAND ------------------------ */
  {
    name: 'Reykjavik',
    country: 'Iceland',
    continent: 'Europe',
    description: 'Reykjavik is the colorful launchpad for Iceland\'s surreal natural wonders — thundering waterfalls, black-sand beaches, and the dancing Northern Lights. Bathe in the Blue Lagoon and explore geysers and glaciers in the Golden Circle.',
    shortDescription: 'Gateway to Iceland\'s geysers, glaciers, and aurora-filled skies',
    image: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80',
      'https://images.unsplash.com/photo-1512525257540-dd546e7f2839?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 1874,
    priceRange: '$$$$',
    avgDailyBudget: 190,
    currency: 'ISK',
    languages: ['Icelandic', 'English'],
    timezone: 'GMT (UTC+0)',
    bestTimeToVisit: 'June to August (midnight sun) and September to March (auroras)',
    climate: 'polar',
    tags: ['nature', 'adventure', 'aurora', 'geothermal', 'waterfalls', 'hidden-gem'],
    highlights: ['Blue Lagoon', 'Golden Circle', 'Skógafoss Waterfall', 'Reykjanes Peninsula', 'Hallgrímskirkja'],
    coordinates: { lat: 64.1466, lng: -21.9426 },
    safetyRating: 5,
    trending: true,
    activities: [
      { name: 'Golden Circle Tour', type: 'nature', description: 'Geysir, Gullfoss and Thingvellir', price: 60, duration: '8 hours', rating: 4.9 },
      { name: 'Blue Lagoon Soak', type: 'relaxation', description: 'Geothermal spa in lava field', price: 70, duration: '3 hours', rating: 4.7 },
      { name: 'Northern Lights Hunt', type: 'adventure', description: 'Chase the aurora borealis', price: 55, duration: '4 hours', rating: 4.8 }
    ]
  },

  /* ----------------------- NORWAY ----------------------- */
  {
    name: 'Norwegian Fjords',
    country: 'Norway',
    continent: 'Europe',
    description: 'The Norwegian fjords are millennia-carved waterways framed by sheer cliffs, emerald waters, and thundering waterfalls. Cruise the UNESCO-listed Geirangerfjord, hike to iconic viewpoints, and ride the Flåm Railway through mountain valleys.',
    shortDescription: 'Dramatic glacier-carved fjords, waterfalls, and scenic railways',
    image: 'https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 2033,
    priceRange: '$$$$',
    avgDailyBudget: 190,
    currency: 'NOK',
    languages: ['Norwegian', 'English'],
    timezone: 'CET (UTC+1)',
    bestTimeToVisit: 'May to September',
    climate: 'temperate',
    tags: ['nature', 'fjords', 'adventure', 'photography', 'scenic-trains', 'hiking'],
    highlights: ['Geirangerfjord', 'Flåm Railway', 'Bryggen Wharf', 'Lofoten Islands', 'Preikestolen Cliff'],
    coordinates: { lat: 62.4691, lng: 6.0025 },
    safetyRating: 5,
    activities: [
      { name: 'Geirangerfjord Cruise', type: 'nature', description: 'Sailing under the Seven Sisters falls', price: 70, duration: '2 hours', rating: 4.9 },
      { name: 'Flåm Railway Ride', type: 'sightseeing', description: 'One of the world\'s most scenic trains', price: 60, duration: '1 hour', rating: 4.9 },
      { name: 'Preikestolen Hike', type: 'adventure', description: 'Trek to the Pulpit Rock', price: 0, duration: '6 hours', rating: 4.8 }
    ]
  },

  /* ------------------------ CROATIA ------------------------ */
  {
    name: 'Dubrovnik',
    country: 'Croatia',
    continent: 'Europe',
    description: 'Dubrovnik, the Pearl of the Adriatic, is a walled medieval city of orange rooftops and marble streets. Walk the fortress battlements made famous by Game of Thrones, kayak the stony coves, and lunch on fresh seafood in the old harbor.',
    shortDescription: 'Walled Adriatic gem of marble streets and cinematic walls',
    image: 'https://images.unsplash.com/photo-1603551664565-1b3c3dd61075?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1603551664565-1b3c3dd61075?w=800&q=80',
      'https://images.unsplash.com/photo-1414862625453-d87604a607e4?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 2108,
    priceRange: '$$',
    avgDailyBudget: 105,
    currency: 'EUR',
    languages: ['Croatian', 'English'],
    timezone: 'CET (UTC+1)',
    bestTimeToVisit: 'May to October',
    climate: 'mediterranean',
    tags: ['history', 'beach', 'adventure', 'city', 'game-of-thrones', 'culture'],
    highlights: ['City Walls Walk', 'Old Town Stradun', 'Lokrum Island', 'Fort Lovrijenac', 'Banje Beach'],
    coordinates: { lat: 42.6507, lng: 18.0944 },
    safetyRating: 5,
    activities: [
      { name: 'City Walls Walk', type: 'sightseeing', description: 'Circle the iconic fortifications', price: 35, duration: '2 hours', rating: 4.9 },
      { name: 'Kayak Adventure', type: 'adventure', description: 'Paddle beneath the walls at sunset', price: 25, duration: '2 hours', rating: 4.7 },
      { name: 'Lokrum Island Trip', type: 'nature', description: 'Botanical island with peacocks', price: 20, duration: '4 hours', rating: 4.5 }
    ]
  },

  /* ------------------- UNITED KINGDOM ------------------- */
  {
    name: 'London',
    country: 'United Kingdom',
    continent: 'Europe',
    description: 'London is a majestic capital where royal palaces, world-class theatre, and centuries of history meet edgy markets and diverse cuisine. See the Changing of the Guard, cruise the Thames, and explore markets from Camden to Borough.',
    shortDescription: 'Royal palaces, river cruises, theatres, and world-class markets',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
      'https://images.unsplash.com/photo-1547448526-5e9d57fa28f7?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 6200,
    priceRange: '$$$',
    avgDailyBudget: 165,
    currency: 'GBP',
    languages: ['English'],
    timezone: 'GMT (UTC+0)',
    bestTimeToVisit: 'May to June and September',
    climate: 'temperate',
    tags: ['city', 'history', 'theatre', 'museums', 'food', 'shopping'],
    highlights: ['Big Ben & Westminster', 'Tower of London', 'British Museum', 'West End Theatre', 'Borough Market'],
    coordinates: { lat: 51.5074, lng: -0.1278 },
    safetyRating: 4,
    activities: [
      { name: 'Westminster to Tower Cruise', type: 'sightseeing', description: 'Thames cruise past the landmarks', price: 18, duration: '1 hour', rating: 4.5 },
      { name: 'British Museum Tour', type: 'cultural', description: 'Rosetta Stone & world treasures', price: 0, duration: '4 hours', rating: 4.8 },
      { name: 'West End Show', type: 'nightlife', description: 'World-class musicals and plays', price: 70, duration: '3 hours', rating: 4.8 }
    ]
  },
  {
    name: 'Edinburgh',
    country: 'United Kingdom',
    continent: 'Europe',
    description: 'Edinburgh is Scotland\'s broodingly beautiful capital, crowned by a volcanic castle and shadowed by history. Walk the Royal Mile, hike Arthur\'s Seat, and in August, join the world\'s biggest arts festival.',
    shortDescription: 'Scotland\'s castle-crowned capital of festivals and ghostly closes',
    image: 'https://images.unsplash.com/photo-1619187731847-28392c0c7917?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1619187731847-28392c0c7917?w=800&q=80',
      'https://images.unsplash.com/photo-1595599014147-a419c147bdc0?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 1567,
    priceRange: '$$',
    avgDailyBudget: 110,
    currency: 'GBP',
    languages: ['English', 'Gaelic'],
    timezone: 'GMT (UTC+0)',
    bestTimeToVisit: 'May to September',
    climate: 'temperate',
    tags: ['history', 'city', 'festival', 'castle', 'culture', 'hiking'],
    highlights: ['Edinburgh Castle', 'Royal Mile', 'Arthur\'s Seat', 'Rosslyn Chapel', 'Fringe Festival'],
    coordinates: { lat: 55.9533, lng: -3.1883 },
    safetyRating: 4,
    activities: [
      { name: 'Edinburgh Castle Tour', type: 'cultural', description: 'Crown jewels and one o\'clock gun', price: 22, duration: '3 hours', rating: 4.8 },
      { name: 'Arthur\'s Seat Sunrise', type: 'adventure', description: 'Volcanic summit over the city', price: 0, duration: '2 hours', rating: 4.7 },
      { name: 'Royal Mile & Underground Vaults', type: 'sightseeing', description: 'Ghosts of historic closes', price: 15, duration: '2 hours', rating: 4.5 }
    ]
  },

  /* ------------------------- AUSTRIA ------------------------- */
  {
    name: 'Vienna',
    country: 'Austria',
    continent: 'Europe',
    description: 'Vienna is the jewel of the Habsburg empire — glittering coffeehouses, imperial palaces, and the music of Mozart. Attend a ball at Schönbrunn, waltz through the MuseumsQuartier, and devour Sachertorte by the Danube.',
    shortDescription: 'Imperial capital of coffeehouses, palaces, and classical music',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
      'https://images.unsplash.com/photo-1519923041107-e4dc8d9193da?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 2490,
    priceRange: '$$$',
    avgDailyBudget: 125,
    currency: 'EUR',
    languages: ['German', 'English'],
    timezone: 'CET (UTC+1)',
    bestTimeToVisit: 'April to June and September to October',
    climate: 'continental',
    tags: ['history', 'art', 'music', 'coffeehouse', 'architecture', 'luxury'],
    highlights: ['Schönbrunn Palace', 'St Stephen\'s Cathedral', 'Belvedere Palace', 'Vienna State Opera', 'Prater'],
    coordinates: { lat: 48.2082, lng: 16.3738 },
    safetyRating: 5,
    activities: [
      { name: 'Schönbrunn Palace Tour', type: 'cultural', description: 'Imperial summer residence', price: 22, duration: '4 hours', rating: 4.8 },
      { name: 'State Opera Performance', type: 'nightlife', description: 'World-class classical evening', price: 30, duration: '3 hours', rating: 4.8 },
      { name: 'Viennese Coffeehouse Hop', type: 'food', description: 'Melange and Sachertorte classics', price: 20, duration: '2 hours', rating: 4.6 }
    ]
  }
];

const northAmerica = [
  /* ------------------- UNITED STATES ------------------- */
  {
    name: 'New York City',
    country: 'United States',
    continent: 'North America',
    description: 'New York City, the city that never sleeps, offers an unparalleled urban experience. From Broadway shows and world-class museums to iconic landmarks like the Statue of Liberty and Central Park, NYC is a melting pot of culture, food, and energy.',
    shortDescription: 'The city that never sleeps - iconic landmarks and world-class culture',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 5832,
    priceRange: '$$$$',
    avgDailyBudget: 250,
    currency: 'USD',
    languages: ['English'],
    timezone: 'EST (UTC-5)',
    bestTimeToVisit: 'April to June and September to November',
    climate: 'continental',
    tags: ['urban', 'culture', 'food', 'shopping', 'nightlife', 'museums'],
    highlights: ['Central Park', 'Statue of Liberty', 'Times Square', 'Brooklyn Bridge', 'Empire State Building'],
    coordinates: { lat: 40.7128, lng: -74.006 },
    safetyRating: 4,
    featured: true,
    featuredOrder: 5,
    trending: true,
    activities: [
      { name: 'Statue of Liberty & Ellis Island', type: 'sightseeing', description: 'Visit the iconic Lady Liberty', price: 24, duration: '4 hours', rating: 4.6 },
      { name: 'Broadway Show', type: 'cultural', description: 'Watch a world-class Broadway performance', price: 120, duration: '3 hours', rating: 4.8 },
      { name: 'Central Park Bike Tour', type: 'adventure', description: 'Cycle through the iconic park', price: 45, duration: '2 hours', rating: 4.5 }
    ]
  },
  {
    name: 'Los Angeles',
    country: 'United States',
    continent: 'North America',
    description: 'Los Angeles sprawls between mountains and Pacific beaches, radiating Hollywood glamour, eclectic neighborhoods, and perfect weather. Spot stars in Beverly Hills, hike Griffith Observatory at dusk, and surf the waves of Santa Monica.',
    shortDescription: 'City of stars, sunshine, beaches, and Hollywood dreams',
    image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=800&q=80',
      'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&q=80'
    ],
    rating: 4.4,
    reviewCount: 4320,
    priceRange: '$$$$',
    avgDailyBudget: 180,
    currency: 'USD',
    languages: ['English', 'Spanish'],
    timezone: 'PST (UTC-8)',
    bestTimeToVisit: 'March to May and September to November',
    climate: 'mediterranean',
    tags: ['city', 'beach', 'movies', 'nightlife', 'shopping', 'art'],
    highlights: ['Hollywood Sign', 'Griffith Observatory', 'Santa Monica Pier', 'Venice Beach', 'Rodeo Drive'],
    coordinates: { lat: 34.0522, lng: -118.2437 },
    safetyRating: 4,
    activities: [
      { name: 'Hollywood & Griffith Hike', type: 'sightseeing', description: 'Best city views from the observatory', price: 0, duration: '3 hours', rating: 4.6 },
      { name: 'Universal Studios Day', type: 'adventure', description: 'Movie-themed rides and shows', price: 109, duration: '8 hours', rating: 4.5 },
      { name: 'Santa Monica Pier & Beach', type: 'relaxation', description: 'Ferris wheel and boardwalk', price: 15, duration: '4 hours', rating: 4.4 }
    ]
  },
  {
    name: 'San Francisco',
    country: 'United States',
    continent: 'North America',
    description: 'San Francisco captivates with its steep cable-car streets, fog-wreathed Golden Gate Bridge, and quirky neighborhoods. Ride the trolleys, explore the eclectic lanes of Chinatown, and ferry to Alcatraz\'s infamous island prison.',
    shortDescription: 'Foggy coastal city of cable cars, bridges, and tech energy',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
      'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=800&q=80'
    ],
    rating: 4.5,
    reviewCount: 3560,
    priceRange: '$$$$',
    avgDailyBudget: 200,
    currency: 'USD',
    languages: ['English', 'Spanish', 'Chinese'],
    timezone: 'PST (UTC-8)',
    bestTimeToVisit: 'September to November',
    climate: 'mediterranean',
    tags: ['city', 'technology', 'food', 'culture', 'landmarks', 'coastal'],
    highlights: ['Golden Gate Bridge', 'Alcatraz Island', 'Fisherman\'s Wharf', 'Cable Cars', 'Lombard Street'],
    coordinates: { lat: 37.7749, lng: -122.4194 },
    safetyRating: 4,
    activities: [
      { name: 'Golden Gate Bridge Walk', type: 'sightseeing', description: 'Iconic orange towers', price: 0, duration: '2 hours', rating: 4.8 },
      { name: 'Alcatraz Night Tour', type: 'cultural', description: 'Escape the Rock tour', price: 53, duration: '4 hours', rating: 4.7 },
      { name: 'Cable Car Ride', type: 'adventure', description: 'Grip the famous moving trolleys', price: 8, duration: '1 hour', rating: 4.5 }
    ]
  },
  {
    name: 'Las Vegas',
    country: 'United States',
    continent: 'North America',
    description: 'Las Vegas is the entertainment capital of the world — a neon-lit desert playground of casino resorts, world-class shows, and gourmet dining. Explore the themed Strip, fly over the Grand Canyon, and party in Fremont Street\'s retro glow.',
    shortDescription: 'Neon-lit desert playground of casinos, shows, and indulgence',
    image: 'https://images.unsplash.com/photo-1623107935331-7164fb0d6978?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1623107935331-7164fb0d6978?w=800&q=80',
      'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800&q=80'
    ],
    rating: 4.4,
    reviewCount: 3980,
    priceRange: '$$$',
    avgDailyBudget: 150,
    currency: 'USD',
    languages: ['English', 'Spanish'],
    timezone: 'PST (UTC-8)',
    bestTimeToVisit: 'March to May and September to November',
    climate: 'arid',
    tags: ['city', 'nightlife', 'luxury', 'casino', 'shows', 'entertainment'],
    highlights: ['The Strip', 'Bellagio Fountains', 'Fremont Street', 'High Roller Observation Wheel', 'Caesars Forum Shops'],
    coordinates: { lat: 36.1699, lng: -115.1398 },
    safetyRating: 4,
    activities: [
      { name: 'Bellagio Fountain Show', type: 'sightseeing', description: 'Choreographed water spectacle', price: 0, duration: '1 hour', rating: 4.7 },
      { name: 'Grand Canyon Helicopter Tour', type: 'adventure', description: 'Soar over the canyon rim', price: 350, duration: '4 hours', rating: 4.9 },
      { name: 'Cirque du Soleil Show', type: 'nightlife', description: 'Aerial acrobatic masterpiece', price: 110, duration: '2 hours', rating: 4.8 }
    ]
  },
  {
    name: 'New Orleans',
    country: 'United States',
    continent: 'North America',
    description: 'New Orleans pulses with jazz, Cajun spices, and Caribbean-flavored architecture in every courtyard. Catch brass bands on Frenchmen Street, feast on beignets in the French Quarter, and celebrate a culture that honors the past and dances in the present.',
    shortDescription: 'Crescent City of jazz, Creole cuisine, and French Quarter soul',
    image: 'https://images.unsplash.com/photo-1574123286656-446319fe0ef4?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1574123286656-446319fe0ef4?w=800&q=80',
      'https://images.unsplash.com/photo-1506647385858-14280cbf4438?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 1730,
    priceRange: '$$',
    avgDailyBudget: 115,
    currency: 'USD',
    languages: ['English'],
    timezone: 'CST (UTC-6)',
    bestTimeToVisit: 'February to May',
    climate: 'temperate',
    tags: ['music', 'food', 'nightlife', 'history', 'culture', 'festival'],
    highlights: ['Bourbon Street', 'Frenchmen Street Jazz', 'Garden District', 'St Louis Cathedral', 'Café du Monde'],
    coordinates: { lat: 29.9511, lng: -90.0715 },
    safetyRating: 3,
    activities: [
      { name: 'French Quarter Food Tour', type: 'food', description: 'Gumbo, po\'boys and beignets', price: 60, duration: '3 hours', rating: 4.9 },
      { name: 'Jazz at Frenchmen Street', type: 'nightlife', description: 'Live brass and blues nightly', price: 15, duration: '4 hours', rating: 4.9 },
      { name: 'Garden District Streetcar', type: 'sightseeing', description: 'Antebellum mansions ride', price: 3, duration: '2 hours', rating: 4.6 }
    ]
  },
  {
    name: 'Grand Canyon',
    country: 'United States',
    continent: 'North America',
    description: 'The Grand Canyon is one of the world\'s most staggering natural wonders — a mile-deep chasm of layered red rock carved by the Colorado River. Watch sunrise from the South Rim, hike rim trails, or raft the rapids far below.',
    shortDescription: 'Awe-inspiring mile-deep canyon of layered red-rock grandeur',
    image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80',
      'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 2260,
    priceRange: '$$',
    avgDailyBudget: 95,
    currency: 'USD',
    languages: ['English'],
    timezone: 'MST (UTC-7)',
    bestTimeToVisit: 'March to May and September to November',
    climate: 'arid',
    tags: ['nature', 'adventure', 'hiking', 'photography', 'national-park', 'family'],
    highlights: ['South Rim', 'Grand Canyon Skywalk', 'Bright Angel Trail', 'Colorado River Rafting', 'Desert View Watchtower'],
    coordinates: { lat: 36.0544, lng: -112.1401 },
    safetyRating: 5,
    activities: [
      { name: 'South Rim Sunrise', type: 'sightseeing', description: 'Watch the canyon ignite at dawn', price: 0, duration: '3 hours', rating: 4.9 },
      { name: 'Bright Angel Trail Hike', type: 'adventure', description: 'Descend into the canyon', price: 0, duration: '5 hours', rating: 4.8 },
      { name: 'Colorado River Raft Half-Day', type: 'adventure', description: 'Ride the river rapids', price: 130, duration: '6 hours', rating: 4.7 }
    ]
  },

  /* -------------------------- CANADA -------------------------- */
  {
    name: 'Banff',
    country: 'Canada',
    continent: 'North America',
    description: 'Banff is Canada\'s showpiece of Rocky Mountain grandeur — glacier-fed turquoise lakes, pine forests, and the peaks of Banff National Park. Float on Lake Louise, soak in hot springs, and spot elk from mountain boardwalks.',
    shortDescription: 'Turquoise alpine lakes and dramatic Canadian Rockies peaks',
    image: 'https://images.unsplash.com/photo-1563749273413-503803c8a9ea?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1563749273413-503803c8a9ea?w=800&q=80',
      'https://images.unsplash.com/photo-1711545073151-78c4de6d8a78?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 2893,
    priceRange: '$$$',
    avgDailyBudget: 130,
    currency: 'CAD',
    languages: ['English', 'French'],
    timezone: 'MST (UTC-7)',
    bestTimeToVisit: 'June to September and December to March (skiing)',
    climate: 'continental',
    tags: ['mountains', 'nature', 'hiking', 'skiing', 'adventure', 'lakes'],
    highlights: ['Lake Louise', 'Moraine Lake', 'Banff Gondola', 'Lake Minnewanka', 'Sulphur Mountain'],
    coordinates: { lat: 51.1784, lng: -115.5708 },
    safetyRating: 5,
    trending: true,
    activities: [
      { name: 'Lake Louise Paddle', type: 'nature', description: 'Canoe on turquoise water', price: 90, duration: '2 hours', rating: 4.9 },
      { name: 'Banff Gondola Ride', type: 'sightseeing', description: 'Ridge-top views of six ranges', price: 65, duration: '3 hours', rating: 4.7 },
      { name: 'Moraine Lake Sunrise', type: 'nature', description: 'The Valley of the Ten Peaks', price: 0, duration: '3 hours', rating: 4.9 }
    ]
  },
  {
    name: 'Vancouver',
    country: 'Canada',
    continent: 'North America',
    description: 'Vancouver blends a sparkling harbor with rainforest mountains and year-round adventure. Bike the Seawall, sample the world\'s selection at Granville Island Market, and day-trip to Whistler\'s slopes or Grouse Mountain\'s skyride.',
    shortDescription: 'Coastal city where mountains meet the Pacific Ocean',
    image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800&q=80',
      'https://images.unsplash.com/photo-1660143158587-bddffa026e06?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 1970,
    priceRange: '$$$',
    avgDailyBudget: 140,
    currency: 'CAD',
    languages: ['English', 'Chinese', 'Punjabi'],
    timezone: 'PST (UTC-8)',
    bestTimeToVisit: 'May to September',
    climate: 'temperate',
    tags: ['city', 'nature', 'food', 'outdoors', 'coastal', 'family'],
    highlights: ['Stanley Park Seawall', 'Granville Island', 'Capilano Suspension Bridge', 'Grouse Mountain', 'Gastown'],
    coordinates: { lat: 49.2827, lng: -123.1207 },
    safetyRating: 4,
    activities: [
      { name: 'Stanley Park Bike Ride', type: 'nature', description: 'Loop the sea wall seawall', price: 25, duration: '3 hours', rating: 4.8 },
      { name: 'Capilano Suspension Bridge', type: 'adventure', description: 'Walk the treetop canopy', price: 60, duration: '3 hours', rating: 4.6 },
      { name: 'Granville Island Market', type: 'food', description: 'Fresh local produce and eats', price: 20, duration: '3 hours', rating: 4.7 }
    ]
  },

  /* -------------------------- MEXICO -------------------------- */
  {
    name: 'Cancun',
    country: 'Mexico',
    continent: 'North America',
    description: 'Cancun is Mexico\'s Caribbean playground — a sweep of white-sand beaches, turquoise water, and resort-lined hotel zone. Beyond the beach, dive the coral reefs of the surrounding lagoon and day-trip to the Mayan ruins of Tulum.',
    shortDescription: 'Caribbean white-sand beaches, reefs, and Mayan coast',
    image: 'https://images.unsplash.com/photo-1457537227909-08f41319e53c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1457537227909-08f41319e53c?w=800&q=80',
      'https://images.unsplash.com/photo-1565358720137-55235e0878a2?w=800&q=80'
    ],
    rating: 4.5,
    reviewCount: 2780,
    priceRange: '$$',
    avgDailyBudget: 95,
    currency: 'MXN',
    languages: ['Spanish', 'English'],
    timezone: 'EST (UTC-5)',
    bestTimeToVisit: 'December to April',
    climate: 'tropical',
    tags: ['beach', 'resort', 'nightlife', 'diving', 'family', 'all-inclusive'],
    highlights: ['Cancun Hotel Zone Beach', 'Tulum Ruins', 'Isla Mujeres', 'Cenotes', 'Xcaret Park'],
    coordinates: { lat: 21.1619, lng: -86.8515 },
    safetyRating: 4,
    activities: [
      { name: 'Tulum Ruins Day Trip', type: 'cultural', description: 'Mayan city above the sea', price: 60, duration: '6 hours', rating: 4.7 },
      { name: 'Snorkel Puerto Morelos Reef', type: 'adventure', description: 'Swim the Mesoamerican reef', price: 45, duration: '3 hours', rating: 4.6 },
      { name: 'Isla Mujeres Catamaran', type: 'relaxation', description: 'Sail to the island of women', price: 90, duration: '8 hours', rating: 4.7 }
    ]
  },
  {
    name: 'Mexico City',
    country: 'Mexico',
    continent: 'North America',
    description: 'Mexico City is a sprawling cultural giant — Aztec ruins, colonial cathedrals, world-class museums, and some of the planet\'s best street food. Marvel at Frida Kahlo\'s Blue House and float through the canals of Xochimilco.',
    shortDescription: 'Vibrant capital of Aztec history, murals, and street-food magic',
    image: 'https://images.unsplash.com/photo-1747110329811-b25b011d6b5f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1747110329811-b25b011d6b5f?w=800&q=80',
      'https://images.unsplash.com/photo-1521216774850-01bc1c5fe0da?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 1905,
    priceRange: '$$',
    avgDailyBudget: 85,
    currency: 'MXN',
    languages: ['Spanish', 'English'],
    timezone: 'CST (UTC-6)',
    bestTimeToVisit: 'March to May',
    climate: 'temperate',
    tags: ['city', 'culture', 'history', 'food', 'art', 'budget'],
    highlights: ['Zócalo & Cathedral', 'Frida Kahlo Museum', 'Teotihuacán Pyramids', 'Chapultepec Castle', 'Xochimilco'],
    coordinates: { lat: 19.4326, lng: -99.1332 },
    safetyRating: 4,
    activities: [
      { name: 'Teotihuacán Pyramid Tour', type: 'cultural', description: 'Climb the Pyramid of the Sun', price: 50, duration: '6 hours', rating: 4.9 },
      { name: 'Tacos al Pastor Crawl', type: 'food', description: 'Best taquerias of the city', price: 20, duration: '3 hours', rating: 4.9 },
      { name: 'Xochimilco Trajinera Ride', type: 'relaxation', description: 'Colorful canal boats and mariachis', price: 15, duration: '3 hours', rating: 4.6 }
    ]
  },

  /* ------------------------- HAWAII ------------------------- */
  {
    name: 'Maui',
    country: 'United States',
    continent: 'North America',
    description: 'Maui is the Valley Isle of Hawaii — a blend of beachfront resorts, lush rainforest, and the volcanic summit of Haleakalā. Drive the winding Road to Hana, snorkel Molokini crater, and catch whale sightings from Pacific coast viewpoints.',
    shortDescription: 'Hawaiian island of waterfalls, volcanic sunrises, and luaus',
    image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=800&q=80',
      'https://images.unsplash.com/photo-1710444594917-0358cb975d53?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 2300,
    priceRange: '$$$$',
    avgDailyBudget: 210,
    currency: 'USD',
    languages: ['English', 'Hawaiian'],
    timezone: 'HST (UTC-10)',
    bestTimeToVisit: 'April to May and September to November',
    climate: 'tropical',
    tags: ['beach', 'nature', 'adventure', 'family', 'honeymoon', 'road-trip'],
    highlights: ['Road to Hana', 'Haleakalā Sunrise', 'Molokini Snorkeling', 'Lahaina Town', 'Iao Valley'],
    coordinates: { lat: 20.7984, lng: -156.3319 },
    safetyRating: 5,
    activities: [
      { name: 'Road to Hana Drive', type: 'adventure', description: '600 curves to waterfalls', price: 0, duration: '8 hours', rating: 4.9 },
      { name: 'Molokini Crater Snorkel', type: 'nature', description: 'Marine-life crescent atoll', price: 90, duration: '5 hours', rating: 4.8 },
      { name: 'Haleakalā Sunrise Summit', type: 'adventure', description: 'Above-the-clouds dawn', price: 15, duration: '4 hours', rating: 4.9 }
    ]
  }
];

const southAmerica = [
  /* -------------------------- PERU -------------------------- */
  {
    name: 'Cusco',
    country: 'Peru',
    continent: 'South America',
    description: 'Cusco, the historic capital of the Inca Empire, is a high-altitude Andean city of cobblestone lanes, colonial churches, and indigenous markets. From here, train to the lost city of Machu Picchu, trek the Sacred Valley, and taste world-famous cuy and pisco.',
    shortDescription: 'Andean gateway to Machu Picchu and the Inca heartland',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80',
      'https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 2450,
    priceRange: '$$',
    avgDailyBudget: 75,
    currency: 'PEN',
    languages: ['Spanish', 'Quechua', 'English'],
    timezone: 'PET (UTC-5)',
    bestTimeToVisit: 'May to September (dry season)',
    climate: 'temperate',
    tags: ['history', 'adventure', 'culture', 'mountains', 'heritage', 'trekking'],
    highlights: ['Machu Picchu', 'Sacred Valley', 'Cusco Cathedral', 'Sacsayhuamán', 'Inca Trail'],
    coordinates: { lat: -13.5319, lng: -71.9675 },
    safetyRating: 4,
    trending: true,
    activities: [
      { name: 'Machu Picchu Day Trip', type: 'cultural', description: 'The iconic lost city of the Incas', price: 120, duration: '10 hours', rating: 5.0 },
      { name: 'Sacred Valley Tour', type: 'adventure', description: 'Pisac market and Ollantaytambo', price: 40, duration: '8 hours', rating: 4.7 },
      { name: 'Pisco Sour Tasting', type: 'food', description: 'Peru\'s signature cocktail', price: 10, duration: '2 hours', rating: 4.5 }
    ]
  },

  /* ------------------------- BRAZIL ------------------------- */
  {
    name: 'Rio de Janeiro',
    country: 'Brazil',
    continent: 'South America',
    description: 'Rio de Janeiro sizzles with samba, sun, and spectacular scenery between mountains and Atlantic coves. Ascend Christ the Redeemer, hike to the twin peaks of Sugarloaf, and unwind on the legendary beaches of Copacabana and Ipanema.',
    shortDescription: 'Samba, sunshine, and the beaches of Copacabana',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80',
      'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 3150,
    priceRange: '$$',
    avgDailyBudget: 90,
    currency: 'BRL',
    languages: ['Portuguese', 'English', 'Spanish'],
    timezone: 'BRT (UTC-3)',
    bestTimeToVisit: 'December to March (Carnival) and September to October',
    climate: 'tropical',
    tags: ['beach', 'city', 'nightlife', 'party', 'culture', 'carnival'],
    highlights: ['Christ the Redeemer', 'Sugarloaf Mountain', 'Copacabana Beach', 'Ipanema Beach', 'Sugarloaf Cable Car'],
    coordinates: { lat: -22.9068, lng: -43.1729 },
    safetyRating: 3,
    activities: [
      { name: 'Christ the Redeemer & Sugarloaf', type: 'sightseeing', description: 'Iconic summit viewpoints', price: 60, duration: '5 hours', rating: 4.8 },
      { name: 'Copacabana Sunset Walk', type: 'relaxation', description: 'Beachfront promenade stroll', price: 0, duration: '2 hours', rating: 4.6 },
      { name: 'Samba Night in Lapa', type: 'nightlife', description: 'Live samba beneath the arches', price: 20, duration: '4 hours', rating: 4.8 }
    ]
  },

  /* ----------------------- ARGENTINA ----------------------- */
  {
    name: 'Buenos Aires',
    country: 'Argentina',
    continent: 'South America',
    description: 'Buenos Aires is the Paris of South America — grand boulevards, tango halls, and parrillas serving legendary steak. Explore the cobbled streets of San Telmo, watch a port-side living room tango in La Boca, and browse leather on Palermo\'s avenues.',
    shortDescription: 'Tango, steak, and European elegance on the Río de la Plata',
    image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&q=80',
      'https://images.unsplash.com/photo-1676036633197-d37b327e25ca?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 2055,
    priceRange: '$$',
    avgDailyBudget: 80,
    currency: 'ARS',
    languages: ['Spanish', 'English'],
    timezone: 'ART (UTC-3)',
    bestTimeToVisit: 'March to May and September to November',
    climate: 'temperate',
    tags: ['city', 'food', 'tango', 'culture', 'art', 'nightlife'],
    highlights: ['La Boca', 'San Telmo Market', 'Recoleta Cemetery', 'Palermo Soho', 'Teatro Colón'],
    coordinates: { lat: -34.6037, lng: -58.3816 },
    safetyRating: 3,
    activities: [
      { name: 'Tango Show & Dinner', type: 'nightlife', description: 'Live orchestra and milonga', price: 60, duration: '3 hours', rating: 4.7 },
      { name: 'San Telmo Market Sunday', type: 'cultural', description: 'Antiques and street performers', price: 0, duration: '4 hours', rating: 4.6 },
      { name: 'Asado at a Parrilla', type: 'food', description: 'Argentina\'s legendary barbecue', price: 35, duration: '3 hours', rating: 4.8 }
    ]
  },

  /* ------------------------- CHILE ------------------------- */
  {
    name: 'Patagonia',
    country: 'Chile',
    continent: 'South America',
    description: 'Chilean Patagonia is a wilderness of granite spires, electric-blue glaciers, and wind-blasted steppe. Trek the W Circuit in Torres del Paine, kayak past the Perito Moreno Glacier, and spot guanacos against snow-topped peaks.',
    shortDescription: 'Wind-swept wilderness of granite peaks, glaciers, and fjords',
    image: 'https://images.unsplash.com/photo-1658312627438-30d1299683fd?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1658312627438-30d1299683fd?w=800&q=80',
      'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 1500,
    priceRange: '$$$',
    avgDailyBudget: 150,
    currency: 'CLP',
    languages: ['Spanish', 'English'],
    timezone: 'CLT (UTC-4)',
    bestTimeToVisit: 'November to March',
    climate: 'polar',
    tags: ['nature', 'hiking', 'glaciers', 'adventure', 'photography', 'off-grid'],
    highlights: ['Torres del Paine', 'Perito Moreno Glacier', 'Grey Glacier', 'W Trek', 'Fitz Roy'],
    coordinates: { lat: -51.0171, lng: -73.0995 },
    safetyRating: 5,
    activities: [
      { name: 'Torres del Paine Base Trek', type: 'adventure', description: 'Reach the granite towers', price: 0, duration: '8 hours', rating: 4.9 },
      { name: 'Glacier Grey Kayak', type: 'adventure', description: 'Paddle blue-ice formations', price: 90, duration: '3 hours', rating: 4.9 },
      { name: 'Perito Moreno Viewpoint', type: 'nature', description: 'Watch ice calve into the lake', price: 35, duration: '5 hours', rating: 4.9 }
    ]
  },

  /* ------------------------- COLOMBIA ------------------------- */
  {
    name: 'Cartagena',
    country: 'Colombia',
    continent: 'South America',
    description: 'Cartagena is a sun-drenched walled city on Colombia\'s Caribbean coast — colonial balconies, bougainvillea-draped plazas, and storybook legends of pirates. Wander the Old Town, swim at white-sand beaches, and discover the Rosario Islands.',
    shortDescription: 'Walled Caribbean gem of colonial charm and golden beaches',
    image: 'https://images.unsplash.com/photo-1534943441045-1009d7cb0bb9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1534943441045-1009d7cb0bb9?w=800&q=80',
      'https://images.unsplash.com/photo-1536308037887-165852797016?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 1430,
    priceRange: '$$',
    avgDailyBudget: 85,
    currency: 'COP',
    languages: ['Spanish', 'English'],
    timezone: 'COT (UTC-5)',
    bestTimeToVisit: 'December to April',
    climate: 'tropical',
    tags: ['history', 'beach', 'culture', 'city', 'romance', 'colonial'],
    highlights: ['Old City Walls', 'Castillo San Felipe', 'Rosario Islands', 'Getsemaní', 'Plaza Santo Domingo'],
    coordinates: { lat: 10.391, lng: -75.4794 },
    safetyRating: 4,
    activities: [
      { name: 'Old City Walking Tour', type: 'cultural', description: 'Colonial plazas and street art', price: 15, duration: '3 hours', rating: 4.7 },
      { name: 'Rosario Islands Day Trip', type: 'nature', description: 'Snorkel a turquoise archipelago', price: 80, duration: '8 hours', rating: 4.8 },
      { name: 'Castillo San Felipe Fort', type: 'cultural', description: 'Climb the pirate-proof bastion', price: 12, duration: '2 hours', rating: 4.5 }
    ]
  },

  /* ------------------------- ECUADOR ------------------------- */
  {
    name: 'Galápagos Islands',
    country: 'Ecuador',
    continent: 'South America',
    description: 'The Galápagos Islands are Darwin\'s living laboratory — giant tortoises, blue-footed boobies, and marine iguanas that know no fear of humans. Snorkel with sea lions, hike volcanic craters, and cruise between islands unlike anywhere on Earth.',
    shortDescription: 'Darwin\'s untouched archipelago of fearless wildlife and volcanic shores',
    image: 'https://images.unsplash.com/photo-1748116725208-d54b32965555?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1748116725208-d54b32965555?w=800&q=80',
      'https://images.unsplash.com/photo-1676910914506-39578e3446b1?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 1350,
    priceRange: '$$$$',
    avgDailyBudget: 220,
    currency: 'USD',
    languages: ['Spanish', 'English'],
    timezone: 'GALT (UTC-6)',
    bestTimeToVisit: 'December to May (warm) and June to November (cool)',
    climate: 'tropical',
    tags: ['nature', 'wildlife', 'adventure', 'diving', 'island', 'safari'],
    highlights: ['Charles Darwin Station', 'Kicker Rock', 'Sierra Negra Volcano', 'Los Tuneles', 'Tortue Bay'],
    coordinates: { lat: -0.9538, lng: -90.9656 },
    safetyRating: 5,
    activities: [
      { name: 'Island Hopping Cruise', type: 'adventure', description: 'Multi-island wildlife expedition', price: 300, duration: '48 hours', rating: 4.9 },
      { name: 'Snorkel with Sea Lions', type: 'nature', description: 'Play among friendly pinnipeds', price: 75, duration: '4 hours', rating: 4.9 },
      { name: 'Sierra Negra Volcano Hike', type: 'adventure', description: 'Walk the world\'s second-largest crater', price: 60, duration: '6 hours', rating: 4.7 }
    ]
  },

  /* ------------------------- BOLIVIA ------------------------- */
  {
    name: 'Salar de Uyuni',
    country: 'Bolivia',
    continent: 'South America',
    description: 'The Salar de Uyuni is the world\'s largest salt flat — a blinding white mirror stretching to the horizon that reflects the sky during the rainy season. Ride 4x4s past cactus islands, flamboyant flamingos, and rainbow rock valleys.',
    shortDescription: 'Surreal world\'s-largest salt flat that mirrors the sky',
    image: 'https://images.unsplash.com/photo-1511213574-c6abde530d6f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511213574-c6abde530d6f?w=800&q=80',
      'https://images.unsplash.com/photo-1664272247475-723ddea7fbd4?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 980,
    priceRange: '$$',
    avgDailyBudget: 65,
    currency: 'BOB',
    languages: ['Spanish', 'Quechua', 'Aymara'],
    timezone: 'BOT (UTC-4)',
    bestTimeToVisit: 'April to November (dry) or December to March (mirror effect)',
    climate: 'arid',
    tags: ['adventure', 'nature', 'hidden-gem', 'photography', 'off-grid', 'desert'],
    highlights: ['Isla Incahuasi', 'Reflection Season', 'Train Cemetery', 'Laguna Colorada', 'Red Lagoon'],
    coordinates: { lat: -20.1338, lng: -67.4891 },
    safetyRating: 4,
    activities: [
      { name: 'Salt Flat 4x4 Safari', type: 'adventure', description: 'Cross the great white expanse', price: 120, duration: '12 hours', rating: 4.9 },
      { name: 'Isla Incahuasi Visit', type: 'nature', description: 'Giant cacti island in the salt', price: 10, duration: '2 hours', rating: 4.7 },
      { name: 'Train Cemetery Tour', type: 'sightseeing', description: 'Rusting locomotives in the desert', price: 5, duration: '1 hour', rating: 4.5 }
    ]
  }
];

const africa = [
  /* -------------------- SOUTH AFRICA -------------------- */
  {
    name: 'Cape Town',
    country: 'South Africa',
    continent: 'Africa',
    description: 'Cape Town is one of the world\'s most beautiful cities, cradled between Table Mountain\'s flat-topped peak and two oceans. Ride the cable car to the summit, wine-taste in Stellenbosch, and spot penguins at Boulders Beach.',
    shortDescription: 'Table Mountain city where two oceans and vineyards meet',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
      'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 2360,
    priceRange: '$$',
    avgDailyBudget: 95,
    currency: 'ZAR',
    languages: ['English', 'Afrikaans', 'Xhosa'],
    timezone: 'SAST (UTC+2)',
    bestTimeToVisit: 'November to March',
    climate: 'mediterranean',
    tags: ['city', 'beach', 'wine', 'nature', 'adventure', 'views'],
    highlights: ['Table Mountain', 'Cape Point', 'Boulders Beach', 'V&A Waterfront', 'Stellenbosch Wine Route'],
    coordinates: { lat: -33.9249, lng: 18.4241 },
    safetyRating: 4,
    trending: true,
    activities: [
      { name: 'Table Mountain Cable Car', type: 'sightseeing', description: 'Ride to the flat-topped summit', price: 30, duration: '3 hours', rating: 4.8 },
      { name: 'Cape Peninsula Drive', type: 'adventure', description: 'Cape Point and penguin beaches', price: 45, duration: '8 hours', rating: 4.9 },
      { name: 'Stellenbosch Vineyard Tasting', type: 'food', description: 'World-class Cape wines', price: 25, duration: '5 hours', rating: 4.7 }
    ]
  },

  /* --------------------- TANZANIA/KENYA --------------------- */
  {
    name: 'Serengeti',
    country: 'Tanzania',
    continent: 'Africa',
    description: 'The Serengeti is Africa\'s most storied wilderness — limitless savannah, acacia dotted plains, and the greatest wildlife migration on Earth. Watch lions, elephants, and a million wildebeest in an endless game drive through the heart of safari country.',
    shortDescription: 'Endless savannah and the great wildebeest migration',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 1880,
    priceRange: '$$$$',
    avgDailyBudget: 260,
    currency: 'TZS',
    languages: ['Swahili', 'English'],
    timezone: 'EAT (UTC+3)',
    bestTimeToVisit: 'June to October (migration) and January to February (calving)',
    climate: 'tropical',
    tags: ['safari', 'wildlife', 'adventure', 'nature', 'luxury', 'photography'],
    highlights: ['Great Migration', 'Seronera Valley', 'Ngorongoro Crater', 'Big Five Game Drives', 'Balloon Rides'],
    coordinates: { lat: -2.3333, lng: 34.8333 },
    safetyRating: 5,
    activities: [
      { name: 'Full-Day Game Drive', type: 'adventure', description: 'Hunt the Big Five on safari', price: 150, duration: '10 hours', rating: 4.9 },
      { name: 'Ngorongoro Crater Tour', type: 'nature', description: 'Wildlife in a volcanic bowl', price: 130, duration: '8 hours', rating: 4.9 },
      { name: 'Hot Air Balloon Safari', type: 'adventure', description: 'Soar over the migration at dawn', price: 500, duration: '4 hours', rating: 5.0 }
    ]
  },

  /* ------------------------ MOROCCO ------------------------ */
  {
    name: 'Marrakech',
    country: 'Morocco',
    continent: 'Africa',
    description: 'Marrakech is a sensory explosion of Berber souks, copper lantern light, and rose-scented gardens. Lose yourself in the maze of the medina, sip mint tea in the Djemaa el-Fna square, and retreat to riads hidden behind unmarked doors.',
    shortDescription: 'Exotic medina of souks, palaces, and mint-tea courtyards',
    image: 'https://images.unsplash.com/photo-1570135460237-510ca82c6781?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1570135460237-510ca82c6781?w=800&q=80',
      'https://images.unsplash.com/photo-1677837488142-a85ffbffe408?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 2870,
    priceRange: '$$',
    avgDailyBudget: 80,
    currency: 'MAD',
    languages: ['Arabic', 'French', 'English'],
    timezone: 'WET (UTC+0)',
    bestTimeToVisit: 'March to May and September to November',
    climate: 'arid',
    tags: ['culture', 'history', 'shopping', 'food', 'exotic', 'riads'],
    highlights: ['Djemaa el-Fna', 'Bahia Palace', 'Jardin Majorelle', 'Souks of the Medina', 'Koutoubia Mosque'],
    coordinates: { lat: 31.6295, lng: -7.9811 },
    safetyRating: 3,
    activities: [
      { name: 'Medina Souk Tour', type: 'shopping', description: 'Carpets, lanterns and spices', price: 20, duration: '3 hours', rating: 4.7 },
      { name: 'Hammam & Spa Ritual', type: 'relaxation', description: 'Traditional Moroccan bath', price: 30, duration: '2 hours', rating: 4.8 },
      { name: 'Atlas Mountains Day Trip', type: 'adventure', description: 'Berber villages and waterfalls', price: 45, duration: '8 hours', rating: 4.6 }
    ]
  },
  {
    name: 'Sahara Desert',
    country: 'Morocco',
    continent: 'Africa',
    description: 'The Moroccan Sahara near Merzouga is a sea of rippled golden dunes that glow amber at sunrise and silver under the stars. Ride camels to a desert camp, sleep beneath the Milky Way, and drum around the fire in Erg Chebbi.',
    shortDescription: 'Epic golden dunes, camel caravans, and star-filled desert nights',
    image: 'https://images.unsplash.com/photo-1638732984528-f255c9714619?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1638732984528-f255c9714619?w=800&q=80',
      'https://images.unsplash.com/photo-1672754521539-49de145445a6?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 960,
    priceRange: '$$',
    avgDailyBudget: 70,
    currency: 'MAD',
    languages: ['Arabic', 'French', 'Berber', 'English'],
    timezone: 'WET (UTC+0)',
    bestTimeToVisit: 'October to April',
    climate: 'arid',
    tags: ['adventure', 'desert', 'camels', 'stargazing', 'hidden-gem', 'off-grid'],
    highlights: ['Erg Chebbi Dunes', 'Camel Trek', 'Desert Camp', 'Nomad Encounter', 'Star Photography'],
    coordinates: { lat: 31.0816, lng: -4.0127 },
    safetyRating: 4,
    activities: [
      { name: 'Camel Trek at Sunset', type: 'adventure', description: 'Ride into the erg for golden hour', price: 45, duration: '3 hours', rating: 4.8 },
      { name: 'Desert Camp Overnight', type: 'relaxation', description: 'Berber camp and fire drum circle', price: 80, duration: '12 hours', rating: 4.9 },
      { name: 'Quad Bike Dune Run', type: 'adventure', description: 'Power across the sand sea', price: 55, duration: '2 hours', rating: 4.6 }
    ]
  },

  /* ------------------------- EGYPT ------------------------- */
  {
    name: 'Cairo',
    country: 'Egypt',
    continent: 'Africa',
    description: 'Cairo is the sprawling gateway to the ancient world — the Pyramids of Giza rising from the desert edge, the treasures of Tutankhamun in the Egyptian Museum, and the lanes of Islamic Cairo stacked with minarets and bazaars.',
    shortDescription: 'Ancient pyramids, Nile treasures, and a labyrinthine old city',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&q=80',
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 3240,
    priceRange: '$$',
    avgDailyBudget: 70,
    currency: 'EGP',
    languages: ['Arabic', 'English'],
    timezone: 'EET (UTC+2)',
    bestTimeToVisit: 'October to April',
    climate: 'arid',
    tags: ['history', 'heritage', 'pyramids', 'culture', 'adventure', 'world-wonder'],
    highlights: ['Pyramids of Giza', 'Great Sphinx', 'Egyptian Museum', 'Khan el-Khalili', 'Nile Cruise'],
    coordinates: { lat: 30.0444, lng: 31.2357 },
    safetyRating: 3,
    activities: [
      { name: 'Giza Pyramids & Sphinx', type: 'cultural', description: 'Marvel at the last ancient wonder', price: 25, duration: '4 hours', rating: 4.9 },
      { name: 'Egyptian Museum Tour', type: 'cultural', description: 'Golden mask of Tutankhamun', price: 15, duration: '4 hours', rating: 4.7 },
      { name: 'Nile Felucca at Sunset', type: 'relaxation', description: 'Traditional sailboat ride', price: 15, duration: '2 hours', rating: 4.6 }
    ]
  },

  /* ------------------------ TANZANIA ------------------------ */
  {
    name: 'Zanzibar',
    country: 'Tanzania',
    continent: 'Africa',
    description: 'Zanzibar is a spice-scented island off East Africa, where Stone Town\'s coral alleys meet powder-white beaches and turquoise reefs. Explore sultan palaces, swim in tidal lagoons, and finish the day over sunset cocktails in Nungwi.',
    shortDescription: 'Spice islands of Stone Town alleys and blinding white beaches',
    image: 'https://images.unsplash.com/photo-1699955376108-9274ed93d1d6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1699955376108-9274ed93d1d6?w=800&q=80',
      'https://images.unsplash.com/photo-1678042955980-c173f0460d0a?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 1210,
    priceRange: '$$',
    avgDailyBudget: 100,
    currency: 'TZS',
    languages: ['Swahili', 'English'],
    timezone: 'EAT (UTC+3)',
    bestTimeToVisit: 'June to October',
    climate: 'tropical',
    tags: ['beach', 'history', 'island', 'diving', 'spice', 'hidden-gem'],
    highlights: ['Stone Town', 'Nungwi Beach', 'Jozani Forest', 'Prison Island', 'Spice Farm Tour'],
    coordinates: { lat: -6.1741, lng: 39.2069 },
    safetyRating: 4,
    activities: [
      { name: 'Stone Town Walking Tour', type: 'cultural', description: 'Sultans\' palaces and Persian gates', price: 20, duration: '3 hours', rating: 4.7 },
      { name: 'Snorkel Mnemba Atoll', type: 'adventure', description: 'Reefs overflowing with tropical fish', price: 60, duration: '5 hours', rating: 4.8 },
      { name: 'Spice Farm Lunch Tour', type: 'food', description: 'Smell, taste and cook island spices', price: 25, duration: '4 hours', rating: 4.6 }
    ]
  },

  /* --------------------- ZAMBIA/ZIMBABWE --------------------- */
  {
    name: 'Victoria Falls',
    country: 'Zimbabwe',
    continent: 'Africa',
    description: 'Victoria Falls, the Smoke That Thunders, is the world\'s largest curtain of falling water. Witness the mile-wide spray from viewpoints, bungee off the Victoria Falls Bridge, and explore the lush rainforests of Mosi-oa-Tunya.',
    shortDescription: 'The magnificent Smoke That Thunders between two nations',
    image: 'https://images.unsplash.com/photo-1603201236596-eb1a63eb0ede?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1603201236596-eb1a63eb0ede?w=800&q=80',
      'https://images.unsplash.com/photo-1627347456206-d3df7d8484b0?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 1320,
    priceRange: '$$$',
    avgDailyBudget: 120,
    currency: 'USD',
    languages: ['English', 'Shona', 'Ndebele'],
    timezone: 'CAT (UTC+2)',
    bestTimeToVisit: 'February to May (peak flow) and August to November (adventure)',
    climate: 'tropical',
    tags: ['adventure', 'nature', 'waterfalls', 'extreme-sports', 'family', 'hidden-gem'],
    highlights: ['Main Falls', 'Victoria Falls Bridge', 'Zambezi Rafting', 'Flight of Angels', 'Devil\'s Pool'],
    coordinates: { lat: -17.9243, lng: 25.8572 },
    safetyRating: 4,
    activities: [
      { name: 'Falls Rainforest Walk', type: 'nature', description: 'Sixteen viewpoints of the spray', price: 30, duration: '3 hours', rating: 4.9 },
      { name: 'White-Water Rafting', type: 'adventure', description: 'Some of the world\'s hardest rapids', price: 120, duration: '6 hours', rating: 4.9 },
      { name: 'Helicopter Flight of Angels', type: 'adventure', description: 'Soar along the falls rim', price: 200, duration: '30 minutes', rating: 5.0 }
    ]
  },

  /* ---------------------- SEYCHELLES ---------------------- */
  {
    name: 'Seychelles',
    country: 'Seychelles',
    continent: 'Africa',
    description: 'Seychelles is an Indian Ocean paradise of granite boulders, jungle-clad islands, and some of the most photographed beaches on Earth. Snorkel with giant tortoises on Cousin Island and hike the misty peaks of Morne Seychellois.',
    shortDescription: 'Granite-boulder beaches and untouched tropical islands',
    image: 'https://images.unsplash.com/photo-1693260741045-2c136abbb95f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1693260741045-2c136abbb95f?w=800&q=80',
      'https://images.unsplash.com/photo-1553829176-61484f865ac3?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 900,
    priceRange: '$$$$',
    avgDailyBudget: 220,
    currency: 'SCR',
    languages: ['Creole', 'French', 'English'],
    timezone: 'SCT (UTC+4)',
    bestTimeToVisit: 'April to May and October to November',
    climate: 'tropical',
    tags: ['beach', 'luxury', 'island', 'honeymoon', 'nature', 'diving'],
    highlights: ['Anse Source d\'Argent', 'La Digue Island', 'Morne Seychellois', 'Cousin Island', 'Beau Vallon'],
    coordinates: { lat: -4.6191, lng: 55.4513 },
    safetyRating: 5,
    activities: [
      { name: 'Anse Source d\'Argent Day', type: 'relaxation', description: 'World\'s most photogenic beach', price: 10, duration: '5 hours', rating: 4.9 },
      { name: 'Island Boat Hike', type: 'adventure', description: 'Jungle peaks and hidden coves', price: 50, duration: '6 hours', rating: 4.8 },
      { name: 'Snorkel with Turtles', type: 'nature', description: 'Hawksbill turtles off Curieuse', price: 60, duration: '4 hours', rating: 4.8 }
    ]
  }
];

const oceania = [
  /* ------------------------ AUSTRALIA ------------------------ */
  {
    name: 'Sydney',
    country: 'Australia',
    continent: 'Oceania',
    description: 'Sydney is a sun-drenched harbor city of golden beaches, a dramatic opera-house silhouette, and the soaring Harbour Bridge. Climb the bridge at dawn, catch a ferry to Manly, and surf the famous waves of Bondi Beach.',
    shortDescription: 'Harbor city of opera houses, beaches, and bridge climbs',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80',
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 4210,
    priceRange: '$$$',
    avgDailyBudget: 160,
    currency: 'AUD',
    languages: ['English'],
    timezone: 'AEST (UTC+10)',
    bestTimeToVisit: 'September to November and March to May',
    climate: 'temperate',
    tags: ['city', 'beach', 'food', 'iconic', 'surfing', 'outdoors'],
    highlights: ['Sydney Opera House', 'Harbour Bridge', 'Bondi Beach', 'Taronga Zoo', 'The Rocks'],
    coordinates: { lat: -33.8688, lng: 151.2093 },
    safetyRating: 5,
    activities: [
      { name: 'Bondi to Coogee Walk', type: 'nature', description: 'Clifftop coastal track', price: 0, duration: '3 hours', rating: 4.8 },
      { name: 'Harbour Bridge Climb', type: 'adventure', description: 'Summit views of the harbor', price: 250, duration: '3 hours', rating: 4.9 },
      { name: 'Opera House Backstage Tour', type: 'cultural', description: 'Inside the white-sailed icon', price: 45, duration: '1.5 hours', rating: 4.7 }
    ]
  },
  {
    name: 'Great Barrier Reef',
    country: 'Australia',
    continent: 'Oceania',
    description: 'The Great Barrier Reef is the planet\'s largest living structure — 2,300 kilometers of coral visible from space. Dive and snorkel kaleidoscopic gardens along Cairns\' coast, sail the Whitsundays, and walk Whitehaven\'s silica beach.',
    shortDescription: 'Earth\'s largest reef — kaleidoscopic coral and turquoise islands',
    image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 1850,
    priceRange: '$$$',
    avgDailyBudget: 150,
    currency: 'AUD',
    languages: ['English'],
    timezone: 'AEST (UTC+10)',
    bestTimeToVisit: 'June to October',
    climate: 'tropical',
    tags: ['diving', 'nature', 'adventure', 'beach', 'marine-life', 'world-wonder'],
    highlights: ['Heart Reef', 'Whitehaven Beach', 'Whitsunday Islands', 'Cairns Outer Reef', 'Lady Elliot Island'],
    coordinates: { lat: -16.9203, lng: 145.771 },
    safetyRating: 5,
    activities: [
      { name: 'Outer Reef Snorkel Cruise', type: 'nature', description: 'Pontoon trip to the living coral', price: 180, duration: '8 hours', rating: 4.9 },
      { name: 'Scuba Dive Certification Day', type: 'adventure', description: 'Learn to dive with PADI pros', price: 250, duration: '8 hours', rating: 4.8 },
      { name: 'Whitsunday Sailing Tour', type: 'relaxation', description: 'Sail between 74 emerald isles', price: 160, duration: '24 hours', rating: 4.8 }
    ]
  },
  {
    name: 'Uluru',
    country: 'Australia',
    continent: 'Oceania',
    description: 'Uluru (Ayers Rock) is a monolithic sandstone sentinel rising from the red heart of the Australian Outback. Watch it blaze crimson at sunset, bike its 10-kilometer base, and learn Anangu stories beneath a sky thick with stars.',
    shortDescription: 'Sacred red monolith in the starlit Australian Outback',
    image: 'https://images.unsplash.com/photo-1548296404-93c7694b2f91?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1548296404-93c7694b2f91?w=800&q=80',
      'https://images.unsplash.com/photo-1583668928323-0d810eec29dc?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 1120,
    priceRange: '$$$',
    avgDailyBudget: 130,
    currency: 'AUD',
    languages: ['English'],
    timezone: 'ACST (UTC+9:30)',
    bestTimeToVisit: 'April to August',
    climate: 'arid',
    tags: ['nature', 'adventure', 'outback', 'stargazing', 'heritage', 'photography'],
    highlights: ['Uluru Sunset', 'Field of Light', 'Kata Tjuta', 'Sounds of Silence Dinner', 'Base Walk'],
    coordinates: { lat: -25.3455, lng: 131.0369 },
    safetyRating: 5,
    activities: [
      { name: 'Uluru Base Walk', type: 'nature', description: 'A sacred 10km circuit', price: 0, duration: '4 hours', rating: 4.8 },
      { name: 'Field of Light Sunset', type: 'sightseeing', description: '50,000 bulbs after dark', price: 75, duration: '1 hour', rating: 4.9 },
      { name: 'Kata Tjuta Valley of the Winds', type: 'adventure', description: 'Hike the red domes', price: 0, duration: '5 hours', rating: 4.7 }
    ]
  },

  /* ---------------------- NEW ZEALAND ---------------------- */
  {
    name: 'Queenstown',
    country: 'New Zealand',
    continent: 'Oceania',
    description: 'Queenstown, the self-proclaimed adventure capital of the world, hugs the shores of Lake Wakatipu beneath the Remarkables. Bungee at the Kawarau Bridge, jet-boat the Shotover River, and ski or hike peaks year-round.',
    shortDescription: 'Adrenaline capital of bungy, jet boats, and alpine lakes',
    image: 'https://images.unsplash.com/photo-1706416857635-140589ff80e8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1706416857635-140589ff80e8?w=800&q=80',
      'https://images.unsplash.com/photo-1718398892734-6948c85416c8?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 1940,
    priceRange: '$$$',
    avgDailyBudget: 140,
    currency: 'NZD',
    languages: ['English', 'Māori'],
    timezone: 'NZST (UTC+12)',
    bestTimeToVisit: 'December to February (summer) and June to August (skiing)',
    climate: 'temperate',
    tags: ['adventure', 'mountains', 'extreme-sports', 'nature', 'family', 'lake'],
    highlights: ['Kawarau Bungy', 'Shotover Jet Boat', 'Skyline Gondola', 'Milford Sound', 'Glenorchy'],
    coordinates: { lat: -45.0312, lng: 168.6626 },
    safetyRating: 5,
    trending: true,
    activities: [
      { name: 'Kawarau Bungy Jump', type: 'adventure', description: 'The original 43m bungy', price: 220, duration: '3 hours', rating: 4.9 },
      { name: 'Shotover Jet Boat Ride', type: 'adventure', description: '360-degree spins through canyons', price: 150, duration: '1 hour', rating: 4.9 },
      { name: 'Milford Sound Day Trip', type: 'nature', description: 'Fiordland\'s sheer waterfalls', price: 180, duration: '12 hours', rating: 4.9 }
    ]
  },
  {
    name: 'Rotorua',
    country: 'New Zealand',
    continent: 'Oceania',
    description: 'Rotorua is New Zealand\'s volcanic wonderland — bubbling mud pools, hissing geysers, and steaming thermal lakes scented with sulfur. Experience Māori culture, soak in geothermal spas, and zip through redwood canopies.',
    shortDescription: 'Geothermal geysers, Māori culture, and bubbling thermal pools',
    image: 'https://images.unsplash.com/photo-1783027339185-11ccb739cfbb?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1783027339185-11ccb739cfbb?w=800&q=80',
      'https://images.unsplash.com/photo-1650469332494-b0d29dccae83?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 980,
    priceRange: '$$',
    avgDailyBudget: 110,
    currency: 'NZD',
    languages: ['English', 'Māori'],
    timezone: 'NZST (UTC+12)',
    bestTimeToVisit: 'September to November and March to May',
    climate: 'temperate',
    tags: ['nature', 'geothermal', 'culture', 'adventure', 'hidden-gem', 'spa'],
    highlights: ['Te Puia Geyser', 'Wai-O-Tapu', 'Redwoods Treewalk', 'Polynesian Spa', 'Tamaki Māori Village'],
    coordinates: { lat: -38.1368, lng: 176.2497 },
    safetyRating: 5,
    activities: [
      { name: 'Wai-O-Tapu Thermal Walk', type: 'nature', description: 'Champagne Pool and craters', price: 35, duration: '3 hours', rating: 4.8 },
      { name: 'Māori Cultural Evening', type: 'cultural', description: 'Haka, hangi feast and stories', price: 120, duration: '4 hours', rating: 4.9 },
      { name: 'Redwoods Canopy Zipline', type: 'adventure', description: 'Zip above giant redwoods', price: 99, duration: '3 hours', rating: 4.7 }
    ]
  },

  /* ------------------------ FIJI ------------------------ */
  {
    name: 'Fiji',
    country: 'Fiji',
    continent: 'Oceania',
    description: 'Fiji is a 333-island South Pacific paradise of turquoise lagoons, palm-fringed sandbars, and cheerful village villages. Sail the Mamanuca Islands, dive the rainbow reefs, and share kava with friendly Fijian hosts.',
    shortDescription: 'Smiling South Pacific islands of turquoise lagoons and reefs',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 1280,
    priceRange: '$$$$',
    avgDailyBudget: 180,
    currency: 'FJD',
    languages: ['Fijian', 'Hindi', 'English'],
    timezone: 'FJT (UTC+12)',
    bestTimeToVisit: 'May to October',
    climate: 'tropical',
    tags: ['beach', 'island', 'honeymoon', 'diving', 'luxury', 'family'],
    highlights: ['Mamanuca Islands', 'Yasawa Islands', 'Sabeto Mud Pools', 'Denarau Marina', 'Cloudbreak Surf Spot'],
    coordinates: { lat: -17.7134, lng: 178.065 },
    safetyRating: 5,
    activities: [
      { name: 'Mamanuca Island Cruise', type: 'relaxation', description: 'Sail the surf-famous isles', price: 120, duration: '8 hours', rating: 4.8 },
      { name: 'Rainbow Reef Dive', type: 'adventure', description: 'World-class soft-corals', price: 150, duration: '5 hours', rating: 4.9 },
      { name: 'Village Kava Ceremony', type: 'cultural', description: 'Share the traditional drink', price: 40, duration: '3 hours', rating: 4.7 }
    ]
  },

  /* ------------------- FRENCH POLYNESIA ------------------- */
  {
    name: 'Bora Bora',
    country: 'French Polynesia',
    continent: 'Oceania',
    description: 'Bora Bora is the pearl of the South Pacific — an extinct volcano ringed by a turquoise lagoon dotted with islets called motu. Stay in legendary overwater bungalows, snorkel rays and sharks, and watch sunsets from Mount Otemanu\'s shadow.',
    shortDescription: 'Stunning South Pacific lagoon of overwater villas and Mount Otemanu',
    image: 'https://images.unsplash.com/photo-1601604451607-332d3203d425?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1601604451607-332d3203d425?w=800&q=80',
      'https://images.unsplash.com/photo-1652842183703-47c2f7bb8c3c?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 1100,
    priceRange: '$$$$',
    avgDailyBudget: 350,
    currency: 'XPF',
    languages: ['French', 'Tahitian', 'English'],
    timezone: 'TAHT (UTC-10)',
    bestTimeToVisit: 'May to October',
    climate: 'tropical',
    tags: ['beach', 'luxury', 'honeymoon', 'overwater-villa', 'romance', 'island'],
    highlights: ['Overwater Bungalows', 'Mount Otemanu', 'Lagoon Sanctuary', 'Matira Beach', 'Helicopter Tour'],
    coordinates: { lat: -16.5004, lng: -151.7415 },
    safetyRating: 5,
    activities: [
      { name: 'Lagoon Shark & Ray Swim', type: 'adventure', description: 'Snorkel graceful rays', price: 100, duration: '3 hours', rating: 4.9 },
      { name: '4x4 Otemanu Safari', type: 'adventure', description: 'WWII cannons and peaks', price: 80, duration: '4 hours', rating: 4.7 },
      { name: 'Sunset Catamaran Cruise', type: 'relaxation', description: 'Champagne over the lagoon', price: 140, duration: '2 hours', rating: 4.9 }
    ]
  }
];

/**
 * The full catalog, ordered by region. The first entries keep the original
 * seed order (Bali, Santorini, Tokyo ...) so any legacy index-based lookups
 * still resolve, but seed trips now resolve by name (see seed.js).
 */
const destinationCatalog = [
  // --------------------------------------------------------------------------
  // Single source of truth for the catalog. Each destination lives in exactly
  // one region array above (grouped by region/continent). The spread below
  // composes the full catalog, keeping the original seed order (Bali,
  // Santorini, Tokyo ...) at the front so any legacy index-based lookups
  // still resolve (new seed trips resolve by name — see seed.js).
  // --------------------------------------------------------------------------
  ...asia,
  ...europe,
  ...northAmerica,
  ...southAmerica,
  ...africa,
  ...oceania
];

module.exports = destinationCatalog;
