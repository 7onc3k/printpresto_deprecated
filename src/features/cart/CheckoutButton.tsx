import React from 'react';
import { handleCheckout } from './cartService';

const CheckoutButton: React.FC = () => {
  return (
    <button 
      onClick={handleCheckout}
      className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
    >
      Dokončit nákup
    </button>
  );
};

export default CheckoutButton;