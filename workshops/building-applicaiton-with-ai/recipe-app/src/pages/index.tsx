import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import RecipeList from '../features/recipes/components/RecipeList';

const HomePage: React.FC = () => (
  <Container maxWidth="md" sx={{ mt: 8 }}>
    <Typography component="h1" variant="h4" align="center" sx={{ mb: 4 }}>
      Latest Recipes
    </Typography>
    <RecipeList />
  </Container>
);

export default HomePage;
