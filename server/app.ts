import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './database/database';
import { errorHandler } from './middleware/errorHandler';
dotenv.config();

// connect db
connectDatabase();

const app: Express = express();

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(errorHandler);

const PORT: string | number = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
