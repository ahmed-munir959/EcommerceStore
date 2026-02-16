// models/CartItem.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { timestamps: true }
);

// Compound unique index to prevent duplicate cart items for same user-product combination
cartItemSchema.index({ user: 1, product: 1 }, { unique: true });

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;