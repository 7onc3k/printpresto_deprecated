import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

const EmployeeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { error: updateError } = await supabase.auth.updateUser({
          data: { is_employee: true }
        });

        if (updateError) {
          console.error('Error updating user metadata:', updateError);
          setError('Error verifying employee');
        } else {
          console.log('Employee login successful');
          window.location.href = '/employee/dashboard';
        }
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Error logging in');
    }
  };

  return (
    <div>
      <h2>Employee Login</h2>
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
    </div>
  );
};

export default EmployeeLogin;