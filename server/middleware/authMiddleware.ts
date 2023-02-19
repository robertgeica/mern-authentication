import { Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import asyncHandler from './asyncHandler';
import ErrorResponse from '../utils/errorResponse';

interface JwtPayload {
  id: string;
}

const protect = asyncHandler(
  async (req: any, res: Response, next: Function) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;

        req.user = await User.findById(decoded.id).select('-password');

        next();
      } catch (error) {
        return next(
          new ErrorResponse(`Not authorized, invalid or expired token.`, 401)
        );
      }
    }

    if (!token) {
      return next(new ErrorResponse(`Not authorized, no token found.`, 401));
    }
  }
);

export default protect;
