import express from 'express';
import Registration from '../models/registration.mjs';
import bcrypt from 'bcrypt';

const router = express.Router();

// Retrieve by Gender - query param implementation
router.get('/filter', async (req, res) => {
  try {
    const gender = req.query.gender; // Query parameter for gender (e.g., male or female)

    // Input validation for gender
    if (!gender || !['male', 'female'].includes(gender.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid or missing gender filter parameter. Allowed values: male, female' });
    }

    // Filter by gender
    const filtered_data = await Registration.find({
      gender: gender.toLowerCase(), // Case-insensitive filtering
    });

    if (filtered_data.length === 0) {
      return res.status(404).json({ message: 'No data found matching the gender filter criteria.' });
    }

    // Render the profile card with filtered data
    res.render('profileCard', { femaleData: filtered_data, maleData: filtered_data });
  } catch (e) {
    // Logging the error (use winston or console.error)
    console.error(`Error in retrieving gender-filtered data: ${e.message}`);

    // Return generic error response
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Add new
router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const create = await Registration.create({ ...req.body, password: hashedPassword });
    console.log(req.body);
    res.json(create);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});

export default router;