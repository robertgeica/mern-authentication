export const changeEmailUrl = (token: string): string => {
  return process.env.NODE_ENV === 'dev'
    ? `${process.env.BASE_URL}:${process.env.PORT}/change-email/${token}`
    : `${process.env.BASE_URL}/change-email/${token}`;
};
