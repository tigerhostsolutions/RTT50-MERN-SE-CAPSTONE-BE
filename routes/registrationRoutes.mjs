import express from 'express';
import Registration from '../models/registration.mjs';
import bcrypt from 'bcrypt';

const router = express.Router();

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