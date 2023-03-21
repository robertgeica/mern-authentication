export const RETRY_DATABASE_CONNECTION_TIMEOUT = 10000;
export const HOURS_24 = 86400000;
export const HOURS_12 = 43200000;

export const EMAIL_SUBJECT_CONFIRM_EMAIL = 'Confirm your email';
export const EMAIL_SUBJECT_CONFIRMED_EMAIL_CHANGE = 'Email change confirmed';
export const EMAIL_SUBJECT_CONFIRM_EMAIL_CHANGE_1 =
  'Confirm your email change 1/2';
export const EMAIL_SUBJECT_CONFIRM_EMAIL_CHANGE_2 =
  'Confirm your email change 2/2';
export const EMAIL_SUBJECT_RESET_PASSWORD = 'Reset your password';

export const SELECT_GET_USER_FIELDS =
  '-password -schema_version -role -phoneNumber -twoFactorAuthEnabled -twoFactorAuthCode -isEmailConfirmed -emailConfirmationToken -emailConfirmationExpire -resetPasswordToken -resetPasswordExpire -newEmail -changeEmailStepOneToken -changeEmailStepOneExpire -isEmailChangeStepOneConfirmed -changeEmailStepTwoToken -changeEmailStepTwoExpire -isEmailChangeStepTwoConfirmed -isPhoneNumberConfirmed -phoneNumberConfirmationToken -phoneNumberConfirmationExpire';

export const SELECT_AUTH_USER_FIELDS = '-password -twoFactorAuthEnabled -twoFactorAuthCode  -emailConfirmationToken -emailConfirmationExpire -resetPasswordToken -resetPasswordExpire -changeEmailStepOneToken -changeEmailStepOneExpire -isEmailChangeStepOneConfirmed -changeEmailStepTwoToken -changeEmailStepTwoExpire -isEmailChangeStepTwoConfirmed -isPhoneNumberConfirmed -phoneNumberConfirmationToken -phoneNumberConfirmationExpire';