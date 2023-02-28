import { Response, Request } from 'express';
import { HOURS_24 } from '../../../constants';
import asyncHandler from '../../../middleware/asyncHandler';
import User from '../../../models/User';
import sendSms from '../../../modules/smsSender';
import ErrorResponse from '../../../utils/errorResponse';

// @route         POST /api/v1/users/confirm-phone
// @description   Send confirmation code to phone number
// @access        Private
export const requestPhoneNumberConfirmation = asyncHandler(
  async (req: any, res: Response, next: Function): Promise<void> => {
    const user: any = await User.findById(req.user._id).select('-password');
    const phoneNumber = user.phoneNumber || req.body.phoneNumber;

    if (!user) {
      return next(new ErrorResponse('User not found.', 404));
    }

    if (user && user.isPhoneNumberConfirmed) {
      return next(new ErrorResponse('Phone number is already confirmed.', 500));
    }

    if (!phoneNumber) {
      return next(new ErrorResponse('Add a phone number first.', 400))
    }

    try {
      const phoneNumberConfirmationToken = user.generatePhoneNumberConfirmationToken();
      user.phoneNumber = user.phoneNumber || req.body.phoneNumber;

      await user.save();

      const message = `This is your token: ${phoneNumberConfirmationToken}`;
      await sendSms(phoneNumber, message);

      res.status(200).json({
        success: true,
        message: 'Token was sent successfully.',
      });
    } catch (error) {
      user.phoneNumberConfirmationToken = undefined;
      user.phoneNumberConfirmationExpire = undefined;

      await user.save();

      return next(new ErrorResponse('Token could not be sent', 500));
    }
  }
);
