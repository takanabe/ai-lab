import React, { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

interface SignUpFormProps {
  onSuccess?: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email || !password || !firstName || !lastName) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // If user is immediately available (no email confirmation required)
    if (data.user) {
      await supabase
        .from('users')
        .update({ first_name: firstName, last_name: lastName })
        .eq('id', data.user.id);
      setSuccess(true);
      if (onSuccess) onSuccess();
    } else {
      // If email confirmation is required, show message and skip update for now
      setSuccess(true);
      // Optionally, you could store first/last name in localStorage and update after login
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        fullWidth
        label="First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        autoComplete="given-name"
        disabled={loading}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        autoComplete="family-name"
        disabled={loading}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete="email"
        disabled={loading}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="new-password"
        disabled={loading}
        inputProps={{ minLength: 6 }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 2, mb: 1 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
      </Button>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Check your email to confirm your account.
        </Alert>
      )}
    </Box>
  );
};

export default SignUpForm;
