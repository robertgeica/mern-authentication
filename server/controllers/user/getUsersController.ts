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
  async (req: IRequest, res: Response, next: Function): Promise<void> => {
    const users: IUser[] = await User.find();

    if (!users) {
      return next(
        new ErrorResponse(`Users not found.`, 404)
      );
    }

    if (users) {
      res.status(200).json({
        success: true,
        message: 'Users found.',
        data: users,
      });
    }
  }
);
