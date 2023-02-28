import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/User';
import { isValidEmail } from '../utils/validateEmail';
import { isValidPassword } from '../utils/validatePassword';
import { HOURS_12, HOURS_24 } from '../constants';

const userSchema: Schema = new Schema<IUser>(
  {
    schema_version: { type: String, required: true, default: '1.0.0' },
    name: {
      type: String,
      required: [true, 'Full name must be provided.'],
      minLength: [5, 'Name cannot contain less than 5 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email adress must be provided.'],
      unique: true,
      validate: [isValidEmail, 'Email adress must be valid.'],
    },
    password: {
      type: String,
      required: [true, 'Password must be provided.'],
      validate: [
        isValidPassword,
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.',
      ],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
      default: 'user',
    },
    phoneNumber: { type: String },
    avatar: {
      url: { type: String },
      mimeType: { type: String },
      size: { type: Number },
    },
    twoFactorAuthEnabled: { type: Boolean, required: true, default: false },
    twoFactorAuthCode: { type: String, length: 6 },

    isEmailConfirmed: { type: Boolean, required: true, default: false },
    emailConfirmationToken: { type: String },
    emailConfirmationExpire: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },

    newEmail: {
      type: String,
      unique: true,
      validate: [isValidEmail, 'Email adress must be valid.'],
    },
    changeEmailStepOneToken: { type: String },
    changeEmailStepOneExpire: { type: Date },
    isEmailChangeStepOneConfirmed: { type: Boolean },
    changeEmailStepTwoToken: { type: String },
    changeEmailStepTwoExpire: { type: Date },
    isEmailChangeStepTwoConfirmed: { type: Boolean },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPasswords = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateEmailConfirmationToken = function () {
  const emailConfirmationToken = crypto.randomBytes(20).toString('hex');

  this.emailConfirmationToken = crypto
    .createHash('sha256')
    .update(emailConfirmationToken)
    .digest('hex');

  this.emailConfirmationExpire = Date.now() + HOURS_24;

  return emailConfirmationToken;
};

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + HOURS_12;

  return resetToken;
};

userSchema.methods.generateEmailChangeToken = function (
  tokenKey: string,
  tokenExpire: string
) {
  const token = crypto.randomBytes(20).toString('hex');

  this[tokenKey] = crypto.createHash('sha256').update(token).digest('hex');

  this[tokenExpire] = Date.now() + HOURS_12;

  return token;
};

export default model<IUser>('User', userSchema);
