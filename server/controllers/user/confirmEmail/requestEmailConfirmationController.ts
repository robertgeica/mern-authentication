import { Response, Request } from 'express';
import { EMAIL_SUBJECT_CONFIRM_EMAIL } from '../../../constants';
import asyncHandler from '../../../middleware/asyncHandler';
import User from '../../../models/User';
import sendEmail from '../../../modules/emailSender';
import { IUser } from '../../../types/User';
import { confirmAccountEmail } from '../../../utils/emailTemplates';
import ErrorResponse from '../../../utils/errorResponse';
import { generateEmailUrl } from '../../../utils/generateEmailUrl';

// @route         POST /api/v1/users/confirm-email
// @description   Send link to confirm email
// @access        Public
export const requestEmailConfirmation = asyncHandler(
  async (req: Request, res: Response, next: Function): Promise<void> => {
    const { email } = req.body as Pick<IUser, 'email'>;
    const user: any = await User.findOne({ email }).select('-password');

    if (!user) {
      return next(new ErrorResponse('User not found.', 404));
    }

    if (user && user.isEmailConfirmed) {
      return next(new ErrorResponse('Email already confirmed.', 500));
    }

    try {
      const emailConfirmationToken = user.generateEmailConfirmationToken();
      await user.save();

      const emailConfirmationUrl = generateEmailUrl(
        emailConfirmationToken,
        'confirm-email'
      );

      await sendEmail({
        to: user.email,
        subject: EMAIL_SUBJECT_CONFIRM_EMAIL,
        html: confirmAccountEmail(emailConfirmationUrl),
      });

      res.status(200).json({
        success: true,
        message: 'Confirmation email was sent successfully.',
      });
    } catch (error) {
      user.emailConfirmationToken = undefined;
      user.emailConfirmationExpire = undefined;

      await user.save();

      return next(new ErrorResponse('Email could not be sent', 500));
    }
  }
);
