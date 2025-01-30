import dotenv from 'dotenv';
import express from 'express';
import conn from './config/db.mjs';
import {logger} from './middleware/logger.mjs';
import UserProfiles from './models/user_profile.mjs';// user profiles
import MatchMaker from './models/matchmaker_profile.mjs';// match profiles
import SeedRoutes from './routes/seed_routes.mjs';
import fs from 'fs/promises'; // Import the File System module to read JSON file
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const port = process.env.PORT;
conn();

// app.use(cors)
app.use(express.json());

const UserProfileRoutes = await import('./routes/user_profile_routes.mjs').then(
    module => module.default);
const MatchMakerRoute = await import('./routes/matchmaker_route.mjs').then(
    module => module.default);

// Route Definitions
app.use('/bsocial/user', UserProfileRoutes);
app.use('/bsocial/matchmaker', MatchMakerRoute);

app.set("views", "./views"); // This should match where your .ejs files are located
app.set('view engine', 'ejs');
app.use(express.static('views'));

// Simulate __dirname in ES module
const __filename = fileURLToPath(import.meta.url); // Get the file's full path
const __dirname = path.dirname(__filename); // Get the file's directory path
app.use('/data', express.static(path.join(__dirname, 'data')));

// Route Home
app.get('/', async (req, res) => {
  try {
    // Read the JSON file
    const dataPath = './data/matchmaker_data.json'; // Adjust path if data.json is elsewhere
    const rawData = await fs.readFile(dataPath, 'utf-8');
    const jsonData = JSON.parse(rawData); // Convert raw JSON string to JavaScript object
    // Render the profileCard.ejs file with the JSON data
    res.render('profileCard', { seedData: jsonData });
  } catch (err) {
    logger.error(`Error reading JSON file: ${err.message}`);
    res.status(500).send("Error loading data.");
  }
});

app.use('/bsocial/', SeedRoutes);// Route seed

//Route to seed all data
app.get('/bsocial/seed/all', async (req, res) => {
  try {
    await Promise.all([
      UserProfiles.deleteMany({}),
      MatchMaker.deleteMany({})
    ]);
    logger.warn('Delete on all data attempted at startup!');
    console.warn('Delete on all data attempted at startup!')
  }
  catch (e) {
    logger.error(`Error deleting data: ${e.message}`);
  }
});

// Starts the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
