import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabaseClient';
import { Order, OrderItem } from '../../types/types';
import CanvasComponent from '../../components/products/CanvasComponent';
import useProductViews from '../../hooks/useProductViews';
import { loadDesign } from '../../services/designService';
import { fabric } from 'fabric';
import AuthGuard from '../../components/auth/AuthGuard';
import { useStore } from '../../store';

const EmployeeDashboard: React.FC = () => {
  const router = useRouter();
  const { user } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: fabric.Image[] }>({ view_1: [], view_2: [], view_3: [], view_4: [] });
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState('view_1');
  const productViews = useProductViews(selectedProductId || undefined);

  useEffect(() => {
    if (user && !user.user_metadata?.is_employee) {
      router.push('/');
    } else {
      fetchOrders();
    }
  }, [user, router]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Chyba při načítání objednávek:', error);
    }
  };

  const handleViewOrder = async (order: Order) => {
    setSelectedOrder(order);
    try {
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', order.id);

      if (error) throw error;
      setOrderItems(data || []);
    } catch (error) {
      console.error('Chyba při načítání položek objednávky:', error);
    }
  };

  const handleViewOrderItem = async (item: OrderItem) => {
    setSelectedProductId(item.product_id);
    if (item.design_id) {
      try {
        const { data: design, error } = await supabase
          .from('designs')
          .select('*')
          .eq('id', item.design_id)
          .single();

        if (error) throw error;

        if (design) {
          const loadedImages = await loadDesign(item.product_id, design);
          if (loadedImages) {
            setUploadedImages(loadedImages);
          }
        }
      } catch (error) {
        console.error('Chyba při načítání designu:', error);
      }
    }
  };

  return (
    <AuthGuard>
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
            {selectedProductId && (
              <div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  {Object.entries(productViews).map(([key, value]) =>
                    value && (
                      <Image key={key}
                        src={value}
                        alt={`Náhled ${key}`}
                        width={100}
                        height={100}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setCurrentView(key)}
                      />
                    )
                  )}
                </div>
                <CanvasComponent
                  uploadedImages={uploadedImages}
                  currentView={currentView}
                  productViews={productViews}
                  setUploadedImages={setUploadedImages}
                  readOnly={true}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </AuthGuard>
  );
};

export default EmployeeDashboard;