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

const ZodiacProfile = mongoose.model('Zodiac Profile', zodiacSchema);

export default ZodiacProfile;