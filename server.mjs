import dotenv from 'dotenv';
import express from 'express';
import conn from './config/db.mjs';
import {logger} from './middleware/logger.mjs';
import UserProfiles from './models/user_profile.mjs';// user profiles
import MatchMaker from './models/matchmaker_profile.mjs';// match profiles
import SeedRoutes from './routes/seed_routes.mjs';
import cors from 'cors';

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

// Route Home
app.get('/', (req, res) => {
  res.send('Welcome')
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
