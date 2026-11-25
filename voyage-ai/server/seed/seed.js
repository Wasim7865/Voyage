const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const Destination = require('../models/Destination');
const Trip = require('../models/Trip');
const Place = require('../models/Place');

const destinationCatalog = require('../data/destinationCatalog');

// All destination records live in the centralized catalog
// (server/data/destinationCatalog.js). Add new destinations there, not here.
const destinations = destinationCatalog;

const demoPlaces = [
  { name: 'Kuta Beach', destination: null, category: 'beach', description: 'Famous surfing beach', rating: 4.5, priceLevel: 'free', tags: ['surfing', 'sunset'] },
  { name: 'Ubud Art Market', destination: null, category: 'market', description: 'Traditional crafts market', rating: 4.3, priceLevel: '$', tags: ['shopping', 'crafts'] },
  { name: 'La Santorini Bistro', destination: null, category: 'restaurant', description: 'Caldera view dining', rating: 4.7, priceLevel: '$$$', tags: ['greek-food', 'sunset'] },
  { name: 'Senso-ji Temple', destination: null, category: 'temple', description: 'Ancient Buddhist temple', rating: 4.8, priceLevel: 'free', tags: ['culture', 'history'] },
  { name: 'Shibuya 109', destination: null, category: 'shopping', description: 'Iconic fashion department store', rating: 4.2, priceLevel: '$$', tags: ['fashion', 'shopping'] },
  { name: 'Jungfraujoch', destination: null, category: 'attraction', description: 'Top of Europe observation deck', rating: 4.9, priceLevel: '$$$', tags: ['mountains', 'scenic'] }
];

const seedDB = async () => {
  // Only connect if not already connected (e.g. reusing an existing server connection)
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected for seeding...');
    } catch (connError) {
      if (connError.message && connError.message.includes('ECONNREFUSED')) {
        console.log('Local MongoDB not found, starting in-memory MongoDB for seeding...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        await MongoMemoryServer.create().then(m => m.getUri()).then(uri => mongoose.connect(uri)).then(() => console.log('In-Memory MongoDB connected for seeding'));
      } else {
        throw connError;
      }
    }
  }

  try {
    // Clear existing data
    await User.deleteMany({});
    await Destination.deleteMany({});
    await Trip.deleteMany({});
    await Place.deleteMany({});

    console.log('Cleared existing data');

    // Create users
    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@voyageai.com',
      password: 'admin123',
      role: 'admin',
      bio: 'Travel enthusiast and Voyage AI administrator'
    });

    const demoUser = await User.create({
      name: 'Alex Morgan',
      email: 'demo@voyageai.com',
      password: 'demo123',
      role: 'user',
      bio: 'Passionate traveler exploring the world one destination at a time',
      travelPreferences: {
        budget: 'moderate',
        travelStyle: 'adventure',
        interests: ['photography', 'hiking', 'local cuisine', 'cultural experiences']
      }
    });

    console.log('Created demo users');
    console.log('Admin: admin@voyageai.com / admin123');
    console.log('Demo: demo@voyageai.com / demo123');

    // Create destinations
    const createdDestinations = await Destination.insertMany(destinations);
    console.log(`Created ${createdDestinations.length} destinations`);

    // Create trips for demo user
    const trips = [
      {
        user: demoUser._id,
        title: 'Bali Adventure',
        description: 'Two weeks exploring the best of Bali',
        destination: createdDestinations.find(d => d.name === 'Bali')._id,
        destinationName: 'Bali, Indonesia',
        startDate: new Date('2026-10-15'),
        endDate: new Date('2026-10-29'),
        status: 'upcoming',
        travelers: 2,
        budget: { total: 3000, spent: 450, currency: 'USD', breakdown: { accommodation: 1200, transportation: 600, food: 500, activities: 450, shopping: 150, other: 100 } },
        coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
        itinerary: [
          {
            day: 1,
            date: new Date('2026-10-15'),
            title: 'Arrival in Bali',
            activities: [
              { time: '14:00', title: 'Airport Transfer', category: 'transport', cost: 25 },
              { time: '16:00', title: 'Check-in at Villa', category: 'accommodation', cost: 120 },
              { time: '19:00', title: 'Welcome Dinner at Jimbaran Bay', category: 'food', cost: 35 }
            ]
          },
          {
            day: 2,
            date: new Date('2026-10-16'),
            title: 'Ubud Exploration',
            activities: [
              { time: '08:00', title: 'Breakfast at Villa', category: 'food', cost: 10 },
              { time: '09:30', title: 'Tegallalang Rice Terraces', category: 'sightseeing', cost: 15 },
              { time: '12:00', title: 'Lunch at Local Warung', category: 'food', cost: 8 },
              { time: '14:00', title: 'Ubud Monkey Forest', category: 'sightseeing', cost: 10 },
              { time: '16:00', title: 'Ubud Art Market', category: 'shopping', cost: 30 },
              { time: '19:00', title: 'Traditional Kecak Dance', category: 'activity', cost: 20 }
            ]
          }
        ]
      },
      {
        user: demoUser._id,
        title: 'Tokyo Cherry Blossom',
        description: 'Spring trip to see cherry blossoms in Japan',
        destination: createdDestinations.find(d => d.name === 'Tokyo')._id,
        destinationName: 'Tokyo, Japan',
        startDate: new Date('2027-03-25'),
        endDate: new Date('2027-04-05'),
        status: 'planning',
        travelers: 2,
        budget: { total: 5000, spent: 0, currency: 'USD' },
        coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
        itinerary: []
      },
      {
        user: demoUser._id,
        title: 'Greek Island Hopping',
        description: 'Summer trip through Santorini and Mykonos',
        destination: createdDestinations.find(d => d.name === 'Santorini')._id,
        destinationName: 'Santorini, Greece',
        startDate: new Date('2026-06-10'),
        endDate: new Date('2026-06-20'),
        status: 'completed',
        travelers: 2,
        budget: { total: 4000, spent: 3600, currency: 'USD' },
        coverImage: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
        itinerary: []
      }
    ];

    const createdTrips = await Trip.insertMany(trips);
    console.log(`Created ${createdTrips.length} trips`);

    console.log('\nSeed completed successfully!');
    return { adminUser, demoUser, createdDestinations, createdTrips };
  } catch (error) {
    console.error('Seed error:', error);
    throw error;
  }
};

// Export for programmatic use (e.g. server auto-seed when DB is empty)
module.exports = { seedDB };

// Run directly when invoked: `node seed/seed.js` or `npm run seed`
if (require.main === module) {
  seedDB()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}