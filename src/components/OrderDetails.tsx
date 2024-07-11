import React from 'react';
import { Order, OrderItem } from '../types/types';
import Image from 'next/image';
import CanvasComponent from './products/CanvasComponent';

interface OrderDetailsProps {
  order: Order;
  orderItems: OrderItem[];
  productViews: { [key: string]: string };
  uploadedImages: { [key: string]: fabric.Image[] };
  currentView: string;
  setCurrentView: (view: string) => void;
  onViewOrderItem: (item: OrderItem) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  orderItems,
  productViews,
  uploadedImages,
  currentView,
  setCurrentView,
  onViewOrderItem,
}) => (
  <div>
    <h3>Náhled objednávky</h3>
    <ul>
      {orderItems.map((item) => (
        <li key={item.id}>
          <p>ID produktu: {item.product_id}</p>
          <p>Množství: {item.quantity}</p>
          <p>Cena: {item.price}</p>
          <button onClick={() => onViewOrderItem(item)}>Zobrazit návrh</button>
        </li>
      ))}
    </ul>
    {order && (
      <div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {Object.entries(productViews).map(([key, value]) =>
            value && (
              <Image
                key={key}
                src={value}
                alt="Náhled"
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
          setUploadedImages={() => {}}
          readOnly={true}
        />
      </div>
    )}
  </div>
);

export default OrderDetails;
