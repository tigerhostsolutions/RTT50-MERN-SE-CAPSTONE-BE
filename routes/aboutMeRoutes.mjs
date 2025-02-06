import express from 'express';
import AboutMe from '../models/about.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const router = express.Router();
dotenv.config();

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