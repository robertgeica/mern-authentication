import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

// apply middlewares
app.use(cors());
app.use(express.json());

const PORT: string | number = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
