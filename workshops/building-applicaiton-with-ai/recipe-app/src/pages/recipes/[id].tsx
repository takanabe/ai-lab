import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRecipe, updateRecipe, deleteRecipe } from '../../features/recipes/services';
import { Recipe } from '../../features/recipes/types';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RecipeForm from '../../features/recipes/components/RecipeForm';
import { useAuthStore } from '../../store/auth';

const RecipeDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useAuthStore((state) => state.user);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    if (typeof id === 'string') {
      setLoading(true);
      getRecipe(id)
        .then(setRecipe)
        .catch((err) => setError(err.message || 'Failed to fetch recipe.'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleEdit = () => setEditing(true);

  const handleUpdate = async (updated: Partial<Recipe>) => {
    if (!recipe) return;
    setLoading(true);
    try {
      const updatedRecipe = await updateRecipe(recipe.id, updated);
      setRecipe(updatedRecipe);
      setEditSuccess(true);
      setTimeout(() => {
        setEditing(false);
        setEditSuccess(false);
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to update recipe.');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!recipe) return;
    setLoading(true);
    try {
      await deleteRecipe(recipe.id);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to delete recipe.');
    }
    setLoading(false);
  };

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

  const isOwner = user && user.id === recipe.user_id;

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {editing ? (
          <>
            <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
              Edit Recipe
            </Typography>
            <RecipeForm
              onSuccess={() => setEditSuccess(true)}
              onSubmit={handleUpdate}
              title={recipe.title}
              description={recipe.description}
              ingredients={recipe.ingredients}
              steps={recipe.steps}
              image_url={recipe.image_url}
            />
            {editSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Recipe updated!
              </Alert>
            )}
            <Button onClick={() => setEditing(false)} sx={{ mt: 2 }}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
              {recipe.title}
            </Typography>
            {isOwner && (
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button variant="outlined" onClick={handleEdit}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={handleDelete}>
                  Delete
                </Button>
              </Box>
            )}
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
          </>
        )}
      </Paper>
    </Container>
  );
};

export default RecipeDetailPage;
