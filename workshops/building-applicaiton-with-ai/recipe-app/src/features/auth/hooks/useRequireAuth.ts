import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../../../store/auth';

export function useRequireAuth() {
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);
  const router = useRouter();

  useEffect(() => {
    if (hydrated && user === null) {
      router.replace('/login');
    }
  }, [user, hydrated, router]);

  return user;
}
