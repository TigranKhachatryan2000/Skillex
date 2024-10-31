import PropTypes from "prop-types";

import "../styles/productList.css";

const ProductList = ({ products }) => {
  if (!products || !products.length) return <p>No products found</p>;

  return (
    <div>
      {products.map((product, i) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <p>{product.rating} Stars</p>
          {/* <img src={product.imageUrl} alt={product.name} /> */}
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      brand: PropTypes.string,
      category: PropTypes.string,
      maxPrice: PropTypes.number,
      minPrice: PropTypes.number,
      rating: PropTypes.number,
    })
  ).isRequired,
};

export default ProductList;
