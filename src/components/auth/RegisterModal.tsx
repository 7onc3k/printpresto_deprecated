import React, { useState } from 'react';
import { signUp } from '../../services/authService';
import BaseModal from '../common/BaseModal';

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
    <BaseModal show={show} onClose={onClose} title="Register">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded text-black"
        />
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Register
        </button>
      </form>
      <p className="mt-4">
        Already have an account? <button type="button" onClick={onLoginClick} className="text-blue-500 hover:underline">Login</button>
      </p>
    </BaseModal>
  );
};

export default RegisterModal;