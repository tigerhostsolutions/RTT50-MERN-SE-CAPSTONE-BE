import mongoose from 'mongoose';

const matchMakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  }
})

const MatchMaker = mongoose.model('Match Maker', matchMakerSchema);

export default MatchMaker;