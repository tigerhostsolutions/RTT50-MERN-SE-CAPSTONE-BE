import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  age: {
    type:Number,
    required: true
  },
  sex: {
    type:String,
    required:true
  },
  location: {
    type:String,
    required: true
  },
  about: {
    type:String,
    required:true
  }
})

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;