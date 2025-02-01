import express from 'express';
import Registration from '../models/registration.mjs';
import {logger} from '../middleware/logger.mjs';
import authenticate from '../middleware/authentication.mjs';

const router = express.Router();

//Add new
router.post('/', async (req, res) => {
  try {
    const create = await Registration
    .create(req.body);
    console.log(req.body);
    res.json(create);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});

export default router;