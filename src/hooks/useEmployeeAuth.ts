import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '../store';

export const useEmployeeAuth = () => {
  const router = useRouter();
  const { user } = useStore();

  useEffect(() => {
    if (user && !user.user_metadata?.is_employee) {
      router.push('/');
    }
  }, [user, router]);

  return { user };
};
