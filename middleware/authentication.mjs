// middleware/authenticate.js
import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user payload to the request object
    next(); // Continue to the next handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authenticate;