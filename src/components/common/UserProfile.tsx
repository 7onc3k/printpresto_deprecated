// src/components/common/UserProfile.tsx
import React from 'react';
import { User } from '@supabase/supabase-js';
import BaseModal from './BaseModal';
import SavedDesigns from '../products/SavedDesigns';

interface UserProfileProps {
  show: boolean;
  user: User | null;
  onClose: () => void;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  show,
  user,
  onClose,
  onLogout,
}) => {
  return (
    <BaseModal show={show} onClose={onClose} title="Profil uživatele">
      {user ? (
        <div className="space-y-4">
          <p className="text-lg">Email: <span className="font-semibold">{user.email}</span></p>
          {user.user_metadata && (
            <>
              <p className="text-lg">Jméno: <span className="font-semibold">{user.user_metadata.full_name}</span></p>
              <p className="text-lg">Telefon: <span className="font-semibold">{user.user_metadata.phone}</span></p>
            </>
          )}
          <button 
            onClick={onLogout}
            className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Odhlásit se
          </button>
          <SavedDesigns user={user} />
        </div>
      ) : (
        <p className="text-lg text-gray-600">Načítání...</p>
      )}
    </BaseModal>
  );
};

export default UserProfile;