import React, { useState } from "react";
import { Button, TextField, Box, List, ListItem, ListItemButton, ListItemText, Avatar } from "@mui/material";
import { searchTheMealDBRecipes } from "../services";

type TheMealDBSearchProps = {
  onSelectRecipe: (recipe: any) => void;
};

const TheMealDBSearch: React.FC<TheMealDBSearchProps> = ({ onSelectRecipe }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const recipes = await searchTheMealDBRecipes(query);
      setResults(recipes);
    } catch (err: any) {
      setError("Failed to fetch recipes.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", gap: 2 }}>
        <TextField
          placeholder="Search recipes"
          value={query}
          onChange={e => setQuery(e.target.value)}
          inputProps={{ "aria-label": "search recipes" }}
          size="small"
        />
        <Button type="submit" variant="contained" disabled={loading}>
          Search
        </Button>
      </Box>
      {error && <Box color="error.main" mt={2}>{error}</Box>}
      <List>
        {results.map(recipe => (
          <ListItem key={recipe.id} disablePadding>
            <ListItemButton onClick={() => onSelectRecipe(recipe)}>
              {recipe.image && (
                <Avatar src={recipe.image} alt={recipe.title} sx={{ mr: 2 }} />
              )}
              <ListItemText primary={recipe.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TheMealDBSearch;
