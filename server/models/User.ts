import { model, Schema } from 'mongoose';
import { IUser } from '../types/User';
import { isEmail } from '../utils/validateEmail';
import { isValidPassword } from '../utils/validatePassword';

const userSchema: Schema = new Schema<IUser>(
  {
    schema_version: { type: String, required: true, default: '1.0.0' },
    name: {
      type: String,
      required: [true, 'Please fill your full name.'],
      minLength: [5, 'Your name cannot contain less than 5 characters.'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'Please fill a valid email address.'],
    },
    password: {
      type: String,
      required: true,
      validate: [
        isValidPassword,
        'Your password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.',
      ],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
      default: 'user',
    },
    phoneNumber: { type: Number },
    avatarUrl: { type: String },
    twoFactorAuthEnabled: { type: Boolean, required: true, default: false },
    twoFactorAuthCode: { type: String, length: 6 },

    isEmailConfirmed: { type: Boolean, required: true, default: false },
    emailConfirmationToken: { type: String },
    emailConfirmationExpire: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

export default model<IUser>('User', userSchema);
