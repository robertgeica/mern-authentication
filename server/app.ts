import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import { connectDatabase } from './database/database';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes/index';
import { xssClean } from './middleware/xssClean';

dotenv.config();

// connect db
connectDatabase();

const app: Express = express();

// mount middlewares
app.use(cors());
app.use(express.json());

// sanitize data
app.use(mongoSanitize());

// add xss protection
app.use(xssClean);

// mount router middleware
app.use(routes);

// mount error handler middleware
app.use(errorHandler);

// check if port was defined
if (!process.env.PORT) {
  console.error('PORT is not defined');
  process.exit(1);
}

const PORT: string | number = process.env.PORT;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
