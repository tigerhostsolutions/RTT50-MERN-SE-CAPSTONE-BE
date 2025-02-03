import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Registration from '../models/registration.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
// Hardcoded test users
  const testUsers = [
    {
      email: "test1@example.com",
      password: await bcrypt.hash("password123", 10), // Pre-hashed password
    },
    {
      email: "test2@example.com",
      password: await bcrypt.hash("securepass456", 10),
    },
  ];
  try {
    // Find registrant by email
    // const registrant = await Registration.findOne({ email });
    const registrant = testUsers.find(user => user.email === email);
    console.log('Registrant Found:', registrant);

    if (!registrant) {
      console.log('No registrant found with this email address!');
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, registrant.password);
    console.log('Password Entered:', password);
    console.log('Stored Hashed Password:', registrant.password);

    if (!isPasswordValid) {
      console.log('Password validation failed!');
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT Token
    const token = jwt.sign({ email: registrant.email },
    // const token = jwt.sign(
    //     { id: registrant._id, email: registrant.email, role: registrant.role
        //     }, //
        //     Payload/DB use

        process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with token
    res.json({ token });
  } catch (err) {
    console.error('Error occurred:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;