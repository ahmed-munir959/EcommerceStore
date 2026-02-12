// ============================================
// components/WishListUI.tsx - Wishlist Page Component
// ============================================
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from './shared/ProductCard';
import { Trash2 } from 'lucide-react';
import '../styles/scss/_WishList.scss';

// Import images for "Just For You" section (random products from EcommHomeUI)
import exploreProducts1 from '../assets/icons/exploreProducts1.jpg';
import exploreProducts2 from '../assets/icons/exploreProducts2.png';
import exploreProducts3 from '../assets/icons/exploreProducts3.png';
import exploreProducts4 from '../assets/icons/exploreProducts4.png';

// Random products data for "Just For You" section
const justForYouProducts = [
  {
    id: 'jfy-1',
    image: exploreProducts1,
    name: 'Breed Dry Dog Food',
    currentPrice: 100,
    originalPrice: 0,
    discount: 0,
    rating: 3,
    reviewCount: 35,
    description: 'Premium nutrition for your canine companion. Made with real chicken, wholesome grains, and essential vitamins.'
  },
  {
    id: 'jfy-2',
    image: exploreProducts2,
    name: 'CANON EOS DSLR Camera',
    currentPrice: 360,
    originalPrice: 0,
    discount: 0,
    rating: 4,
    reviewCount: 95,
    description: 'Capture stunning photos with this professional DSLR camera. 24.1MP sensor, Full HD video recording.'
  },
  {
    id: 'jfy-3',
    image: exploreProducts3,
    name: 'ASUS FHD Gaming Laptop',
    currentPrice: 700,
    originalPrice: 0,
    discount: 0,
    rating: 5,
    reviewCount: 325,
    description: 'Powerful gaming laptop featuring Intel Core i7 processor, NVIDIA RTX graphics, 16GB RAM.'
  },
  {
    id: 'jfy-4',
    image: exploreProducts4,
    name: 'Curology Product Set',
    currentPrice: 500,
    originalPrice: 0,
    discount: 0,
    rating: 4,
    reviewCount: 145,
    description: 'Complete skincare solution with personalized formulations. Dermatologist-designed.'
  }
];

const WishListUI: React.FC = () => {
  const { wishlistItems, removeFromWishlist } = useCart();

  const handleRemoveFromWishlist = (id: string | number) => {
    removeFromWishlist(id);
  };

  const handleMoveAllToBag = () => {
    // Functionality to be added later
    console.log('Move all to bag - functionality coming soon');
  };

  const handleSeeAll = () => {
    // Functionality to be added later
    console.log('See all - functionality coming soon');
  };

  return (
    <main className="wishlist-main py-8 sm:py-12 lg:py-20">
      {/* Wishlist Section */}
      <div className="wishlist-section">
        {/* Header with count and Move All button */}
        <div className="flex items-center justify-between mb-[60px]">
          <h2 className="font-poppins font-normal text-[20px] leading-[26px] text-app-black">
            Wishlist ({wishlistItems.length})
          </h2>
          <button
            onClick={handleMoveAllToBag}
            className="px-[48px] py-[16px] border border-[rgba(0,0,0,0.5)] rounded font-poppins font-medium text-[16px] leading-[24px] text-app-black hover:bg-gray-50 transition-colors"
          >
            Move All To Bag
          </button>
        </div>

        {/* Wishlist Products Grid - Now Responsive */}
        {wishlistItems.length > 0 ? (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-product-card relative">
                {/* Delete Icon */}
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-[12px] right-[12px] z-10 w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-[20px] h-[20px] text-app-black" />
                </button>

                {/* Product Card - Hide both Heart and Eye icons */}
                <ProductCard
                  productId={item.id}
                  productImage={item.image}
                  productName={item.name}
                  currentPrice={item.price}
                  originalPrice={item.originalPrice}
                  discount={item.discount}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                  showDiscount={item.discount ? item.discount > 0 : false}
                  productDescription={item.description}
                  hideHeart={true}
                  hideEye={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-wishlist-message">
            <p className="font-poppins text-[18px] text-gray-500 text-center py-[60px]">
              Your wishlist is empty. Start adding items you love!
            </p>
          </div>
        )}
      </div>

      {/* Just For You Section */}
      <div className="just-for-you-section">
        {/* Header with See All button */}
        <div className="flex items-center justify-between mb-[60px]">
          <div className="flex items-center gap-[16px]">
            <div className="w-[20px] h-[40px] bg-auth-primary rounded"></div>
            <h2 className="font-poppins font-normal text-[20px] leading-[26px] text-app-black">
              Just For You
            </h2>
          </div>
          <button
            onClick={handleSeeAll}
            className="px-[48px] py-[16px] border border-[rgba(0,0,0,0.5)] rounded font-poppins font-medium text-[16px] leading-[24px] text-app-black hover:bg-gray-50 transition-colors"
          >
            See All
          </button>
        </div>

        {/* Just For You Products Grid - Now Responsive */}
        <div className="just-for-you-grid">
          {justForYouProducts.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              productImage={product.image}
              productName={product.name}
              currentPrice={product.currentPrice}
              originalPrice={product.originalPrice}
              discount={product.discount}
              rating={product.rating}
              reviewCount={product.reviewCount}
              showDiscount={false}
              productDescription={product.description}
              hideHeart={true}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default WishListUI;