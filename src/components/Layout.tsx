// src/components/Layout.tsx
import React, { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import { User } from '@supabase/supabase-js';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import UserProfile from './UserProfile';

interface LayoutProps {
  children: ReactNode;
  onDesignSelect: (productId: string, uploadedImages: any) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onDesignSelect }) => {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleProfileClick = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting user:', error);
    } else {
      if (data && data.session) {
        setUser(data.session.user);
        setShowUserProfile(true);
      } else {
        setShowLoginModal(true);
      }
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      setUser(null);
      setShowUserProfile(false);
      router.push('/');
    }
  };
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'lightgray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={handleProfileClick}
        >
          <span>&#9776;</span>
        </div>
        {children}
      </div>
      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onRegisterClick={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      <RegisterModal
        show={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onLoginClick={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
      <UserProfile
        show={showUserProfile}
        user={user}
        onClose={() => setShowUserProfile(false)}
        onLogout={handleLogout}
        onDesignSelect={onDesignSelect}
      />
    </div>
  );
};

export default Layout;