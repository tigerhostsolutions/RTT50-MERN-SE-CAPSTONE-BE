import mongoose from 'mongoose';

const maleProfileSchema = new mongoose.Schema({
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

const MaleProfileModel = mongoose.model('Male Profile Model', maleProfileSchema);

export default MaleProfileModel;