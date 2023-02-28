export const generateEmailUrl = (token: string, action: string): string => {
  const devUrl = `${process.env.BASE_URL}:${process.env.PORT}/${action}/${token}`;
  const prodUrl = `${process.env.BASE_URL}/${action}/${token}`;

  const url = process.env.NODE_ENV === 'dev' ? devUrl : prodUrl;

  return url;
};
