import mongoose from 'mongoose';

const zodiacSchema = new mongoose.Schema({
  zodiac: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const ZodiacProfile = mongoose.model('ZodiacProfile', zodiacSchema);

export default ZodiacProfile;