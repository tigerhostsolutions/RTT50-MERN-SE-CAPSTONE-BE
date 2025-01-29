import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
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

const UserProfile = mongoose.model('User Profiles', userProfileSchema);

export default UserProfile;