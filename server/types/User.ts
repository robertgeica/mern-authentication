import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  // Required properties
  _id: Types.ObjectId;
  schema_version: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';

  // Optional properties
  phoneNumber?: string;

  // Avatar properties
  avatar?: {
    url: string;
    mimeType: string;
    size: number;
  };

  // Two-factor authentication properties
  twoFactorAuthEnabled: boolean;
  twoFactorAuthCode?: number;

  // Email confirmation properties
  isEmailConfirmed: boolean;
  emailConfirmationToken?: string;
  emailConfirmationExpire?: Date;

  // Password reset properties
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;

  // Change email properties
  newEmail?: string;
  changeEmailStepOneToken?: string;
  changeEmailStepOneExpire?: Date;
  isEmailChangeStepOneConfirmed: boolean;
  changeEmailStepTwoToken?: string;
  changeEmailStepTwoExpire?: Date;
  isEmailChangeStepTwoConfirmed: boolean;

  // Phone number confirmation
  isPhoneNumberConfirmed: boolean;
  phoneNumberConfirmationToken?: string;
  phoneNumberConfirmationExpire?: Date;
}
