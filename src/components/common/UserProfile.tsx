import React from 'react';
import { User } from '@supabase/supabase-js';
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
  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          maxWidth: '80%',
          maxHeight: '80%',
          overflow: 'auto',
        }}
      >
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
        <button onClick={onClose}>Zavřít</button>
      </div>
    </div>
  );
};

export default UserProfile;