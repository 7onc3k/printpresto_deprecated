import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '../../store';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const { user, isLoading } = useStore();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Načítání...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;