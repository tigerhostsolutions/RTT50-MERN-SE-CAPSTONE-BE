import mongoose from 'mongoose';
import {logger} from '../middleware/logger.mjs';

const conn = async () => {
  try {
    const {connection} = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`MongoDb Connection ${connection.host} Successful.`);
  }
  catch (e) {
    logger.error(`MongoDb Connection Error: ${e.message}`);
    process.exit(1);
  }
};

export default conn;