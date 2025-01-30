import fs from 'fs/promises'; // Using promise-based fs
import path from 'path';
import { fileURLToPath } from 'url';

// Import data models
import FemaleProfileModel from '../models/femaleProfiles.mjs';
import MaleProfileModel from '../models/maleProfiles.mjs';

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

const seedFemaleProfiles = async () => {
  try {
    const exists = await FemaleProfileModel.findOne();//Check if data already exists
    if (exists) {
      console.log('Data for FemaleProfileModel already seeded.');
      return;
    }
    //read seed data from file
    const data = await readJsonFile('../data/femaleData.json');
    await FemaleProfileModel.insertMany(data);
    console.log('FemaleProfileModel seeding completed.');
  }
  catch (error) {
    console.error('Error seeding FemaleProfileModel:', error.message);
  }
}

const seedMaleProfiles = async () => {
  try {
    const exists = await MaleProfileModel.findOne();//Check if data already exists
    if (exists) {
      console.log('Data for MaleProfileModel already seeded.');
      return;
    }
    //read seed data from file
    const data = await readJsonFile('../data/maleData.json');
    await MaleProfileModel.insertMany(data);
    console.log('MaleProfileModel seeding completed.');
  } catch (error) {
    console.error('Error seeding MaleProfileModel:', error.message);
  }
}

export { seedFemaleProfiles, seedMaleProfiles };