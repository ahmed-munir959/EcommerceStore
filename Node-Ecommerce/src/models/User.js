// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
      sparse: true, // allow multiple docs with missing email
      match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    },
    phone: {
      type: String,
      required: false,
      unique: true,
      sparse: true, // allow missing value
      match: [/^\+?\d{7,15}$/, 'Phone number is invalid'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'seller', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
