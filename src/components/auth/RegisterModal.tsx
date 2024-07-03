import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import BaseModal from '../common/BaseModal';
import { signUp } from '../../services/authService';

interface RegisterModalProps {
  show: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ show, onClose, onLoginClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      await signUp(email, password);
      onClose();
    } catch (err) {
      setError('An error occurred while registering.');
    }
  };
  
  

  return (
    <BaseModal show={show} onClose={onClose}>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <button type="button" onClick={onLoginClick}>Login</button>
      </p>
    </BaseModal>
  );
};

export default RegisterModal;
