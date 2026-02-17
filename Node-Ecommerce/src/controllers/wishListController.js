import asyncHandler from 'express-async-handler';
import WishList from '../models/WishList.js';
import Product from '../models/Product.js';
import ErrorHandler from '../utils/errorHandler.js';

// @desc    Toggle wishlist item (Add/Remove)
// @route   POST /api/wishlist
// @access  Private
export const toggleWishList = asyncHandler(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
        return next(new ErrorHandler('Product ID is required', 400));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    let wishListItem = await WishList.findOne({ user: userId, product: productId });

    if (wishListItem) {
        // If it exists, remove it
        await WishList.findByIdAndDelete(wishListItem._id);
        res.status(200).json({
            success: true,
            message: 'Product removed from wishlist',
            isWishlisted: false
        });
    } else {
        // If it doesn't exist, add it
        wishListItem = await WishList.create({
            user: userId,
            product: productId
        });
        res.status(201).json({
            success: true,
            message: 'Product added to wishlist',
            isWishlisted: true,
            wishListItem
        });
    }
});

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishList = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const wishlist = await WishList.find({ user: userId }).populate('product');

    res.status(200).json({
        success: true,
        count: wishlist.length,
        wishlist
    });
});
