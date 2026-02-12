import asyncHandler from 'express-async-handler';
import ErrorHandler from '../utils/errorHandler.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import { createUser } from '../services/authServices.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper validators
const isEmail = (v) => /^\S+@\S+\.\S+$/.test(v);
const isPhone = (v) => /^\+?\d{7,15}$/.test(v);


// REGISTER
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, phone, password } = req.body; // <-- DO NOT read role from req.body

  // Optionally validate presence here (server-side). createUser will also validate.
  const newUser = await createUser({ name, email, phone, password });

  // Generate tokens (generateAccessToken reads user.role from DB)
  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  // Set refresh cookie (same as before)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Return user (omit password)
  res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
    },
    accessToken,
  });
});



export const login = asyncHandler(async (req, res, next) => {
  const { contact, email, phone, password } = req.body;

  // Determine contact value (support different field names)
  const contactValue = (contact || email || phone || '').trim();

  if (!contactValue || !password) {
    return next(new ErrorHandler('Contact (email or phone) and password are required', 400));
  }

  // Choose query field based on format
  let query = null;
  if (isEmail(contactValue)) {
    query = { email: contactValue.toLowerCase() };
  } else if (isPhone(contactValue)) {
    query = { phone: contactValue };
  } else {
    return next(new ErrorHandler('Enter a valid email or phone number', 400));
  }

  // Find user and include password for comparison
  const user = await User.findOne(query).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    return next(new ErrorHandler('Invalid email/phone or password', 401));
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    accessToken,
  });
});
// export const login = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email }).select('+password');
//   if (!user || !(await user.matchPassword(password))) {
//     return next(new ErrorHandler('Invalid email or password', 401));
//   }

//   const accessToken = generateAccessToken(user);
//   const refreshToken = generateRefreshToken(user);

//   res.cookie('refreshToken', refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });

//   res.status(200).json({
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     },
//     accessToken,
//   });
// });

export const refreshToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return next(new ErrorHandler('No refresh token provided. Please log in.', 401));
  }

  try {
    // We will use a try/catch block to handle errors from jwt.verify
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // If the token is valid, `decoded` will have the payload
    const user = await User.findById(decoded.id);

    // Crucial Check: Ensure the user still exists
    if (!user) {
      return next(new ErrorHandler('User for this token no longer exists.', 401));
    }

    // Generate a new access token WITH THE FULL USER OBJECT
    const accessToken = generateAccessToken(user);

    res.status(200).json({
      success: true,
      accessToken,
    });

  } catch (err) {
    // This block will catch any JWT error (expired, malformed, etc.)
    return next(new ErrorHandler('Invalid or expired refresh token. Please log in again.', 403));
  }
});


export const logout = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};