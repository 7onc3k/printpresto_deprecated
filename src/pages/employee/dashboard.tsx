import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Design } from '../../types/types';
import CanvasComponent from '../../components/CanvasComponent';
import useProductViews from '../../hooks/useProductViews';
import { loadDesign } from '../../services/designService';

const EmployeeDashboard = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [currentView, setCurrentView] = useState('view_1');
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: fabric.Image[] }>({ view_1: [], view_2: [], view_3: [], view_4: [] });
  const productViews = useProductViews(selectedDesign?.product_id);

  useEffect(() => {
    const fetchDesigns = async () => {
      const { data, error } = await supabase
        .from('designs')
        .select('*');

      if (error) {
        console.error('Error fetching designs:', error);
      } else {
        setDesigns(data || []);
      }
    };

    fetchDesigns();
  }, []);

  const handleViewDesign = async (design: Design) => {
    setSelectedDesign(design);
    const designData = {
      view_1_images: design.view_1_images,
      view_2_images: design.view_2_images,
      view_3_images: design.view_3_images,
      view_4_images: design.view_4_images,
    };
    const loadedImages = await loadDesign(design.product_id, designData);
    if (loadedImages) {
      setUploadedImages(loadedImages);
    }
  };

  const downloadImages = (design: Design) => {
    const views = ['view_1', 'view_2', 'view_3', 'view_4'];
    views.forEach((view) => {
      const images = design[`${view}_images`];
      images.forEach((image: any, index: number) => {
        const link = document.createElement('a');
        link.href = image.src; // Ujistěte se, že image.src obsahuje správnou URL
        link.download = `design_${design.id}_${view}_${index}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });
  };

  return (
    <div>
      <h2>Customer Designs</h2>
      {designs.length > 0 ? (
        <ul>
          {designs.map((design) => (
            <li key={design.id}>
              <p>Design ID: {design.id}</p>
              <p>Product ID: {design.product_id}</p>
              <button onClick={() => handleViewDesign(design)}>View Design</button>
              <button onClick={() => downloadImages(design)}>Download Images</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No designs found</p>
      )}
      {selectedDesign && (
        <div>
          <h3>Design Preview</h3>
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
};

export default EmployeeDashboard;
