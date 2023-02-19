import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { RETRY_DATABASE_CONNECTION_TIMEOUT } from '../constants';
dotenv.config();

const URI: string | undefined =
  process.env.NODE_ENV === 'dev'
    ? process.env.MONGODB_URI_LOCAL
    : process.env.MONGODB_URI;

export const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);
    const connection = await mongoose.connect(URI || '', {});

    console.log(`Database connected: ${connection.connection.host}`);
  } catch (error: any) {
    console.log(`Error connecting. ${error.message}`);

    process.env.NODE_ENV === 'dev' &&
      setTimeout(connectDatabase, RETRY_DATABASE_CONNECTION_TIMEOUT);
  }
};
