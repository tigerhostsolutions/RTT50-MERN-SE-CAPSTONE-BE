import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Registration from '../models/registration.mjs';
import dotenv from 'dotenv';

dotenv.config();

// Function to validate if a password is a bcrypt hash
function isBcryptHash(hash) {
  const bcryptRegex = /^\$2[abxy]?\$[0-9]{1,2}\$.{53}$/;
  return bcryptRegex.test(hash);
}

const updatePasswords = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const users = await Registration.find({});
    for (const user of users) {
      console.log(`Processing user: ${user.email}, Password: ${user.password}`);

      if (!isBcryptHash(user.password)) { // Check if password needs hashing
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        console.log(`Password updated for user: ${user.email}`);
      } else {
        console.log(`Skipping user ${user.email}, password already hashed`);
      }
    }

    console.log('Password update complete!');
  } catch (error) {
    console.error('Error updating passwords:', error.message);
  } finally {
    mongoose.disconnect();
  }
};


updatePasswords();