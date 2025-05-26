import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../../../store/auth';

export function useRequireAuth() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace('/login');
    }
  }, [user, router]);

  return user;
}
