// ============================================
// context/CartContext.tsx - Cart & Wishlist State Management
// ============================================
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string | number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export interface WishlistItem {
  id: string | number;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  description?: string;
}

interface CartContextType {
  // Cart functions
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (id: string | number) => Promise<void>;
  updateQuantity: (id: string | number, quantity: number) => Promise<void>;
  clearCart: () => void;
  getCartTotal: () => number;
  loading: boolean;

  // Wishlist functions
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string | number) => void;
  isInWishlist: (id: string | number) => boolean;
  clearWishlist: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize wishlist from localStorage
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.get('/cart');
      if (response.data.success) {
        // Map backend CartItem to frontend CartItem
        const items = response.data.cartItems.map((item: any) => ({
          id: item.product._id,
          name: item.product.name,
          price: item.product.currentPrice || item.product.price,
          image: item.product.image,
          quantity: item.quantity
        }));
        setCartItems(items);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch wishlist from backend
  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlistItems([]);
      return;
    }
    try {
      const response = await axiosInstance.get('/wishlist');
      if (response.data.success) {
        // Map backend wishlist items to frontend format
        const items = response.data.wishlist.map((item: any) => ({
          id: item.product._id,
          name: item.product.name,
          price: item.product.currentPrice || item.product.price,
          image: item.product.image,
          originalPrice: item.product.originalPrice,
          discount: item.product.discount,
          rating: item.product.rating,
          reviewCount: item.product.reviewCount,
          description: item.product.description
        }));
        setWishlistItems(items);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, [fetchCart, fetchWishlist]);

  // Cart functions
  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    try {
      const response = await axiosInstance.post('/cart', {
        productId: item.id,
        quantity: 1
      });
      if (response.data.success) {
        await fetchCart(); // Re-fetch to ensure sync
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (id: string | number) => {
    try {
      const response = await axiosInstance.delete(`/cart/item/${id}`);
      if (response.data.success) {
        setCartItems(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }
    try {
      const response = await axiosInstance.put(`/cart/item/${id}`, { quantity });
      if (response.data.success) {
        setCartItems(prev =>
          prev.map(item => (item.id === id ? { ...item, quantity } : item))
        );
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Wishlist functions
  const addToWishlist = async (item: WishlistItem) => {
    try {
      const response = await axiosInstance.post('/wishlist', {
        productId: item.id
      });
      if (response.data.success) {
        setWishlistItems(prev => {
          const existingItem = prev.find(i => i.id === item.id);
          if (existingItem) {
            return prev;
          }
          return [...prev, item];
        });
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (id: string | number) => {
    try {
      const response = await axiosInstance.post('/wishlist', {
        productId: id
      });
      if (response.data.success) {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const isInWishlist = (id: string | number): boolean => {
    return wishlistItems.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        loading,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

