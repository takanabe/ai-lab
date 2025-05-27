import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { supabase } from '../lib/supabaseClient';
import { useAuthStore } from '../store/auth';
import MainLayout from '../layouts/MainLayout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const setHydrated = useAuthStore((state) => state.setHydrated);

  useEffect(() => {
    let hydrated = false;

    // Helper to set user and hydrated state only once
    const setUserAndHydrated = (user: any) => {
      setUser(user);
      if (!hydrated) {
        setHydrated(true);
        hydrated = true;
      }
    };

    // On mount, sync Zustand user state with Supabase session
    supabase.auth.getSession().then(({ data }) => {
      setUserAndHydrated(data.session?.user ?? null);
    });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserAndHydrated(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [setUser, setHydrated]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
}

export default MyApp;
