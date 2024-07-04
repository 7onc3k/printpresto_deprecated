import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabaseClient';

const EmployeeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('is_employee')
          .eq('id', data.user.id)
          .single();

        if (userError) throw userError;

        if (userData && userData.is_employee) {
          router.push('/employee/dashboard');
        } else {
          setError('Přístup odepřen. Nejste zaměstnanec.');
          await supabase.auth.signOut();
        }
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Chyba při přihlašování');
    }
  };

  return (
    <div>
      <h2>Přihlášení zaměstnance</h2>
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
          placeholder="Heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Přihlásit</button>
      </form>
    </div>
  );
};

export default EmployeeLogin;