import { Request, Response } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import User from '../../models/User';
import { imageUpload } from '../../modules/imageUpload';
import { IUser } from '../../types/User';
import ErrorResponse from '../../utils/errorResponse';

interface IRequest extends Request {
  user: IUser;
  files: any;
}

// @desc      Upload image for user
// @route     PATCH /api/v1/users/upload-image
// @access    Private
export const uploadUserImage = asyncHandler(
  async (req: IRequest, res: Response, next: Function) => {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.params.id}.`, 404)
      );
    }

    if (!req.body.usage) {
      return next(new ErrorResponse(`You must specify image usage.`, 400));
    }

    const file = req.files.files;

    await imageUpload(file, user._id, req.body.usage, 'users', User, res, next);
  }
);
