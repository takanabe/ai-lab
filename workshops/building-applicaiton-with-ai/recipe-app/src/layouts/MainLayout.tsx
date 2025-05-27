import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { useAuthStore } from '../store/auth';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Recipe Sharing App
            </Link>
          </Typography>
          <Button color="inherit" component={Link} href="/recipes/new">
            Add Recipe
          </Button>
          {user ? (
            <>
              <Button color="inherit" component={Link} href={`/profile/${user.id}`}>
                Profile
              </Button>
              <Button color="inherit" onClick={signOut}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} href="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ minHeight: '80vh', py: 4 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: 'grey.100', mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Recipe Sharing App
        </Typography>
      </Box>
    </>
  );
};

export default MainLayout;
