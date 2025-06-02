import { searchTheMealDBRecipes, mapMealDBToRecipe } from "./services";

describe("searchTheMealDBRecipes", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

describe("mapMealDBToRecipe", () => {
  it("maps TheMealDB meal object to app Recipe type", () => {
    const meal = {
      idMeal: "123",
      strMeal: "Test Meal",
      strCategory: "Beef",
      strInstructions: "Cook it well.",
      strMealThumb: "http://example.com/image.jpg",
      strIngredient1: "Beef",
      strIngredient2: "Salt",
      strIngredient3: "",
      strMeasure1: "200g",
      strMeasure2: "1 tsp",
      strMeasure3: "",
    };
    const mapped = mapMealDBToRecipe(meal);
    expect(mapped).toEqual({
      id: "123",
      title: "Test Meal",
      category: "Beef",
      instructions: "Cook it well.",
      image: "http://example.com/image.jpg",
      ingredients: [
        { ingredient: "Beef", measure: "200g" },
        { ingredient: "Salt", measure: "1 tsp" },
      ],
    });
  });
});

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches recipes from TheMealDB API and returns mapped results", async () => {
    const mockResponse = {
      meals: [
        {
          idMeal: "52772",
          strMeal: "Teriyaki Chicken Casserole",
          strCategory: "Chicken",
          strInstructions: "Some instructions",
          strMealThumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
          strIngredient1: "soy sauce",
          strIngredient2: "water",
          strIngredient3: "",
          strMeasure1: "3/4 cup",
          strMeasure2: "1/2 cup",
          strMeasure3: "",
        },
      ],
    };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const results = await searchTheMealDBRecipes("chicken");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
    );
    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({
      id: "52772",
      title: "Teriyaki Chicken Casserole",
      category: "Chicken",
      instructions: "Some instructions",
      image: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      ingredients: [
        { ingredient: "soy sauce", measure: "3/4 cup" },
        { ingredient: "water", measure: "1/2 cup" },
      ],
    });
  });

  it("returns empty array if no meals found", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ meals: null }),
    });
    const results = await searchTheMealDBRecipes("notfound");
    expect(results).toEqual([]);
  });
});
