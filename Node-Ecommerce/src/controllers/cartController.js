import asyncHandler from 'express-async-handler';
import CartItem from '../models/Cart.js';
import Product from '../models/Product.js';
import ErrorHandler from '../utils/errorHandler.js';

// Applying the pattern to all functions:
export const getCart = asyncHandler(async (req, res, next) => {
  const cartItems = await CartItem.find({ user: req.user.id }).populate('product', 'name price image stock currentPrice');

  const totalPrice = cartItems.reduce((acc, item) => {
    if (item.product) {
      const price = item.product.currentPrice || item.product.price;
      return acc + item.quantity * price;
    }
    return acc;
  }, 0);

  res.status(200).json({
    success: true,
    cartItems,
    totalPrice: totalPrice.toFixed(2)
  });
});

export const addItemToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user.id;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Check if item already exists in cart for this user
  let cartItem = await CartItem.findOne({ user: userId, product: productId });

  if (cartItem) {
    // Update quantity
    cartItem.quantity += parseInt(quantity);
    await cartItem.save();
  } else {
    // Create new cart item
    cartItem = await CartItem.create({
      user: userId,
      product: productId,
      quantity: parseInt(quantity)
    });
  }

  res.status(201).json({
    success: true,
    cartItem
  });
});

export const updateCartItem = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;

  if (quantity === undefined || quantity <= 0) {
    return next(new ErrorHandler('Quantity must be a positive number.', 400));
  }

  const cartItem = await CartItem.findOne({ user: userId, product: productId });

  if (!cartItem) {
    return next(new ErrorHandler('Item not found in cart', 404));
  }

  cartItem.quantity = parseInt(quantity);
  await cartItem.save();

  res.status(200).json({
    success: true,
    cartItem
  });
});

export const removeItemFromCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user.id;

  const result = await CartItem.findOneAndDelete({ user: userId, product: productId });

  if (!result) {
    return next(new ErrorHandler('Item not found in cart', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Item removed from cart'
  });
});