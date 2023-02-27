import { Response, Request } from 'express';
import crypto from 'crypto';
import User from '../../../models/User';
import { IUser } from '../../../types/User';
import asyncHandler from '../../../middleware/asyncHandler';
import ErrorResponse from '../../../utils/errorResponse';

// @route         PUT /api/v1/users/reset-password/:token
// @description   Reset account password
// @access        Public
export const confirmPasswordReset = asyncHandler(
  async (req: Request, res: Response, next: Function): Promise<void> => {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user: any = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse('Invalid token.', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Your password was reseted successfully.',
      token: user.getSignedJwtToken(),
    });
  }
);
