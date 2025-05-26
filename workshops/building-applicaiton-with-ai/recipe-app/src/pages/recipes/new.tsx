import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { withAuth } from '../../features/auth/components/withAuth';

const NewRecipePage: React.FC = () => (
  <Container maxWidth="sm" sx={{ mt: 8 }}>
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
        Create New Recipe
      </Typography>
      {/* Recipe creation form will go here */}
      <Typography align="center" color="text.secondary">
        (Recipe creation form coming soon)
      </Typography>
    </Paper>
  </Container>
);

export default withAuth(NewRecipePage);
