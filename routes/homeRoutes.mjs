import express from 'express';
import Registration from 'models/registration.mjs';
import {logger} from 'middleware/logger.mjs';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const registrants = await Registration.find().sort({ createdAt: -1 });
    res.render('home', {registrants});
  }
  catch (err) {
    // Log errors and respond with a 500 status
    logger.error(`Error loading data: ${err.message}`);
    res.status(500).send('Error loading data.');
  }
});

export default router;