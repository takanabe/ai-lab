import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewRecipePage from "./new";
import * as TheMealDBService from "../../features/recipes/services";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    pathname: "/recipes/new",
    query: {},
    asPath: "/recipes/new",
    route: "/recipes/new",
    basePath: "",
    back: jest.fn(),
    beforePopState: jest.fn(),
    events: { on: jest.fn(), off: jest.fn(), emit: jest.fn() },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    reload: jest.fn(),
    replace: jest.fn(),
  }),
}));
jest.mock("../../features/recipes/services");

// Mock Zustand auth store to always return a user and hydrated=true
jest.mock("../../store/auth", () => ({
  useAuthStore: () => ({
    user: { id: "test-user", email: "test@example.com" },
    hydrated: true,
  }),
}));

describe("NewRecipePage with TheMealDB import", () => {
  it("pre-fills RecipeForm when a TheMealDB recipe is selected", async () => {
    // Mock TheMealDB search results
    (TheMealDBService.searchTheMealDBRecipes as jest.Mock).mockResolvedValue([
      {
        id: "1",
        title: "Imported Recipe",
        instructions: "Imported instructions",
        image: "http://example.com/image.jpg",
        ingredients: [
          { ingredient: "Egg", measure: "2" },
          { ingredient: "Flour", measure: "100g" },
        ],
      },
    ]);

    render(<NewRecipePage />);
    // Search for a recipe
    const input = screen.getByPlaceholderText(/search recipes/i);
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.change(input, { target: { value: "import" } });
    fireEvent.click(button);

    // Wait for result and select it
    const result = await screen.findByText(/Imported Recipe/i);
    fireEvent.click(result);

    // Check that RecipeForm fields are pre-filled
    expect(screen.getByDisplayValue("Imported Recipe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Imported instructions")).toBeInTheDocument();
    // Optionally check for ingredients, image, etc.
  });
});
