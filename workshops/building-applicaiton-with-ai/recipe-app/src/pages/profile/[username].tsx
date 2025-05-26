import React from 'react';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { withAuth } from '../../features/auth/components/withAuth';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Profile: {username}
        </Typography>
        {/* User profile details and recipes will go here */}
        <Typography align="center" color="text.secondary">
          (User profile page coming soon)
        </Typography>
      </Paper>
    </Container>
  );
};

export default withAuth(ProfilePage);
