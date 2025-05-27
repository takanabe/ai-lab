import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRecipe } from '../../features/recipes/services';
import { Recipe } from '../../features/recipes/types';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const RecipeDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof id === 'string') {
      setLoading(true);
      getRecipe(id)
        .then(setRecipe)
        .catch((err) => setError(err.message || 'Failed to fetch recipe.'))
        .finally(() => setLoading(false));
    }
  }, [id]);

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

  if (!recipe) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Recipe not found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          {recipe.title}
        </Typography>
        {recipe.image_url && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img
              src={recipe.image_url}
              alt={recipe.title}
              style={{ maxWidth: '100%', maxHeight: 240, borderRadius: 8 }}
            />
          </Box>
        )}
        <Typography variant="body1" sx={{ mb: 2 }}>
          {recipe.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Ingredients
        </Typography>
        <ul>
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Steps
        </Typography>
        <ol>
          {recipe.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Created: {new Date(recipe.created_at).toLocaleString()}
        </Typography>
      </Paper>
    </Container>
  );
};

export default RecipeDetailPage;
