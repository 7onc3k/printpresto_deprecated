import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { CartItem, Order } from '../types/types';
import { saveDesign } from '../services/designService';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Načíst položky z košíku z localStorage nebo z API
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(savedCartItems);
  }, []);

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = quantity;
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleSizeChange = (index: number, size: string) => {
    const updatedItems = [...cartItems];
    updatedItems[index].size = size;
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleCheckout = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('Chyba při získávání uživatele:', userError);
      return;
    }
    if (!user) {
      console.error('Uživatel není přihlášen');
      return;
    }

    // Uložit designy před vytvořením objednávky
    for (const item of cartItems) {
      const designData = {
        view_1: item.view_1_images || [],
        view_2: item.view_2_images || [],
        view_3: item.view_3_images || [],
        view_4: item.view_4_images || [],
      };
      await saveDesign(user, item.productId, designData);
    }

    const total_price = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({ user_id: user.id, total_price })
      .select()
      .single();

    if (orderError) {
      console.error('Chyba při vytváření objednávky:', orderError);
      return;
    }

    if (!order) {
      console.error('Objednávka nebyla vytvořena');
      return;
    }

    console.log('Objednávka byla vytvořena:', order);

    const orderItems = cartItems.map(item => ({
      order_id: (order as Order).id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
      design_id: item.designId, // Added design_id
    }));

    const { data: insertedOrderItems, error: orderItemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();

    if (orderItemsError) {
      console.error('Chyba při přidávání položek do objednávky:', orderItemsError);
    } else {
      console.log('Položky objednávky byly úspěšně přidány:', insertedOrderItems);
      setCartItems([]);
      localStorage.removeItem('cartItems');
    }
  };

  return (
    <div>
      <h2>Košík</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p>Produkt ID: {item.productId}</p>
              <label>
                Velikost:
                <select value={item.size} onChange={(e) => handleSizeChange(index, e.target.value)}>
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
            </li>
          ))}
        </ul>
      ) : (
        <p>Košík je prázdný</p>
      )}
      <button onClick={handleCheckout}>Dokončit nákup</button>
    </div>
  );
};

export default Cart;