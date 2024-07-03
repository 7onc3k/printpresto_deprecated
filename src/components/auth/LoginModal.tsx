import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import BaseModal from '../common/BaseModal';
import { signIn } from '../../services/authService';

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onClose, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      await signIn(email, password);
      onClose();
    } catch (err) {
      setError('An error occurred while logging in.');
    }
  };

  return (
    <BaseModal show={show} onClose={onClose}>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <button type="button" onClick={onRegisterClick}>Register</button>
      </p>
    </BaseModal>
  );
};

export default LoginModal;
