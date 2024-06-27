import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Order, OrderItem } from '../../types/types';
import CanvasComponent from '../../components/CanvasComponent';
import useProductViews from '../../hooks/useProductViews';
import { loadDesign } from '../../services/designService';
import { fabric } from 'fabric';

const EmployeeDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: { [view: string]: fabric.Image[] } }>({});
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState('view_1'); // Přidáno pro přepínání pohledů
  const productViews = useProductViews(selectedProductId || undefined);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*');

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data || []);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = async (order: Order) => {
    setSelectedOrder(order);
    const { data: items, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id);

    if (error) {
      console.error('Error fetching order items:', error);
    } else {
      setOrderItems(items || []);
    }
  };

  const handleViewOrderItem = async (item: OrderItem) => {
    setSelectedProductId(item.product_id);
    if (item.design_id) {
      console.log('Fetching design with design_id:', item.design_id);
      try {
        console.log('Before fetching design:', item.design_id); // Added logging
        const { data: design, error: designError } = await supabase
          .from('designs')
          .select('*')
          .eq('id', item.design_id) // Use design_id instead of product_id
          .single();
        console.log('After fetching design:', design); // Added logging

        if (designError) {
          throw designError;
        }

        if (!design) {
          console.error('No design found for design_id:', item.design_id);
          return;
        }

        console.log('Design fetched successfully:', design);

        const loadedImages = await loadDesign(item.product_id, design);
        if (loadedImages) {
          setUploadedImages((prev) => ({
            ...prev,
            [item.id]: loadedImages,
          }));
        }
      } catch (error) {
        console.error('Error fetching design:', error);
      }
    } else {
      console.error('No design_id found for item:', item);
    }
  };

  return (
    <div>
      <h2>Objednávky zákazníků</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>ID objednávky: {order.id}</p>
              <p>Celková cena: {order.total_price}</p>
              <button onClick={() => handleViewOrder(order)}>Zobrazit objednávku</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Žádné objednávky nenalezeny</p>
      )}
      {selectedOrder && (
        <div>
          <h3>Náhled objednávky</h3>
          <ul>
            {orderItems.map((item) => (
              <li key={item.id}>
                <p>ID produktu: {item.product_id}</p>
                <p>Množství: {item.quantity}</p>
                <p>Cena: {item.price}</p>
                <button onClick={() => handleViewOrderItem(item)}>Zobrazit návrh</button>
              </li>
            ))}
          </ul>
          {selectedProductId && selectedOrder && (
            <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {Object.entries(productViews).map(([key, value]) =>
                  value && (
                    <img
                      key={key}
                      src={value}
                      alt={`Náhled ${key}`}
                      style={{ width: '100px', cursor: 'pointer' }}
                      onClick={() => setCurrentView(key)}
                    />
                  )
                )}
              </div>
              <CanvasComponent
                uploadedImages={uploadedImages[selectedOrder.id] || {}}
                currentView={currentView}
                productViews={productViews}
                setUploadedImages={() => {}}
                readOnly={true}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
