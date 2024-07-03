import React from 'react';
import { useRouter } from 'next/router';
import { signOut } from '../services/authService';
import { useStore } from '../store';
import SavedDesigns from '../components/products/SavedDesigns';

const Profile: React.FC = () => {
  const router = useRouter();
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) {
    return <div>Načítání...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold mb-5">Profil uživatele</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="mb-4"><strong>Email:</strong> {user.email}</p>
        {user.user_metadata && (
          <>
            <p className="mb-4"><strong>Jméno:</strong> {user.user_metadata.full_name}</p>
            <p className="mb-4"><strong>Telefon:</strong> {user.user_metadata.phone}</p>
          </>
        )}
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Odhlásit se
        </button>
      </div>
      <SavedDesigns user={user} />
    </div>
  );
};

export default Profile;