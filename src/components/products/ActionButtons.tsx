import React from 'react';
import { ActionButtonsProps } from '../../types/productDesigner';

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSaveDesign,
  onAddToCart,
  onGoToCart,
}) => {
  return (
    <div className="flex space-x-4">
      <button 
        onClick={onSaveDesign}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Uložit návrh
      </button>
      <button 
        onClick={onAddToCart}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Přidat do košíku
      </button>
      <button 
        onClick={onGoToCart}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
      >
        Přejít do košíku
      </button>
    </div>
  );
};

export default ActionButtons;