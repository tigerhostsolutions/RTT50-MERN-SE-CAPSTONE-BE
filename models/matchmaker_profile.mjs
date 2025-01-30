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
  bio: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    require: false
  }
})

const MatchMaker = mongoose.model('Match Maker', matchMakerSchema);

export default MatchMaker;