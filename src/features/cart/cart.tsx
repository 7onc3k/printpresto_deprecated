import React, { useEffect, useCallback } from 'react';
import { useStore } from '../../store';
import { supabase } from '../../utils/supabaseClient';
import { CartItem, Order } from '../../types/types';

const Cart: React.FC = () => {
  const { cart, user, removeFromCart, clearCart } = useStore();

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      useStore.setState({ cart: parsedCartItems });
    }
  }, []);

  const handleQuantityChange = useCallback((index: number, quantity: number) => {
    useStore.setState((state) => {
      const updatedCart = [...state.cart];
      updatedCart[index].quantity = quantity;
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  }, []);

  const handleSizeChange = useCallback((index: number, size: 'S' | 'M' | 'L' | 'XL') => {
    useStore.setState((state) => {
      const updatedCart = [...state.cart];
      updatedCart[index].size = size;
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  }, []);

  const handleCheckout = useCallback(async () => {
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
  }, [cart, user, clearCart]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Košík</h2>
      {cart.length > 0 ? (
        <>
          <ul className="space-y-4">
            {cart.map((item: CartItem, index: number) => (
              <li key={index} className="border p-4 rounded">
                <p>Produkt ID: {item.productId}</p>
                <p>Design ID: {item.designId}</p>
                <label className="block mb-2">
                  Velikost:
                  <select 
                    value={item.size} 
                    onChange={(e) => handleSizeChange(index, e.target.value as 'S' | 'M' | 'L' | 'XL')}
                    className="ml-2 border rounded"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </label>
                <label className="block mb-2">
                  Počet:
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                    min="1"
                    className="ml-2 border rounded w-16 text-center"
                  />
                </label>
                <p>Cena: {item.price} Kč</p>
                <button 
                  onClick={() => removeFromCart(item.productId)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Odstranit
                </button>
              </li>
            ))}
          </ul>
          <button 
            onClick={handleCheckout}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Dokončit nákup
          </button>
        </>
      ) : (
        <p>Košík je prázdný</p>
      )}
    </div>
  );
};

export default Cart;