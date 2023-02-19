export const isEmail = (email: string): boolean => {
  const regexExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regexExpression.test(email)
};