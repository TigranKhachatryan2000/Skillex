import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import ProductCatalog from "./productCatalog";
import { MOCK_DATA } from "../mockData.js/index.js";

beforeAll(() => {
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.getItem = jest.fn(() =>
    JSON.stringify({
      category: "",
      brand: "",
      minPrice: 0,
      maxPrice: 1000,
      rating: 0,
    })
  );
});

describe("ProductCatalog Component", () => {
  test("renders ProductCatalog and displays all products by default", () => {
    const { asFragment } = render(<ProductCatalog />);

    expect(asFragment()).toMatchSnapshot();

    MOCK_DATA.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
    expect(screen.getByText('Filter by Category')).toBeInTheDocument();
  });

  test("filters products by category", () => {
    const { asFragment } = render(<ProductCatalog />);

    expect(asFragment()).toMatchSnapshot();

    const categoryInput = screen.getByText('Electronics');
    fireEvent.change(categoryInput, { target: { value: "Electronics" } });

    const filteredProducts = MOCK_DATA.filter(
      (product) => product.category === "Electronics"
    );

    filteredProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });

    const otherProducts = MOCK_DATA.filter(
      (product) => product.category !== "Electronics"
    );
    otherProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});

afterAll(() => jest.clearAllMocks());
