const mongoose = require('mongoose');

let mongod = null;

const connectDB = async () => {
  try {
    // Try connecting to the configured URI first
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If it's a connection refused error, try in-memory MongoDB
    if (error.message && error.message.includes('ECONNREFUSED')) {
      console.log('Local MongoDB not found, starting in-memory MongoDB...');
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        const conn = await mongoose.connect(uri);
        console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
        console.log(`  → URI: ${uri}`);
        console.log(`  → Data will be lost when the server stops.`);
      } catch (memError) {
        console.error(`Failed to start in-memory MongoDB: ${memError.message}`);
        process.exit(1);
      }
    } else {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
};

module.exports = connectDB;
module.exports.disconnectDB = disconnectDB;
