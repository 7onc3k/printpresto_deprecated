import React, { useState } from 'react';
import { signIn } from '../../services/authService';
import BaseModal from '../common/BaseModal';
import { useRouter } from 'next/router';
import { useStore } from '../../store';

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onClose, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const setUser = useStore(state => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      const { user, session } = await signIn(email, password);
      if (user) {
        setUser(user);
        onClose();
        console.log('Přihlášení úspěšné', user);
        router.push('/'); // nebo kam chcete uživatele přesměrovat po přihlášení
      }
    } catch (err) {
      console.error('Chyba při přihlašování:', err);
      setError('Nesprávné přihlašovací údaje nebo nastala chyba při přihlašování.');
    }
  };

  return (
    <BaseModal show={show} onClose={onClose} title="Přihlášení">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded text-black"
        />
        <input
          type="password"
          placeholder="Heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded text-black"
        />
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Přihlásit se
        </button>
      </form>
      <p className="mt-4">
        Nemáte účet? <button type="button" onClick={onRegisterClick} className="text-blue-500 hover:underline">Registrovat se</button>
      </p>
    </BaseModal>
  );
};

export default LoginModal;