
import { useToast } from "../context/useToast";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

import "../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { showToast } = useToast();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        showToast(err.message, "error");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [showToast]);

  if (loading) {
    return (
      <main className="productsMessage">
        <p>Loading products...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="productsMessage">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="productsPage">
      <div className="productsHeading">
        <p>DISCOVER YOUR FAVOURITES</p>
        <h1>All Products</h1>
        <span>{products.length} products available</span>
      </div>

      <div className="productsGrid">
        {products.map((product) => (
          <div className="productCard" key={product.id}>
            <div className="productImageBox">
              <img
                src={product.thumbnail}
                alt={product.title}
                loading="lazy"
              />
            </div>

            <div className="productInfo">
              <p className="productCategory">
                {product.category}
              </p>

              <h3>{product.title}</h3>

              <p className="productRating">
                Rating: {product.rating} / 5
              </p>

              <div className="productPrice">
                <strong>${product.price}</strong>

                {product.discountPercentage > 0 && (
                  <span>
                    {Math.round(product.discountPercentage)}% OFF
                  </span>
                )}
              </div>

              <button
                className="productButton"
                onClick={() =>
                  showToast(
                    "Product details will be available soon.",
                    "success"
                  )
                }
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Products;