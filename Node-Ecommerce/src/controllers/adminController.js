import Product from '../models/Product.js';
import ErrorHandler from '../utils/errorHandler.js';

/**
 * @desc    Add a new product
 * @route   POST /api/admin/product/new
 * @access  Private/Admin
 */
export const addProduct = async (req, res, next) => {
    try {
        const {
            image,
            name,
            currentPrice,
            originalPrice,
            discount,
            rating,
            reviewCount,
            description,
            category,
            parentCategory,
            tags
        } = req.body;

        // Basic validation (Mongoose will also validate)
        if (!image || !name || !currentPrice || !description) {
            return next(new ErrorHandler('Please provide all required fields', 400));
        }

        const product = await Product.create({
            image,
            name,
            currentPrice,
            originalPrice,
            discount,
            rating,
            reviewCount,
            description,
            category,
            parentCategory,
            tags
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        next(error);
    }
};
