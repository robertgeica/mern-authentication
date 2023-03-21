import { Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import asyncHandler from './asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import { SELECT_AUTH_USER_FIELDS } from '../constants';

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

        req.user = await User.findById(decoded.id).select(
          SELECT_AUTH_USER_FIELDS
        );

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

const authorize = (roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(`You are not authorized.`, 403));
    }
    next();
  };
};

export { protect, authorize };
