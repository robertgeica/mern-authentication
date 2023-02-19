import { Response, Request } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import ErrorResponse from '../../utils/errorResponse';
import User from '../../models/User';
import { IUser } from '../../types/User';

interface IRequest extends Request {
  user: IUser;
}

// @route         PATCH /api/v1/users/:id
// @description   Update user
// @access        Private
export const updateUser = asyncHandler(
  async (req: IRequest, res: Response, next: Function): Promise<void> => {
    const user: IUser | null = await User.findById(req.user._id);
    if (!user) {
      return next(new ErrorResponse('User not found.', 404));
    }

    const { body } = req;

    delete body.email;
    delete body.password;
    delete body.isEmailConfirmed;
    delete body.emailConfirmationExpire;
    delete body.emailConfirmationToken;
    delete body.twoFactorAuthCode;
    delete body.resetPasswordExpire;
    delete body.resetPasswordToken;

    await User.findByIdAndUpdate({ _id: req.user._id }, body, {
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'User updated.' });
  }
);
