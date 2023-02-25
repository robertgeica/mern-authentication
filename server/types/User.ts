import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  schema_version: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  phoneNumber?: string;
  avatarUrl?: string;
  twoFactorAuthEnabled: boolean;
  twoFactorAuthCode?: number;
  
  isEmailConfirmed: boolean;
  emailConfirmationToken?: string;
  emailConfirmationExpire?: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;

  newEmail?: string;
  changeEmailStepOneToken?: string;
  changeEmailStepOneExpire?: Date;
  isEmailChangeStepOneConfirmed: boolean;
  changeEmailStepTwoToken?: string;
  changeEmailStepTwoExpire?: Date;
  isEmailChangeStepTwoConfirmed: boolean;
}
