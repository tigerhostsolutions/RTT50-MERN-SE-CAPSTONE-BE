import fs from 'fs/promises'; // Using promise-based fs
import path from 'path';
import { fileURLToPath } from 'url';

// Import data models
import MatchMaker from '../models/matchmaker_profile.mjs';
import UserProfile from '../models/user_profile.mjs';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to read JSON data
const readJsonFile = async (filePath) => {
  try {
    const absolutePath = path.join(__dirname, filePath);
    const data = await fs.readFile(absolutePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    throw error;
  }
}

const seedMatchMaker = async () => {
  try {
    const exists = await MatchMaker.findOne();//Check if data already exists
    if (exists) {
      console.log('Data for MatchMaker already seeded.');
      return;
    }
    //read seed data from file
    const data = await readJsonFile('../data/matchmaker_data.json');
    await MatchMaker.insertMany(data);
    console.log('MatchMaker seeding completed.');
  }
  catch (error) {
    console.error('Error seeding MatchMaker:', error.message);
  }
}

const seedUserProfile = async () => {
  try {
    const exists = await UserProfile.findOne();//Check if data already exists
    if (exists) {
      console.log('Data for User Profile already seeded.');
      return;
    }
    //read seed data from file
    const data = await readJsonFile('../data/userprofile_data.json');
    await UserProfile.insertMany(data);
    console.log('User Profile seeding completed.');
  } catch (error) {
    console.error('Error seeding User Profile:', error.message);
  }
}

export { seedMatchMaker, seedUserProfile };