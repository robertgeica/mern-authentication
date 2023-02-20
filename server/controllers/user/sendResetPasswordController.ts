import { Response, Request } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import User from '../../models/User';
import sendEmail from '../../modules/emailSender';
import { IUser } from '../../types/User';
import { resetPasswordEmail } from '../../utils/emailTemplates';
import ErrorResponse from '../../utils/errorResponse';

// @route         POST /api/v1/users/reset-password
// @description   Send link to reset password via email
// @access        Public
export const sendResetPasswordController = asyncHandler(
  async (req: Request, res: Response, next: Function): Promise<void> => {
    const { email } = req.body as Pick<IUser, 'email'>;
    const user: any = await User.findOne({ email }).select('-password');

    if (!user) {
      return next(new ErrorResponse('User not found.', 404));
    }

    try {
      const resetToken = user.generateResetPasswordToken();
      await user.save();

      const resetPasswordUrl =
        process.env.NODE_ENV === 'dev'
          ? `${process.env.BASE_URL}:${process.env.PORT}/password-reset/${resetToken}`
          : `${process.env.BASE_URL}/password-reset/${resetToken}`;

      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        html: resetPasswordEmail(resetPasswordUrl),
      });

      res.status(200).json({
        success: true,
        message: 'Reset password email was sent successfully.',
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse('Email could not be sent', 500));
    }
  }
);
