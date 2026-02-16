import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Product image is required'],
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    currentPrice: {
      type: Number,
      required: [true, 'Current price is required'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    category: {
      type: String,
      trim: true,
      index: true,
    },
    parentCategory: {
      type: String,
      trim: true,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
  },
  { timestamps: true }
);

// Index for efficient querying by tags and category
productSchema.index({ tags: 1, category: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
