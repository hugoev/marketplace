require('dotenv').config();
const connectDB = require('./config/database');
const seedDatabase = require('./utils/seeder');

// Connect to MongoDB and run seeder
connectDB().then(() => {
  console.log('Connected to MongoDB...');
  seedDatabase();
}); 