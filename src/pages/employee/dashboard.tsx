import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Order, OrderItem, Design } from '../../types/types';
import CanvasComponent from '../../components/CanvasComponent';
import useProductViews from '../../hooks/useProductViews';
import { loadDesign } from '../../services/designService';

const EmployeeDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: fabric.Image[] }>({});

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
    if (item.design_id) {
      const { data: design, error: designError } = await supabase
        .from('designs')
        .select('*')
        .eq('id', item.design_id)
        .single();

      if (designError) {
        console.error('Error fetching design:', designError);
        return;
      }

      if (!design) {
        console.error('No design found for design_id:', item.design_id);
        return;
      }

      const loadedImages = await loadDesign(item.order_id, [design]);
      if (loadedImages && Array.isArray(loadedImages)) {
        setUploadedImages((prev) => ({
          ...prev,
          [item.id]: loadedImages as fabric.Image[],
        }));
      } else {
        console.error('Loaded images are not in the expected format');
      }
    }
  };

  return (
    <div>
      <h2>Customer Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Total Price: {order.total_price}</p>
              <button onClick={() => handleViewOrder(order)}>View Order</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found</p>
      )}
      {selectedOrder && (
        <div>
          <h3>Order Preview</h3>
          <ul>
            {orderItems.map((item) => (
              <li key={item.id}>
                <p>Product ID: {item.product_id}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
                <button onClick={() => handleViewOrderItem(item)}>View Design</button>
              </li>
            ))}
          </ul>
          <CanvasComponent
            uploadedImages={uploadedImages}
            currentView={'view_1'}
            productViews={{}}
            setUploadedImages={() => {}}
            readOnly={true}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
