import React, { useState } from 'react';
import SignUpForm from '../features/auth/components/SignUpForm';
import LoginForm from '../features/auth/components/LoginForm';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useAuthStore } from '../store/auth';

const LoginPage: React.FC = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  if (user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            You are already logged in as <b>{user.email}</b>.
          </Alert>
          <Box sx={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={signOut}>
              Log out
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          {showSignUp ? 'Sign Up' : 'Login'}
        </Typography>
        {showSignUp ? <SignUpForm /> : <LoginForm />}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          {showSignUp ? (
            <Typography variant="body2">
              Already have an account?{' '}
              <Button variant="text" onClick={() => setShowSignUp(false)}>
                Login
              </Button>
            </Typography>
          ) : (
            <Typography variant="body2">
              Don't have an account?{' '}
              <Button variant="text" onClick={() => setShowSignUp(true)}>
                Sign Up
              </Button>
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
