import { useStore } from '../../store';
import { supabase } from '../../utils/supabaseClient';
import { Order } from '../../types/types';
import { updateCart } from './cartStore';

export const handleQuantityChange = (index: number, quantity: number) => {
  useStore.setState((state) => {
    const updatedCart = [...state.cart];
    updatedCart[index].quantity = quantity;
    updateCart(updatedCart);
    return { cart: updatedCart };
  });
};

export const handleSizeChange = (index: number, size: 'S' | 'M' | 'L' | 'XL') => {
  useStore.setState((state) => {
    const updatedCart = [...state.cart];
    updatedCart[index].size = size;
    updateCart(updatedCart);
    return { cart: updatedCart };
  });
};

export const handleCheckout = async () => {
  const { cart, user, clearCart } = useStore.getState();

  if (!user) {
    console.error('Uživatel není přihlášen');
    return;
  }

  const total_price = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  try {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({ user_id: user.id, total_price })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = cart.map(item => ({
      order_id: (order as Order).id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
      design_id: item.designId,
    }));

    const { error: orderItemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (orderItemsError) throw orderItemsError;

    console.log('Objednávka byla úspěšně vytvořena');
    
    clearCart();
    localStorage.removeItem('cartItems');
  } catch (error) {
    console.error('Chyba při vytváření objednávky:', error);
  }
};

export const loadCartFromLocalStorage = () => {
  const savedCartItems = localStorage.getItem('cartItems');
  if (savedCartItems) {
    const parsedCartItems = JSON.parse(savedCartItems);
    useStore.setState({ cart: parsedCartItems });
  }
};