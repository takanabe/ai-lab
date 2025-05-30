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
import Grid from '@mui/material/Grid';

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
    <Grid container spacing={3} sx={{ mt: 2 }} alignItems="stretch">
      {recipes.map((recipe) => (
        // @ts-ignore
        <Grid item xs={4} key={recipe.id} sx={{ display: 'flex' }}>
          <Link href={`/recipes/${recipe.id}`} passHref legacyBehavior>
            <a style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'flex' }}>
              <Card
                sx={{
                  width: '100%',
                  minHeight: 320,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
              >
                {recipe.image_url ? (
                  <CardMedia
                    component="img"
                    sx={{ width: '100%', height: 120, objectFit: 'cover' }}
                    image={recipe.image_url}
                    alt={recipe.title}
                  />
                ) : (
                  <Box sx={{ width: '100%', height: 120, bgcolor: 'grey.200' }} />
                )}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    minHeight: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    overflow: 'hidden',
                  }}
                >
                  <Typography variant="h6" gutterBottom noWrap>
                    {recipe.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    {recipe.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(recipe.created_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;
