import mongoose from 'mongoose';
import { mongoConfig } from '../config/dbConfig';
export const connDB = async () => {
  try {
    await mongoose.connect(mongoConfig.uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
