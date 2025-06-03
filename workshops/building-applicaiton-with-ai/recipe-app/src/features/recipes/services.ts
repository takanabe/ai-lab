import { supabase } from '../../lib/supabaseClient';
import { Recipe } from './types';

// Create a new recipe
export async function createRecipe(recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('recipes')
    .insert([recipe])
    .select()
    .single();
  if (error) throw error;
  return data as Recipe;
}

// Get a single recipe by id
export async function getRecipe(id: string) {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Recipe;
}

// Get all recipes (optionally filter by user_id)
export async function getRecipes(userId?: string) {
  let query = supabase.from('recipes').select('*').order('created_at', { ascending: false });
  if (userId) {
    query = query.eq('user_id', userId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data as Recipe[];
}

// Update a recipe
export async function updateRecipe(
  id: string,
  updates: Partial<Omit<Recipe, 'id' | 'created_at' | 'updated_at'>>
) {
  const { data, error } = await supabase
    .from('recipes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Recipe;
}

// Delete a recipe
export async function deleteRecipe(id: string) {
  const { error } = await supabase.from('recipes').delete().eq('id', id);
  if (error) throw error;
}

/**
 * Search recipes from TheMealDB API by keyword.
 * Returns mapped results for use in the app.
 */
export function mapMealDBToRecipe(meal: any) {
  // TheMealDB has up to 20 ingredients/measure fields
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient: ingredient.trim(), measure: (measure || "").trim() });
    }
  }
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    instructions: meal.strInstructions,
    image: meal.strMealThumb,
    ingredients,
    // Add more fields as needed
  };
}

export async function searchTheMealDBRecipes(query: string) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch from TheMealDB");
  const data = await res.json();
  if (!data.meals) return [];
  return data.meals.map(mapMealDBToRecipe);
}
