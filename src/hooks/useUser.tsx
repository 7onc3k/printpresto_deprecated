import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { User } from '@supabase/supabase-js';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Chyba při načítání uživatele:', error);
      } else {
        setUser(data.user || null);
      }
    };

    getUser();
  }, []);

  return user;
};

export default useUser;