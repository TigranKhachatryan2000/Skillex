import React from 'react';
import { render, screen } from '@testing-library/react';

import ProductList from './productList';

describe('ProductList Component', () => {
  test('renders "No products found" message when there are no products', () => {
    const { asFragment } = render(<ProductList products={[]} />);

    expect(asFragment()).toMatchSnapshot();

    const noProductsMessage = screen.getByText(/no products found/i);
    expect(noProductsMessage).toBeInTheDocument();
  });

  test('renders a list of products', () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 99.99, rating: 4 },
      { id: 2, name: 'Product 2', price: 149.99, rating: 5 },
      { id: 3, name: 'Product 3', price: 49.99, rating: 3 },
    ];

    const { asFragment } = render(<ProductList products={mockProducts} />);

    expect(asFragment()).toMatchSnapshot();

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`${product.rating} Stars`)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });
});
