import express from 'express';
import AboutMe from '../models/about.mjs';
import jwt from 'jsonwebtoken';
const router = express.Router();

// Update Bio
router.patch('/api/members/aboutMe', async (req, res) => {
  const { bio } = req.body;
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, 'your_secret_key');

  const member = await AboutMe.findById(decoded.id);
  member.bio = bio;
  await member.save();

  res.send({ message: 'AboutMe updated successfully' });
});

export default router;