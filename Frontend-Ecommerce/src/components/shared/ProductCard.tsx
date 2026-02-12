import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext.tsx';
import QuickViewModal from './QuickViewModal';
import '../../styles/scss/_ProductCard.scss';

type Props = {
  className?: string;
  scrollable?: boolean;
  productImage?: string;
  productName?: string;
  currentPrice?: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  showDiscount?: boolean;
  productId?: string | number;
  productDescription?: string;
  hideHeart?: boolean;
  hideEye?: boolean;
};

const ProductCard: React.FC<Props> = ({
  className = '',
  scrollable = false,
  productImage = '',
  productName = 'HAVIT HV-G92 Gamepad',
  currentPrice = 120,
  originalPrice = 160,
  discount = 40,
  rating = 5,
  reviewCount = 88,
  showDiscount = true,
  productId = '1',
  productDescription = '',
  hideHeart = false,
  hideEye = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();

  // Check if item is in wishlist
  const isFavorite = isInWishlist(productId);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: productId,
      image: productImage,
      name: productName,
      price: currentPrice,
    });

    navigate(`/cart/${productId}`);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      // Remove from wishlist
      removeFromWishlist(productId);
    } else {
      // Add to wishlist with full product details
      addToWishlist({
        id: productId,
        image: productImage,
        name: productName,
        price: currentPrice,
        originalPrice: originalPrice,
        discount: discount,
        rating: rating,
        reviewCount: reviewCount,
        description: productDescription
      });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div
        className={`
          product-card
          ${scrollable ? 'product-card--scrollable' : 'product-card--grid'}
          rounded
          ${className}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
      >
        {/* Image Container */}
        <div className="product-card__image-container">
          <div className="product-card__image-wrapper">
            {productImage ? (
              <img
                src={productImage}
                alt={productName}
                className="product-image"
                loading="lazy"
              />
            ) : (
              <div className="product-card__placeholder">No Image</div>
            )}
          </div>

          {/* Discount badge */}
          {showDiscount && discount && discount > 0 && (
            <div className="product-card__discount-badge">-{discount}%</div>
          )}

          {/* Action icons - Conditionally render based on hideHeart and hideEye props */}
          {(!hideHeart || !hideEye) && (
            <div className="product-card__actions">
              {!hideHeart && (
                <button
                  className="action-btn"
                  onClick={handleFavoriteToggle}
                  aria-label="toggle favorite"
                >
                  <Heart
                    className={`icon-heart ${isFavorite ? 'fav' : ''}`}
                    strokeWidth={1.5}
                    fill={isFavorite ? '#DB4444' : 'none'}
                  />
                </button>
              )}

              {!hideEye && (
                <button
                  className="action-btn"
                  onClick={handleQuickView}
                  aria-label="quick view"
                >
                  <Eye className="icon-eye" strokeWidth={1.5} />
                </button>
              )}
            </div>
          )}

          {/* Add to cart shown on hover */}
          {isHovered && (
            <button
              className="product-card__add-to-cart"
              onClick={handleAddToCart}
              aria-label="add to cart"
            >
              Add To Cart
            </button>
          )}
        </div>

        {/* Details */}
        <div className="product-card__details">
          <h3 className="product-card__name" title={productName}>
            {productName}
          </h3>

          <div className="product-card__price-row">
            <span className="product-card__current-price">${currentPrice}</span>
            {originalPrice && originalPrice > currentPrice && (
              <span className="product-card__original-price">${originalPrice}</span>
            )}
          </div>

          <div className="product-card__rating-row">
            <div className="stars">
              {[...Array(5)].map((_, idx) => (
                <svg
                  key={idx}
                  className={`star ${idx < (rating || 0) ? 'star--on' : 'star--off'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="product-card__review-count">({reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={{
          id: productId,
          image: productImage,
          name: productName,
          currentPrice,
          originalPrice,
          discount,
          rating,
          reviewCount,
          description: productDescription
        }}
      />
    </>
  );
};

export default ProductCard;