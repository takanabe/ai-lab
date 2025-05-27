import React, { useEffect, useState } from 'react';
import { getRecipes } from '../services';
import { Recipe } from '../types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Link from 'next/link';

interface RecipeListProps {
  userId?: string;
}

const RecipeList: React.FC<RecipeListProps> = ({ userId }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getRecipes(userId)
      .then(setRecipes)
      .catch((err) => setError(err.message || 'Failed to fetch recipes.'))
      .finally(() => setLoading(false));
  }, [userId]);

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

  if (recipes.length === 0) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        No recipes found.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      {recipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipes/${recipe.id}`} passHref legacyBehavior>
          <a style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              {recipe.image_url && (
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120, objectFit: 'cover' }}
                  image={recipe.image_url}
                  alt={recipe.title}
                />
              )}
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {recipe.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(recipe.created_at).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </a>
        </Link>
      ))}
    </Box>
  );
};

export default RecipeList;
