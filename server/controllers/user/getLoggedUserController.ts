import { Request, Response } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import User from '../../models/User';
import { IUser } from '../../types/User';
import ErrorResponse from '../../utils/errorResponse';

interface IRequest extends Request {
  user: IUser;
}

// @route         GET /api/v1/users/logged-user
// @description   Get user
// @access        Private
export const getLoggedUser = asyncHandler(
  async (req: IRequest, res: Response, next: Function): Promise<void> => {
    const user: any = await User.findById(req.user._id).select(
      '-password'
    );

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.user._id}`, 404)
      );
    }

    if (user) {
      res.json({
        success: true,
        message: 'Logged in user found.',
        user: user._doc,
      });
    }
  }
);
