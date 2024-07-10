import { useStore } from '../../store';
import { CartItem } from '../../types/types';

export const updateCart = (updatedCart: CartItem[]) => {
  useStore.setState({ cart: updatedCart });
  localStorage.setItem('cartItems', JSON.stringify(updatedCart));
};

export const loadCartFromLocalStorage = () => {
  const savedCartItems = localStorage.getItem('cartItems');
  if (savedCartItems) {
    const parsedCartItems = JSON.parse(savedCartItems);
    useStore.setState({ cart: parsedCartItems });
  }
};