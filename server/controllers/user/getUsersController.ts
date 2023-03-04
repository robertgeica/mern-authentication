import { Request, Response } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import User from '../../models/User';
import { IUser } from '../../types/User';
import ErrorResponse from '../../utils/errorResponse';

interface IRequest extends Request {
  user: IUser;
}

// @route         GET /api/v1/users
// @description   Get users
// @access        Private, authorized
export const getUsers = asyncHandler(
  async (_req: IRequest, res: any, next: Function): Promise<void> => {
    const users: IUser[] = await User.find();

    if (!users) {
      return next(new ErrorResponse(`Users not found.`, 404));
    }

    return res.status(200).json({ ...res.advanceQuery });
  }
);
