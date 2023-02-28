import { Response, Request } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import User from '../../models/User';
import { IUser } from '../../types/User';
import ErrorResponse from '../../utils/errorResponse';

// @route         POST /api/v1/users/login
// @description   Login user
// @access        Public
export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: Function): Promise<void> => {
    const { email, password } = req.body as Pick<IUser, 'email' | 'password'>;

    const user: any = await User.findOne({ email });
    const isPasswordMatch = await user?.matchPasswords(password);

    // do not allow user login if email is not confirmed
    if (user && !user.isEmailConfirmed && isPasswordMatch) {
      return next(new ErrorResponse('Please confirm your email first.', 401));
    }

    if (user && isPasswordMatch) {
      res.status(200).json({
        success: true,
        message: 'User logged in successfully.',
        authToken: user.getSignedJwtToken(),
      });

      return;
    }

    return next(new ErrorResponse('Invalid email or password.', 401));
  }
);
