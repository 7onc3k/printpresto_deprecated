import { StaticImageData } from 'next/image';
import { fabric } from 'fabric';

export interface ProductView {
  [key: string]: string | StaticImageData;
}

export interface UploadedImages {
  [key: string]: fabric.Image[];
}

export interface ProductDesignerProps {
  productViews: ProductView;
  uploadedImages: UploadedImages;
  setUploadedImages: React.Dispatch<React.SetStateAction<UploadedImages>>;
  currentView: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  handleSaveDesign: () => Promise<void>;
  addToCartHandler: () => Promise<void>;
  onGoToCart: () => void;
}

export interface ProductViewSelectorProps {
  productViews: ProductView;
  currentView: string;
  setCurrentView: (view: string) => void;
}

export interface ActionButtonsProps {
  onSaveDesign: () => void;
  onAddToCart: () => void;
  onGoToCart: () => void;
}