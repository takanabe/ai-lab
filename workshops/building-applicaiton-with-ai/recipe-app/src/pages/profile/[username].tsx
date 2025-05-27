import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { withAuth } from '../../features/auth/components/withAuth';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import RecipeList from '../../features/recipes/components/RecipeList';
import { supabase } from '../../lib/supabaseClient';

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
}

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof username === 'string') {
      setLoading(true);
      // Fetch user by username (assume username is user id for now)
      supabase
        .from('users')
        .select('id, first_name, last_name')
        .eq('id', username)
        .single()
        .then(({ data, error }) => {
          if (error || !data) setError('User not found');
          else setUserProfile(data);
        })
        .finally(() => setLoading(false));
    }
  }, [username]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!userProfile) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        User not found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          {userProfile.first_name} {userProfile.last_name}'s Profile
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          User ID: {userProfile.id}
        </Typography>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Recipes by {userProfile.first_name} {userProfile.last_name}
        </Typography>
        <RecipeList userId={userProfile.id} />
      </Paper>
    </Container>
  );
};

export default withAuth(ProfilePage);
