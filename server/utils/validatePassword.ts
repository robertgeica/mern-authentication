export const isValidPassword = (password: string): boolean => {
  // Minimum 8 characters, one uppercase letter, one lowercase letter, one number, one special character
  const regexExpression =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regexExpression.test(password);
};
