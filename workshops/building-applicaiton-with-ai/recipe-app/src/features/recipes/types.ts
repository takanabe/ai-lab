export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  user_id: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}
