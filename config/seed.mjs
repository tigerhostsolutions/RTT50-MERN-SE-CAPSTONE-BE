import fs from 'fs/promises'; // Using promise-based fs
import path from 'path';
import { fileURLToPath } from 'url';

// Import data models
import MemberProfileModel from '../models/memberProfiles.mjs';

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

const seedMemberProfiles = async () => {
  try {
    const exists = await MemberProfileModel.findOne();//Check if data already
    // exists
    if (exists) {
      console.log('Data for members already seeded.');
      return;
    }
    //read seed data from file
    const data = await readJsonFile('../data/memberData.json');
    await MemberProfileModel.insertMany(data);
    console.log('Member seeding completed.');
  } catch (error) {
    console.error('Error seeding member profiles:', error.message);
  }
}

export { seedMemberProfiles };