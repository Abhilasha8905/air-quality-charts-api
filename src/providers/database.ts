import mongoose from 'mongoose';
import logger from '../utils/logger';
import { MONGO_URI } from '../config';

const connectToDatabase = async () => {
  try {
    logger.startLog('Trying to connect to MongoDB');
    await mongoose.connect(MONGO_URI);
    logger.startLog('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectToDatabase;
