import React, { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

interface SignUpFormProps {
  onSuccess?: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
          />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Check your email to confirm your account.</div>}
    </form>
  );
};

export default SignUpForm;
