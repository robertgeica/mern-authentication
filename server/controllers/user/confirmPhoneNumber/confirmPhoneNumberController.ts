import { Response } from 'express';
import crypto from 'crypto';
import User from '../../../models/User';
import ErrorResponse from '../../../utils/errorResponse';
import asyncHandler from '../../../middleware/asyncHandler';

// @route         PUT /api/v1/users/confirm-phone/:token
// @description   Confirm user phone number
// @access        Private
export const confirmPhoneNumber = asyncHandler(
  async (req: any, res: Response, next: Function): Promise<void> => {
    const phoneNumberConfirmationToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    let user: any = await User.findOne({
      _id: req.user._id,
      phoneNumberConfirmationToken,
      phoneNumberConfirmationExpire: { $gt: Date.now() },
    }).select('-password');

    if (!user) {
      return next(new ErrorResponse('Invalid or expired token.', 400));
    }

    user.isPhoneNumberConfirmed = true;
    user.phoneNumberConfirmationToken = undefined;
    user.phoneNumberConfirmationExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Your phone number was confirmed successfully.',
      token: user.getSignedJwtToken(),
    });
  }
);
