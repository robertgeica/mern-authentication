const confirmAccountEmail = (confirmUrl: string): string => {
  return `
  <h1>Welcome aboard</h1>
  <p>Access the following link to confirm your account:</p>
  <a href=${confirmUrl} clicktracking=off>${confirmUrl}</a>
`;
};

const resetPasswordEmail = (resetUrl: string): string => {
  return `
  <h1>Password reset</h1>
  <p>Access the following link to reset your password:</p>
  <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
`;
};

const confirmEmailChange = (emailChangeUrl: string): string => {
  return `
  <h1>Email change</h1>
  <p>Access the following link to confirm your email change:</p>
  <a href=${emailChangeUrl} clicktracking=off>${emailChangeUrl}</a>`;
};

export { confirmAccountEmail, resetPasswordEmail, confirmEmailChange };
