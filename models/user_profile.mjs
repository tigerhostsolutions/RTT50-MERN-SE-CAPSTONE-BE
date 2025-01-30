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
  bio: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    require: false
  }
})

const UserProfile = mongoose.model('User Profiles', userProfileSchema);

export default UserProfile;