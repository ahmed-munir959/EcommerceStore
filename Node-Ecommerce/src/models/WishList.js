import mongoose from 'mongoose';

const wishListSchema = new mongoose.Schema(
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
    },
    { timestamps: true }
);

// Compound unique index to prevent duplicate wishlist entries
wishListSchema.index({ user: 1, product: 1 }, { unique: true });

const WishList = mongoose.model('WishList', wishListSchema);

export default WishList;
