import { Response, Request } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import User from '../../models/User';
import { IUser } from '../../types/User';
import ErrorResponse from '../../utils/errorResponse';

interface IRequest extends Request {
  user: IUser;
}

// @route         DELETE /api/v1/users/:id
// @description   Delete user
// @access        Private
export const deleteUser = asyncHandler(
  async (req: IRequest, res: Response, next: Function): Promise<void> => {
    const user: IUser | null = await User.findById(req.user._id);

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.user._id}`, 404)
      );
    }

    if (user._id.toString() === req.user._id.toString()) {
      await User.findByIdAndRemove(req.user._id);
      // delete other user resources
      // await Model.deleteMany({ user_id: req.user._id });

      res.status(204).json({
        success: true,
        message: 'Your account and all your data was deleted.',
      });
      return;
    }

    return next(
      new ErrorResponse('You are not allowed to modify other accounts.', 401)
    );
  }
);
