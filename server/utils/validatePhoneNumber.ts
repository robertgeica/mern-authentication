export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  return phoneRegex.test(digitsOnly);
};
