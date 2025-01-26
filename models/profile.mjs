const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  age: {
    type:Number,
    required: true
  },
  location: {
    type:String,
    required: true
  }
})

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile