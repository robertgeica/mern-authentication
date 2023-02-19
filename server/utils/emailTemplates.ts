const confirmAccountEmail = (resetUrl: string): string => {
  return `
  <h1>Welcome aboard</h1>
  <p>Access the following link to confirm your account:</p>
  <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
`;
};

export { confirmAccountEmail };
