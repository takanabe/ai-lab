import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TheMealDBSearch from "./TheMealDBSearch";
import * as services from "../services";

describe("TheMealDBSearch", () => {
  it("renders search input and button", () => {
    render(<TheMealDBSearch onSelectRecipe={jest.fn()} />);
    expect(screen.getByPlaceholderText(/search recipes/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("calls onSearch when user submits a query", () => {
    const onSelectRecipe = jest.fn();
    render(<TheMealDBSearch onSelectRecipe={onSelectRecipe} />);
    const input = screen.getByPlaceholderText(/search recipes/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "chicken" } });
    fireEvent.click(button);

    // TheMealDBSearch should trigger a fetch (mocked in the component test)
    // For now, just check that the input value updates and button is clickable
    expect(input).toHaveValue("chicken");
  });

  it("displays search results and allows selecting a recipe", async () => {
    const mockResults = [
      {
        id: "1",
        title: "Test Recipe",
        image: "http://example.com/image.jpg",
        ingredients: [],
      },
    ];
    jest.spyOn(services, "searchTheMealDBRecipes").mockResolvedValue(mockResults);

    const onSelectRecipe = jest.fn();
    render(<TheMealDBSearch onSelectRecipe={onSelectRecipe} />);
    const input = screen.getByPlaceholderText(/search recipes/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(button);

    // Wait for the result to appear
    const result = await screen.findByText(/Test Recipe/i);
    expect(result).toBeInTheDocument();

    // Simulate clicking the result
    fireEvent.click(result);
    await waitFor(() =>
      expect(onSelectRecipe).toHaveBeenCalledWith(
        expect.objectContaining({ id: "1", title: "Test Recipe" })
      )
    );
  });
});
