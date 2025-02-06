import express from 'express';

const router = express.Router();

// Mock Profile Data
const profiles = [
  { id: '1', name: 'John Doe', role: 'Developer' },
  { id: '2', name: 'Jane Smith', role: 'Designer' },
  { id: '3', name: 'Alice Johnson', role: 'Product Manager' },
];

// Define the GET route
router.get('/', (req, res) => {
  // Optional: Add token validation here if required
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized. Token is missing or invalid.' });
  }

  // Return the profile data
  res.status(200).json(profiles);
});

export default router;