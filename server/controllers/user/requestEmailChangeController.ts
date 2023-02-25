import { isValidEmail } from './../../utils/validateEmail';
import { Response, Request } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import User from '../../models/User';
import sendEmail from '../../modules/emailSender';
import { confirmEmailChange } from '../../utils/emailTemplates';
import ErrorResponse from '../../utils/errorResponse';

// @route         POST /api/v1/users/change-email
// @description   Send link to confirm email change
// @access        Public
export const requestEmailChange = asyncHandler(
  async (req: any, res: Response, next: Function): Promise<void> => {
    const validEmail = isValidEmail(req.body.newEmail);
    if (!validEmail) {
      return next(new ErrorResponse('Email is not valid.', 400));
    }

    const emailExists = await User.findOne({ email: req.body.newEmail });
    if (emailExists) {
      return next(new ErrorResponse('Email is already used.', 400));
    }

    const user: any = await User.findById(req.user._id).select('-password');
    if (!user) {
      return next(new ErrorResponse('User not found.', 400));
    }

    user.newEmail = req.body.newEmail;
    await user.save();

    const emailChangeConfirmationToken = user.generateEmailChangeToken(
      'changeEmailStepOneToken',
      'changeEmailStepOneExpire'
    );

    await user.save();

    try {
      const emailChangeUrl =
        process.env.NODE_ENV === 'dev'
          ? `${process.env.BASE_URL}:${process.env.PORT}/change-email/${emailChangeConfirmationToken}`
          : `${process.env.BASE_URL}/change-email/${emailChangeConfirmationToken}`;

      await sendEmail({
        to: user.email,
        subject: 'Confirm your email change 1/2',
        html: confirmEmailChange(emailChangeUrl),
      });

      res.status(200).json({
        success: true,
        message: 'Change email confirmation request was sent successfully.',
      });
    } catch (error) {
      user.newEmail = undefined;
      user.changeEmailStepOneToken = undefined;
      user.changeEmailStepOneExpire = undefined;

      await user.save();

      return next(new ErrorResponse('Email could not be sent', 500));
    }
  }
);
