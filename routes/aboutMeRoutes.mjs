import express from 'express';
import AboutMe from '../models/about.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const router = express.Router();
dotenv.config();


// GET /'api/members'
router.get('/', (req, res) => {
  // Simulating real-world workflow: Check for valid token
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized. Please provide a valid token.' });
  }

  // Return the members (profile cards)
  res.status(200).json(members); // Respond with the mock member data
});


// Update Bio
router.patch('/', async (req, res) => {
  const { bio } = req.body;
  const token = req.header('Authorization').replace('Bearer ', '');
  // const decoded = jwt.verify(token, 'your_secret_key');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const member = await AboutMe.findById(decoded.id);
  member.bio = bio;
  await member.save();

  res.send({ message: 'AboutMe updated successfully' });
});

export default router;