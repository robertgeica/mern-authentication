import { Response, Request } from 'express';
import asyncHandler from '../../../middleware/asyncHandler';
import User from '../../../models/User';
import { IUser } from '../../../types/User';
import sendEmail from '../../../modules/emailSender';
import { confirmAccountEmail } from '../../../utils/emailTemplates';
import ErrorResponse from '../../../utils/errorResponse';
import { generateEmailUrl } from '../../../utils/generateEmailUrl';
import { EMAIL_SUBJECT_CONFIRM_EMAIL } from '../../../constants';

// @route         POST /api/v1/user
// @description   Register user
// @access        Public
export const createUser = asyncHandler(
  async (req: Request, res: Response, next: Function): Promise<void> => {
    const { name, email, password } = req.body as Pick<
      IUser,
      'name' | 'email' | 'password'
    >;

    const isEmailExistent = await User.findOne({ email });

    if (isEmailExistent) {
      return next(new ErrorResponse('Email is already used.', 400));
    }

    const newUser: IUser = await User.create({
      name,
      email,
      password,
    });

    const user: any = await User.findOne({ email }).select('-password');

    const emailConfirmationToken = user.generateEmailConfirmationToken();
    await user.save();

    const emailConfirmationUrl = generateEmailUrl(
      emailConfirmationToken,
      'confirm-email'
    );
    
    const isEmailSent = await sendEmail({
      to: newUser.email,
      subject: EMAIL_SUBJECT_CONFIRM_EMAIL,
      html: confirmAccountEmail(emailConfirmationUrl),
    });

    if (newUser) {
      res.status(201).json({
        success: true,
        message: 'User created successfully. Please confirm your email!',
        user: user,
        isEmailSent: isEmailSent,
      });

      return;
    }

    return next(new ErrorResponse('Invalid data.', 400));
  }
);
