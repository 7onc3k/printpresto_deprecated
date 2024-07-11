import { useEffect } from 'react';
import { useStore } from '../store';
import { loadCartFromLocalStorage, handleQuantityChange, handleSizeChange, handleCheckout } from '../features/cart/cartService';

export const useCart = () => {
  const { cart, removeFromCart } = useStore();

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  return {
    cart,
    removeFromCart,
    handleQuantityChange,
    handleSizeChange,
    handleCheckout
  };
};
