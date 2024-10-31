import { useState, useEffect } from "react";
import { debounce } from "lodash";

import ProductList from "./productList.js";
import FilterPanel from "./filterPanel.js";
import useDebounce from "../hooks/useDebounce.js";
import { MOCK_DATA } from "../mockData.js/index.js";
import { PRODUCT_FILTERS } from "../constants/index.js";

const savedFilters = JSON.parse(localStorage.getItem(PRODUCT_FILTERS)) || {
  category: "",
  brand: "",
  minPrice: 0,
  maxPrice: 1000,
  rating: 0,
};

const ProductCatalog = () => {
  const [filteredProducts, setFilteredProducts] = useState(MOCK_DATA);
  const [filters, setFilters] = useState(savedFilters);

  const debouncedMinPrice = useDebounce(filters.minPrice, 300);
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 300);

  useEffect(() => {
    const applyFilters = () => {
      let results = MOCK_DATA;

      if (filters.category)
        results = results.filter(
          (product) => product.category === filters.category
        );

      if (filters.brand)
        results = results.filter((product) => product.brand === filters.brand);

      results = results.filter(
        (product) =>
          product.price >= debouncedMinPrice && product.price <= debouncedMaxPrice
      );

      results = results.filter((product) => product.rating >= filters.rating);

      setFilteredProducts(results);
    };

    applyFilters();
    localStorage.setItem(PRODUCT_FILTERS, JSON.stringify(filters));
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePriceRangeChange = debounce((minPrice, maxPrice) => {
    setFilters((prev) => ({ ...prev, minPrice, maxPrice }));
  }, 300);

  return (
    <div className="catalog-container">
      <div className="filter-panel">
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          handlePriceRangeChange={handlePriceRangeChange}
        />
      </div>
      <div className="product-list">
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductCatalog;
