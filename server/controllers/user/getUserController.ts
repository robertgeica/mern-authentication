import { Request, Response } from 'express';
import { SELECT_GET_USER_FIELDS } from '../../constants';
import asyncHandler from '../../middleware/asyncHandler';
import User from '../../models/User';
import { IUser } from '../../types/User';
import ErrorResponse from '../../utils/errorResponse';

interface IRequest extends Request {
  user: IUser;
}

// @route         GET /api/v1/users/:id
// @description   Get user
// @access        Private
export const getUser = asyncHandler(
  async (req: IRequest, res: Response, next: Function): Promise<void> => {
    const user: any = await User.findById(req.params.id).select(SELECT_GET_USER_FIELDS);

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.user._id}`, 404)
      );
    }

    if (user) {
      res.status(200).json({
        success: true,
        message: 'User found.',
        data: user._doc,
      });
    }
  }
);
