import mongoose from 'mongoose';

const memberProfileSchema = new mongoose.Schema({
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

const MemberProfiles = mongoose.model('MemberProfile', memberProfileSchema);

export default MemberProfiles;