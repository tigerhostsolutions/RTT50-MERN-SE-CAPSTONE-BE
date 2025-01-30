import express from 'express';
const router = express.Router();
import {
  seedFemaleProfiles, seedMaleProfiles,
} from '../config/seed.mjs';

router.get('/seed/female', async (req, res) => {
  try {
    await seedFemaleProfiles();
    res.status(200).send('Female Profiles seeding requested/delivered!');
  } catch (error) {
    res.status(500).send(`Error seeding Female Profiles: ${error.message}`);
  }
});

router.get('/seed/male', async (req, res) => {
  try {
    await seedMaleProfiles();
    res.status(200).send('Male Profiles seeding requested/delivered!');
  } catch (error) {
    res.status(500).send(`Error seeding Male Profiles: ${error.message}`);
  }
});

router.get('/seed/all', async (req, res) => {
  try {
    const promises = [seedFemaleProfiles(), seedMaleProfiles()];
    await Promise.all(promises);
    res.status(200).send('Seeding for all profiles completed!');
  } catch (error) {
    res.status(500).send(`Error seeding all profiles: ${error.message}`);
  }
});

export default router;