import express from 'express';
import Member from '../models/registration.mjs';
import {logger} from '../middleware/logger.mjs';
import authenticate from '../middleware/authentication.mjs';
import {validate_route_param_id} from '../middleware/validate_request.mjs';

const router = express.Router();

// Delete All
router.delete('/', async (req,res)=>{
  try{
    const delete_all = await Member.deleteMany({})
    logger.warn('Delete attempted: All data has been deleted!')
    console.warn('Delete attempted: All data has been deleted!')
    res.json(delete_all)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})
// Retrieve All or Filter by Query Parameters
router.get('/', async (req, res) => {
  try {
    const { name, age, gender } = req.query;
    const filters = {};

    // Apply filters dynamically based on provided query parameters
    if (name) filters.name = { $regex: name, $options: 'i' };
    if (age) filters.age = { $regex: age, $options: 'i' };
    if (gender) filters.gender = { $regex: gender, $options: 'i' };

    // Perform the filtered search
    const results = await Member.find(filters);
    res.render('profileCard', {memberData: results});

  } catch (e) {
    res.status(500).json({ errors: e.message });
  }
});
// Retrieve by Name - route param implementation
router.get('/filter/:param', async (req, res) => {
  try {
    const filter_key = req.params.param.toLowerCase();
    const filtered_data = await Member.find({
      name: { $regex: new RegExp(filter_key, "i") },
    });
    res.render('profileCard', {memberData: filtered_data});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// Retrieve by id
router.get('/:id', validate_route_param_id, async (req, res) => {
  try {
    const get_one = await Member.findById(req.params.id);
    res.render('profileCard', {memberData: [get_one]});
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});
//Add new
router.post('/', async (req, res) => {
  try {
    const create = await Member
    .create(req.body);
    console.log(req.body);
    res.json(create);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});
//Update by id
router.put('/:id', validate_route_param_id, async (req,res)=>{
  try {
    const update= await Member
    .findByIdAndUpdate(req.params.id, req.body)
    res.json(update)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})
//Delete by id
router.delete('/:id', authenticate, validate_route_param_id, async (req,res)=>{
  try{
    const delete_one = await Member
    .findByIdAndDelete(req.params.id)
    logger.warn('Delete attempted: Item has been deleted!')
    console.warn('Delete attempted: Item has been deleted!')
    res.json(delete_one)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})

export default router;
