import PropTypes from "prop-types";

import "../styles/filterPanel.css";

const FilterPanel = ({ filters, setFilters, handlePriceRangeChange }) => (
  <div>
    <h3>Filter by Category</h3>
    <label htmlFor="category">Category</label>
    <select
      id="category"
      onChange={(e) =>
        setFilters((prev) => ({ ...prev, category: e.target.value }))
      }
    >
      <option value="">All</option>
      <option value="Electronics">Electronics</option>
      <option value="Footwear">Footwear</option>
      <option value="Clothing">Clothing</option>
    </select>

    <h3>Filter by Brand</h3>
    <label htmlFor="brand">Brand</label>
    <select
      id="brand"
      onChange={(e) =>
        setFilters((prev) => ({ ...prev, brand: e.target.value }))
      }
    >
      <option value="">All</option>
      <option value="Brand A">Brand A</option>
      <option value="Brand B">Brand B</option>
    </select>

    <h3>Filter by Price</h3>
    <input
      type="range"
      min="0"
      max="500"
      step="10"
      onChange={(e) => handlePriceRangeChange(0, Number(e.target.value))}
    />

    <h3>Filter by Rating</h3>
    <input
      type="number"
      min="0"
      max="5"
      step="0.1"
      value={filters.rating}
      onChange={(e) =>
        setFilters((prev) => ({ ...prev, rating: e.target.value }))
      }
    />
  </div>
);

FilterPanel.propTypes = {
  filters: PropTypes.shape({
    brand: PropTypes.string,
    category: PropTypes.string,
    maxPrice: PropTypes.number,
    minPrice: PropTypes.number,
    rating: PropTypes.number,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  handlePriceRangeChange: PropTypes.func.isRequired,
};

export default FilterPanel;
