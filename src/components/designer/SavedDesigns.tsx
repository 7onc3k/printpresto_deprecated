import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

interface SavedDesignsProps {
  user: User | null;
  onDesignSelect: (productId: string, uploadedImages: any) => void;
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
    <div>
      <h2>Uložené návrhy</h2>
      {savedDesigns.length > 0 ? (
        <ul>
          {savedDesigns.map((design) => (
            <li key={design.id}>
              <button onClick={() => handleDesignSelect(design.product_id, design)}>
                {/* Zobrazit název produktu nebo jiné informace */}
                Návrh pro produkt {design.product_id}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Žádné uložené návrhy</p>
      )}
    </div>
  );
};

export default SavedDesigns;
