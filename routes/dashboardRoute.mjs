import express from 'express';
import authMiddleware from '../middleware/authentication.mjs';

const router = express.Router();

router.get('/dashboard', authMiddleware, (req, res) => {
  // If the token is valid, the middleware attaches `req.registrant` with the
  // decoded payload
  res.status(200).json({
    message: `Welcome to the Dashboard, ${req.registrant.email}`,
    registrant: req.registrant,
    data: {
      profileData: 'Some data for the dashboard...' // Example response
    }
  });
});

export default router;