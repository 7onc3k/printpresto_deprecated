import React, { useEffect } from 'react';
import { useStore } from '../store';
import { supabase } from '../utils/supabaseClient';
import { CartItem, Order } from '../types/types';

const Cart: React.FC = () => {
  const { cart, user, removeFromCart } = useStore();

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      useStore.setState({ cart: parsedCartItems });
    }
  }, []);

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    useStore.setState({ cart: updatedCart });
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleSizeChange = (index: number, size: string) => {
    const updatedCart = [...cart];
    updatedCart[index].size = size;
    useStore.setState({ cart: updatedCart });
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    const { data: { user } } = await supabase.auth.getUser();
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
      
      // Vyčištění košíku po úspěšné objednávce
      useStore.setState({ cart: [] });
      localStorage.removeItem('cartItems');
    } catch (error) {
      console.error('Chyba při vytváření objednávky:', error);
    }
  };

  return (
    <div>
      <h2>Košík</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item: CartItem, index: number) => (
              <li key={index}>
                <p>Produkt ID: {item.productId}</p>
                <p>Design ID: {item.designId}</p>
                <label>
                  Velikost:
                  <select 
                    value={item.size} 
                    onChange={(e) => handleSizeChange(index, e.target.value)}
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </label>
                <label>
                  Počet:
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                    min="1"
                  />
                </label>
                <p>Cena: {item.price}</p>
                <button onClick={() => removeFromCart(item.productId)}>Odstranit</button>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Dokončit nákup</button>
        </>
      ) : (
        <p>Košík je prázdný</p>
      )}
    </div>
  );
};

export default Cart;