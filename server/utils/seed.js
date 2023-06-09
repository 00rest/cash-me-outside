const connection = require('../../config/connection');
const { User } = require('../models');

const { users } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing User
  await User.deleteMany({});

  // Drop existing Thought
  await Thought.deleteMany({});

  // Add user to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
