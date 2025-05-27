import React, { useEffect, useState } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function withAuth<P>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const user = useRequireAuth();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
      setHydrated(true);
    }, []);

    if (!hydrated) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      );
    }
    if (!user) return null;
    return <Component {...props} />;
  };
}
