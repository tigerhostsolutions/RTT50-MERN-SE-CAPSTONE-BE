import express from 'express';
const router = express.Router();
import {
  seedMatchMaker, seedUserProfile,
} from '../config/seed.mjs';

router.get('/seed/matchmaker', async (req, res) => {
  try {
    await seedMatchMaker();
    res.status(200).send('MatchMaker seeding requested/delivered!');
  } catch (error) {
    res.status(500).send(`Error seeding MatchMaker: ${error.message}`);
  }
});

router.get('/seed/user', async (req, res) => {
  try {
    await seedUserProfile();
    res.status(200).send('User seeding requested/delivered!');
  } catch (error) {
    res.status(500).send(`Error seeding User: ${error.message}`);
  }
});

router.get('/seed/all', async (req, res) => {
  try {
    const promises = [seedMatchMaker(), seedUserProfile()];
    await Promise.all(promises);
    res.status(200).send('Seeding for all models completed!');
  } catch (error) {
    res.status(500).send(`Error seeding all models: ${error.message}`);
  }
});

export default router;