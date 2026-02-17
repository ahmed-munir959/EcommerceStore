// ============================================
// components/CartUI.tsx - Complete Cart Implementation
// ============================================
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import '../styles/scss/_CartUI.scss';

const CartUI: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, loading } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = async (id: string | number, increment: boolean) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      await updateQuantity(id, increment ? item.quantity + 1 : item.quantity - 1);
    }
  };

  const handleRemoveItem = async (id: string | number) => {
    await removeFromCart(id);
  };

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  if (loading && cartItems.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-auth-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="cart-container w-full py-8 sm:py-12 lg:py-20">
      {/* Breadcrumb */}
      <div className="breadcrumb mb-6 sm:mb-8 lg:mb-20">
        <span className="font-poppins text-sm text-gray-500">
          <span
            className="cursor-pointer hover:text-black"
            onClick={() => navigate('/home')}
          >
            Home
          </span>
          <span className="mx-2">/</span>
          <span className="text-black">Cart</span>
        </span>
      </div>

      {/* Cart Table Header */}
      <div className="cart-header hidden sm:grid grid-cols-4 gap-4 mb-6 sm:mb-8 lg:mb-10 px-4 sm:px-6 lg:px-10 py-4 sm:py-5 lg:py-6 shadow-sm">
        <div className="font-poppins text-sm sm:text-base font-normal">Product</div>
        <div className="font-poppins text-sm sm:text-base font-normal text-center">Price</div>
        <div className="font-poppins text-sm sm:text-base font-normal text-center">Quantity</div>
        <div className="font-poppins text-sm sm:text-base font-normal text-right">Subtotal</div>
      </div>

      {/* Cart Items */}
      <div className="cart-items space-y-4 sm:space-y-6 lg:space-y-8 mb-6 sm:mb-8 lg:mb-10">
        {cartItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <p className="font-poppins text-base sm:text-lg text-gray-500 mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate('/home')}
              className="btn-auth-primary px-8 sm:px-10 lg:px-12 py-3 sm:py-3.5 lg:py-4 text-white font-poppins font-medium text-sm sm:text-base"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="cart-item grid grid-cols-1 sm:grid-cols-4 gap-4 items-center px-4 sm:px-6 lg:px-10 py-4 sm:py-5 lg:py-6 shadow-sm relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="remove-item-btn absolute bg-auth-primary rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
              >
                <X className="remove-icon text-white" strokeWidth={2.5} />
              </button>

              {/* Product */}
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 ml-8 sm:ml-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[54px] lg:h-[54px] bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
                <span className="font-poppins text-sm sm:text-base font-normal">{item.name}</span>
              </div>

              {/* Price */}
              <div className="text-left sm:text-center">
                <span className="sm:hidden font-poppins text-sm text-gray-500 mr-2">Price:</span>
                <span className="font-poppins text-sm sm:text-base font-normal">${item.price}</span>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-start sm:justify-center">
                <span className="sm:hidden font-poppins text-sm text-gray-500 mr-2">Quantity:</span>
                <div className="quantity-control border border-gray-300 rounded">
                  <input
                    type="text"
                    value={String(item.quantity).padStart(2, '0')}
                    readOnly
                    className="quantity-input font-poppins outline-none"
                  />
                  <div className="quantity-buttons border-l border-gray-300">
                    <button
                      onClick={() => handleQuantityChange(item.id, true)}
                      className="quantity-btn-up hover:bg-gray-100 transition-colors"
                    >
                      <ChevronUp className="chevron-icon" />
                    </button>
                    <button
                      onClick={() => handleQuantityChange(item.id, false)}
                      className="quantity-btn-down hover:bg-gray-100 transition-colors border-t border-gray-300"
                    >
                      <ChevronDown className="chevron-icon" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <div className="text-left sm:text-right">
                <span className="sm:hidden font-poppins text-sm text-gray-500 mr-2">Subtotal:</span>
                <span className="font-poppins text-sm sm:text-base font-normal">${item.price * item.quantity}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action Buttons */}
      {cartItems.length > 0 && (
        <div className="action-buttons flex flex-col sm:flex-row justify-between gap-4 mb-8 sm:mb-12 lg:mb-20">
          <button
            onClick={() => navigate('/home')}
            className="btn-outline px-6 sm:px-8 lg:px-12 py-3 sm:py-3.5 lg:py-4 border border-gray-400 font-poppins font-medium text-sm sm:text-base hover:bg-gray-50 transition-colors"
          >
            Return To Shop
          </button>
          <button className="btn-outline px-6 sm:px-8 lg:px-12 py-3 sm:py-3.5 lg:py-4 border border-gray-400 font-poppins font-medium text-sm sm:text-base hover:bg-gray-50 transition-colors">
            Update Cart
          </button>
        </div>
      )}

      {/* Coupon and Cart Total Section */}
      {cartItems.length > 0 && (
        <div className="bottom-section flex flex-col lg:flex-row gap-6 lg:gap-[173px] lg:items-start lg:justify-between">
          {/* Coupon Section */}
          <div className="coupon-section">
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="coupon-input border border-gray-400 rounded font-poppins text-sm sm:text-base outline-none focus:border-gray-600"
            />
            <button className="coupon-button btn-auth-primary text-white font-poppins font-medium text-sm sm:text-base whitespace-nowrap">
              Apply Coupon
            </button>
          </div>

          {/* Cart Total */}
          <div className="cart-total-section w-full lg:w-[470px] lg:ml-auto border-2 border-black rounded px-6 py-6 sm:px-8 sm:py-8">
            <h3 className="font-poppins text-lg sm:text-xl font-medium mb-6">Cart Total</h3>

            <div className="space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                <span className="font-poppins text-sm sm:text-base font-normal">Subtotal:</span>
                <span className="font-poppins text-sm sm:text-base font-normal">${subtotal}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                <span className="font-poppins text-sm sm:text-base font-normal">Shipping:</span>
                <span className="font-poppins text-sm sm:text-base font-normal">
                  {shipping === 0 ? 'Free' : `$${shipping}`}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-2">
                <span className="font-poppins text-sm sm:text-base font-normal">Total:</span>
                <span className="font-poppins text-sm sm:text-base font-normal">${total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  // Add checkout logic here
                  alert('Proceeding to checkout...');
                }}
                className="btn-auth-primary px-10 sm:px-12 py-3 sm:py-4 text-white font-poppins font-medium text-sm sm:text-base"
              >
                Procees to checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartUI;