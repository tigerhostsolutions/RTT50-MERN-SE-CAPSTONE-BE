import express from 'express';
const router = express.Router();
import { seedMemberProfiles } from '../config/seed.mjs';

router.get('/seed', async (req, res) => {
  try {
    const promises = seedMemberProfiles();
    await Promise.all(promises);
    res.status(200).send('Seeding for all profiles completed!');
  } catch (error) {
    res.status(500).send(`Error seeding all profiles: ${error.message}`);
  }
});

export default router;