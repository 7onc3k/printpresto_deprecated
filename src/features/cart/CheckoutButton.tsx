import React from 'react';

interface CheckoutButtonProps {
  onCheckout: () => Promise<void>;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onCheckout }) => {
  return (
    <button 
      onClick={onCheckout}
      className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
    >
      Dokončit nákup
    </button>
  );
};

export default CheckoutButton;