import React from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';

export function withAuth<P>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const user = useRequireAuth();
    if (!user) return null;
    return <Component {...props} />;
  };
}
