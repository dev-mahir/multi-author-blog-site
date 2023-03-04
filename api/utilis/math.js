

/**
 * Create a OTP
 * @returns OTP
 */

export const generateOTP = () => {
  return Math.floor(Math.random() * (100000 - 999999)) + 999999;
};
