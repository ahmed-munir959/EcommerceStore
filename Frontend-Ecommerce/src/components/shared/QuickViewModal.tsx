// ============================================
// components/shared/QuickViewModal.tsx
// ============================================
import React, { useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.tsx';
import '../../styles/scss/_QuickViewModal.scss';

type QuickViewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string | number;
    image: string;
    name: string;
    currentPrice: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviewCount: number;
    description?: string;
  };
};

const QuickViewModal: React.FC<QuickViewModalProps> = ({ isOpen, onClose, product }) => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();

  // Check if item is in wishlist
  const isFavorite = isInWishlist(product.id);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.currentPrice,
    });
    onClose();
    navigate(`/cart/${product.id}`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      // Remove from wishlist
      removeFromWishlist(product.id);
    } else {
      // Add to wishlist with full product details
      addToWishlist({
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.currentPrice,
        originalPrice: product.originalPrice,
        discount: product.discount,
        rating: product.rating,
        reviewCount: product.reviewCount,
        description: product.description
      });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="quick-view-modal-overlay" onClick={handleBackdropClick}>
      <div className="quick-view-modal">
        {/* Close Button */}
        <button className="quick-view-modal__close" onClick={onClose} aria-label="Close modal">
          <X className="close-icon" />
        </button>

        <div className="quick-view-modal__content">
          {/* Left Side - Image */}
          <div className="quick-view-modal__image-section">
            <div className="quick-view-modal__image-wrapper">
              <img src={product.image} alt={product.name} className="quick-view-modal__image" />
            </div>
            {/* {product.discount && product.discount > 0 && (
              <div className="quick-view-modal__discount-badge">-{product.discount}%</div>
            )} */}
          </div>

          {/* Right Side - Details */}
          <div className="quick-view-modal__details">
            {/* Product Name */}
            <h2 className="quick-view-modal__title">{product.name}</h2>

            {/* Rating */}
            <div className="quick-view-modal__rating">
              <div className="stars">
                {[...Array(5)].map((_, idx) => (
                  <svg
                    key={idx}
                    className={`star ${idx < product.rating ? 'star--on' : 'star--off'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="review-count">({product.reviewCount} Reviews)</span>
            </div>

            {/* Price */}
            <div className="quick-view-modal__price">
              <span className="current-price">${product.currentPrice}</span>
              {product.originalPrice && product.originalPrice > product.currentPrice && (
                <span className="original-price">${product.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <div className="quick-view-modal__description">
              <p>{product.description || 'No description available for this product.'}</p>
            </div>

            {/* Divider */}
            <div className="quick-view-modal__divider"></div>

            {/* Action Buttons */}
            <div className="quick-view-modal__actions">
              <button className="btn-add-to-cart" onClick={handleAddToCart}>
                Add To Cart
              </button>
              <button
                className={`btn-wishlist ${isFavorite ? 'active' : ''}`}
                onClick={handleWishlistToggle}
                aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className="heart-icon"
                  strokeWidth={1.5}
                  fill={isFavorite ? '#DB4444' : 'none'}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;