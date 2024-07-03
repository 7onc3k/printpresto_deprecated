// src/components/products/SavedDesigns.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

interface SavedDesignsProps {
  user: User | null;
}

const SavedDesigns: React.FC<SavedDesignsProps> = ({ user }) => {
  const [savedDesigns, setSavedDesigns] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSavedDesigns = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('designs')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Chyba při načítání uložených návrhů:', error);
      } else {
        setSavedDesigns(data || []);
      }
    };

    fetchSavedDesigns();
  }, [user]);

  const handleDesignSelect = (productId: string, design: any) => {
    const designData = {
      view_1_images: design.view_1_images,
      view_2_images: design.view_2_images,
      view_3_images: design.view_3_images,
      view_4_images: design.view_4_images,
    };

    const encodedDesignData = encodeURIComponent(JSON.stringify(designData));
    router.push(`/designer/${productId}?designData=${encodedDesignData}`);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Uložené návrhy</h2>
      {savedDesigns.length > 0 ? (
        <ul className="space-y-2">
          {savedDesigns.map((design) => (
            <li key={design.id}>
              <button 
                onClick={() => handleDesignSelect(design.product_id, design)}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Návrh pro produkt {design.product_id}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Žádné uložené návrhy</p>
      )}
    </div>
  );
};

export default SavedDesigns;