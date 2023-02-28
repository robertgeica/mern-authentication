import { Response, Request } from 'express';
import crypto from 'crypto';
import User from '../../../models/User';
import ErrorResponse from '../../../utils/errorResponse';
import asyncHandler from '../../../middleware/asyncHandler';
import sendEmail from '../../../modules/emailSender';
import { confirmChangeEmail, confirmEmailChanged } from '../../../utils/emailTemplates';
import { generateEmailUrl } from '../../../utils/generateEmailUrl';
import { EMAIL_SUBJECT_CONFIRMED_EMAIL_CHANGE, EMAIL_SUBJECT_CONFIRM_EMAIL_CHANGE_2 } from '../../../constants';

// @route         PUT /api/v1/users/change-email/:token
// @description   Confirm email change
// @access        Public
export const confirmEmailChange = asyncHandler(
  async (req: Request, res: Response, next: Function): Promise<void> => {
    const changeEmailToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    let user: any = await User.findOne({
      $or: [
        {
          changeEmailStepOneToken: changeEmailToken,
          changeEmailStepOneExpire: { $gt: Date.now() },
        },
        {
          changeEmailStepTwoToken: changeEmailToken,
          changeEmailStepTwoExpire: { $gt: Date.now() },
        },
      ],
    }).select('-password');

    if (!user) {
      return next(new ErrorResponse('Invalid or expired token.', 400));
    }

    if (user.changeEmailStepOneToken === changeEmailToken) {
      user.isEmailChangeStepOneConfirmed = true;
      user.changeEmailStepOneToken = undefined;
      user.changeEmailStepOneExpire = undefined;

      const emailChangeConfirmationToken = user.generateEmailChangeToken(
        'changeEmailStepTwoToken',
        'changeEmailStepTwoExpire'
      );

      try {
        const confirmChangeEmailUrl = generateEmailUrl(
          emailChangeConfirmationToken, 'change-email'
        );

        await sendEmail({
          to: user.newEmail,
          subject: EMAIL_SUBJECT_CONFIRM_EMAIL_CHANGE_2,
          html: confirmChangeEmail(confirmChangeEmailUrl),
        });

        await user.save();

        res.status(200).json({
          success: true,
          message: 'Change email confirmation request was sent successfully.',
        });
      } catch (error) {
        user.changeEmailStepTwoToken = undefined;
        user.changeEmailStepTwoExpire = undefined;
        await user.save();

        return next(new ErrorResponse('Email could not be sent', 500));
      }
    }
    
    if (user.changeEmailStepTwoToken === changeEmailToken) {
      const oldEmail = user.email;

      user.email = user.newEmail;
      user.newEmail = undefined;
      user.isEmailChangeStepOneConfirmed = undefined;
      user.changeEmailStepTwoToken = undefined;
      user.changeEmailStepTwoExpire = undefined;

      try {
        await sendEmail({
          to: oldEmail,
          subject: EMAIL_SUBJECT_CONFIRMED_EMAIL_CHANGE,
          html: confirmEmailChanged(),
        });

        await user.save();

        res.status(201).json({
          success: true,
          message: 'Your email was changed successfully.',
        });
      } catch (error) {
        return next(new ErrorResponse('Email could not be sent', 500));
      }
    }
  }
);
