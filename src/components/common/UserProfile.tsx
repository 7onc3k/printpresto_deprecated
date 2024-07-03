import React from 'react';
import { User } from '@supabase/supabase-js';
import BaseModal from './BaseModal';
import SavedDesigns from '../designer/SavedDesigns';

interface UserProfileProps {
  show: boolean;
  user: User | null;
  onClose: () => void;
  onLogout: () => void;
  onDesignSelect: (productId: string, uploadedImages: any) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  show,
  user,
  onClose,
  onLogout,
  onDesignSelect,
}) => {
  return (
    <BaseModal show={show} onClose={onClose}>
      <h2>Profil uživatele</h2>
      {user ? (
        <>
          <p>Email: {user.email}</p>
          {user.user_metadata && (
            <>
              <p>Jméno: {user.user_metadata.full_name}</p>
              <p>Telefon: {user.user_metadata.phone}</p>
            </>
          )}
          <button onClick={onLogout}>Odhlásit se</button>
          <SavedDesigns user={user} onDesignSelect={onDesignSelect} />
        </>
      ) : (
        <p>Načítání...</p>
      )}
    </BaseModal>
  );
};

export default UserProfile;
