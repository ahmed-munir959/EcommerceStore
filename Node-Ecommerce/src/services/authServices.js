// services/authService.js
import User from '../models/User.js';
import ErrorHandler from '../utils/errorHandler.js';

/**
 * createUser: handle DB checks & creation (PUBLIC signup)
 * Only accepts name, email, phone, password.
 * Role is assigned server-side as 'user'.
 */
export const createUser = async ({ name, email, phone, password }) => {
  // require at least one contact method
  if (!email && !phone) {
    throw new ErrorHandler('Email or phone is required', 400);
  }

  // Check if user exists by email OR phone
  const existingUser = await User.findOne({
    $or: [
      email ? { email } : null,
      phone ? { phone } : null
    ].filter(Boolean),
  });

  if (existingUser) {
    if (email && existingUser.email === email) {
      throw new ErrorHandler('Email already registered', 400);
    } else if (phone && existingUser.phone === phone) {
      throw new ErrorHandler('Phone number already registered', 400);
    } else {
      throw new ErrorHandler('User already exists', 400);
    }
  }

  // Build creation payload (server sets role -> 'user')
  const createPayload = {
    name,
    password,
    role: 'user', // <-- strict assignment, never from client
  };
  if (email) createPayload.email = email;
  if (phone) createPayload.phone = phone;

  const newUser = await User.create(createPayload);

  return newUser;
};
