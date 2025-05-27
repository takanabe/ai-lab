import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { createRecipe } from '../services';
import { useAuthStore } from '../../../store/auth';
import { Recipe } from '../types';

interface RecipeFormProps {
  onSuccess?: () => void;
  onSubmit?: (fields: Partial<Recipe>) => Promise<void>;
  title?: string;
  description?: string;
  ingredients?: string[];
  steps?: string[];
  image_url?: string;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({
  onSuccess,
  onSubmit,
  title: initialTitle = '',
  description: initialDescription = '',
  ingredients: initialIngredients = [''],
  steps: initialSteps = [''],
  image_url: initialImageUrl = '',
}) => {
  const user = useAuthStore((state) => state.user);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [ingredients, setIngredients] = useState<string[]>(initialIngredients.length ? initialIngredients : ['']);
  const [steps, setSteps] = useState<string[]>(initialSteps.length ? initialSteps : ['']);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Only set initial state on mount, not on every prop change
  // (removes useEffect that resets state on every prop change)

  const handleIngredientChange = (idx: number, value: string) => {
    setIngredients((prev) => prev.map((ing, i) => (i === idx ? value : ing)));
  };

  const handleStepChange = (idx: number, value: string) => {
    setSteps((prev) => prev.map((step, i) => (i === idx ? value : step)));
  };

  const addIngredient = () => setIngredients((prev) => [...prev, '']);
  const removeIngredient = (idx: number) =>
    setIngredients((prev) => prev.filter((_, i) => i !== idx));

  const addStep = () => setSteps((prev) => [...prev, '']);
  const removeStep = (idx: number) => setSteps((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!user && !onSubmit) {
      setError('You must be logged in to create a recipe.');
      return;
    }
    if (!title || ingredients.some((i) => !i) || steps.some((s) => !s)) {
      setError('Title, all ingredients, and all steps are required.');
      return;
    }

    setLoading(true);
    try {
      if (onSubmit) {
        await onSubmit({
          title,
          description,
          ingredients,
          steps,
          image_url: imageUrl || undefined,
        });
      } else {
        await createRecipe({
          title,
          description,
          ingredients,
          steps,
          user_id: user!.id,
          image_url: imageUrl || undefined,
        });
      }
      setSuccess(true);
      if (!onSubmit) {
        setTitle('');
        setDescription('');
        setIngredients(['']);
        setSteps(['']);
        setImageUrl('');
      }
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to save recipe.');
    }
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        fullWidth
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={loading}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        multiline
        minRows={2}
        disabled={loading}
      />
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Ingredients
      </Typography>
      {ingredients.map((ing, idx) => (
        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TextField
            fullWidth
            label={`Ingredient ${idx + 1}`}
            value={ing}
            onChange={e => handleIngredientChange(idx, e.target.value)}
            disabled={loading}
          />
          <Button
            onClick={() => removeIngredient(idx)}
            disabled={ingredients.length === 1 || loading}
            sx={{ ml: 1 }}
          >
            Remove
          </Button>
        </Box>
      ))}
      <Button onClick={addIngredient} disabled={loading} sx={{ mb: 2 }}>
        Add Ingredient
      </Button>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Steps
      </Typography>
      {steps.map((step, idx) => (
        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TextField
            fullWidth
            label={`Step ${idx + 1}`}
            value={step}
            onChange={e => handleStepChange(idx, e.target.value)}
            disabled={loading}
          />
          <Button
            onClick={() => removeStep(idx)}
            disabled={steps.length === 1 || loading}
            sx={{ ml: 1 }}
          >
            Remove
          </Button>
        </Box>
      ))}
      <Button onClick={addStep} disabled={loading} sx={{ mb: 2 }}>
        Add Step
      </Button>
      <TextField
        margin="normal"
        fullWidth
        label="Image URL"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        disabled={loading}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 2, mb: 1 }}
      >
        {loading
          ? <CircularProgress size={24} />
          : onSubmit
            ? 'Edit Recipe'
            : 'Create Recipe'}
      </Button>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {onSubmit ? 'Recipe updated!' : 'Recipe created!'}
        </Alert>
      )}
    </Box>
  );
};

export default RecipeForm;
