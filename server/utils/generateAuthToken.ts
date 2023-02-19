import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

const generateAuthToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

export default generateAuthToken;
