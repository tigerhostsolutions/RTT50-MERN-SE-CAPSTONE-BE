import express from 'express';
import Registration from '../models/registration.mjs';
import bcrypt from 'bcrypt';
import upload from '../config/multer.mjs';

const router = express.Router();
// Retrieve All or Filter by Query Parameters
// router.get('/', async (req, res) => {
//   try {
//     const { name, age, gender } = req.query;
//     const filters = {};
//
//     // Apply filters dynamically based on provided query parameters
//     if (name) filters.name = { $regex: name, $options: 'i' };
//     if (age) filters.age = { $regex: age, $options: 'i' };
//     if (gender) filters.gender = { $regex: gender, $options: 'i' };
//
//     // Perform the filtered search
//     const results = await Registration.find(filters);
//     res.render('profileCard', {maleData: maleResults, femaleData: []});
//
//   } catch (e) {
//     res.status(500).json({ errors: e.message });
//   }
// });
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
    res.render('profileCard', { memberData: filtered_data });
  } catch (e) {
    // Logging the error (use winston or console.error)
    console.error(`Error in retrieving gender-filtered data: ${e.message}`);

    // Return generic error response
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Add new
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 16);

    // Check if a photo is uploaded
    const profileImage = req.file
                         ? `/uploads/${req.file.filename}` // Use uploaded file path
                         : `https://api.dicebear.com/5.x/initials/svg?seed=${req.body.name || 'Default'}`; // Auto-generate profile av

    const create = await Registration.create({ ...req.body, password: hashedPassword, profileImage, });
    console.log('Registration created:', create);
    res.json(create);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});

export default router;