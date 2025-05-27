import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecipeList from './RecipeList';
import * as services from '../services';
import { Recipe } from '../types';

jest.mock('../services');

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Recipe 1',
    description: 'Desc 1',
    ingredients: ['A', 'B'],
    steps: ['Step 1', 'Step 2'],
    user_id: 'user-1',
    image_url: 'https://example.com/image.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Recipe 2',
    description: 'Desc 2',
    ingredients: ['C', 'D'],
    steps: ['Step 1'],
    user_id: 'user-2',
    image_url: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

describe('RecipeList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', async () => {
    (services.getRecipes as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<RecipeList />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders recipes', async () => {
    (services.getRecipes as jest.Mock).mockResolvedValue(mockRecipes);
    render(<RecipeList />);
    await waitFor(() => {
      expect(screen.getByText('Recipe 1')).toBeInTheDocument();
      expect(screen.getByText('Recipe 2')).toBeInTheDocument();
    });
  });

  it('renders error state', async () => {
    (services.getRecipes as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
    render(<RecipeList />);
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });

  it('renders empty state', async () => {
    (services.getRecipes as jest.Mock).mockResolvedValue([]);
    render(<RecipeList />);
    await waitFor(() => {
      expect(screen.getByText(/no recipes found/i)).toBeInTheDocument();
    });
  });
});
