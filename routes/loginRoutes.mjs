import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// Mock User (Replace with Database Query in Production)
const users = [
  {
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10), // Hashed password
  },
];

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

    // Validate password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password.' });

    // Generate JWT Token
    const token = jwt.sign({ email: user.email }, 'secretkey', { expiresIn: '1h' });

    // Respond with token
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;