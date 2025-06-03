import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { withAuth } from '../../features/auth/components/withAuth';
import RecipeForm from '../../features/recipes/components/RecipeForm';
import Alert from '@mui/material/Alert';
import TheMealDBSearch from '../../features/recipes/components/TheMealDBSearch';

const NewRecipePage: React.FC = () => {
  const [created, setCreated] = useState(false);
  const [importedRecipe, setImportedRecipe] = useState<any | null>(null);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Create New Recipe
        </Typography>
        <TheMealDBSearch onSelectRecipe={setImportedRecipe} />
        {created && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Recipe created successfully!
          </Alert>
        )}
        <RecipeForm
          onSuccess={() => setCreated(true)}
          title={importedRecipe ? importedRecipe.title : ""}
          description={importedRecipe ? "" : ""}
          ingredients={importedRecipe ? importedRecipe.ingredients.map((i: any) => i.ingredient) : undefined}
          steps={importedRecipe ? [importedRecipe.instructions] : undefined}
          image_url={importedRecipe ? importedRecipe.image : ""}
        />
      </Paper>
    </Container>
  );
};

export default withAuth(NewRecipePage);
