import { Response, Request } from 'express';
import crypto from 'crypto';
import User from '../../../models/User';
import ErrorResponse from '../../../utils/errorResponse';
import asyncHandler from '../../../middleware/asyncHandler';

// @route         PUT /api/v1/users/confirm-email/:token
// @description   Confirm user email
// @access        Public
export const confirmEmail = asyncHandler(
  async (req: Request, res: Response, next: Function): Promise<void> => {
    const emailConfirmationToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    let user: any = await User.findOne({
      emailConfirmationToken,
      emailConfirmationExpire: { $gt: Date.now() },
    }).select('-password');

    if (!user) {
      return next(new ErrorResponse('Invalid or expired token.', 400));
    }

    user.isEmailConfirmed = true;
    user.emailConfirmationToken = undefined;
    user.emailConfirmationExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Your email was confirmed successfully.',
      token: user.getSignedJwtToken(),
    });
  }
);
