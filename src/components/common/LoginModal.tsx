// src/components/LoginModal.tsx
import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        onClose();
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('An error occurred while logging in.');
    }
  };

  return show ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Changed to darker black with transparency
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: 'black', // Changed to black
          color: 'white', // Added white text for better readability
          padding: '20px',
          borderRadius: '5px',
        }}
      >
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
          Don&apos;t have an account? <button type="button" onClick={onRegisterClick}>Register</button>
        </p>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  ) : null;
};

export default LoginModal;