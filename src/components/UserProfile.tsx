import React from 'react';
import { User } from '@supabase/supabase-js';
import SavedDesigns from './SavedDesigns';

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
  return show ? (
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
          backgroundColor: 'blue',
          padding: '20px',
          borderRadius: '5px',
        }}
      >
        <h2>User Profile</h2>
        {user ? (
          <>
            <p>Email: {user.email}</p>
            <button type="button" onClick={onLogout}>
              Logout
            </button>
            <SavedDesigns user={user} onDesignSelect={onDesignSelect} />
          </>
        ) : (
          <p>Loading...</p>
        )}
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  ) : null;
};

export default UserProfile;