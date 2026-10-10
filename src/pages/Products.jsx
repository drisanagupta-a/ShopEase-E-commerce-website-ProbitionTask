import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useToast } from "../context/useToast";
import { getProducts, getShopEaseCategory } from "../services/api";
import "../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
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

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        !category ||
        getShopEaseCategory(product.category) === category;

      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "name") return a.title.localeCompare(b.title);
      return 0;
    });

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
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="productsPage">
      <div className="productsHeading">
        <p>DISCOVER YOUR FAVOURITES</p>
        <h1>{category || "All Products"}</h1>
        <span>{filteredProducts.length} products available</span>
      </div>

      <div className="productControls">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search products"
        />

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          aria-label="Sort products"
        >
          <option value="default">Sort by: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="productsMessage">
          No products found. Try another search.
        </p>
      ) : (
        <div className="productsGrid">
          {filteredProducts.map((product) => (
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
                  {getShopEaseCategory(product.category)}
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

                <Link
                  className="productButton"
                  to={`/products/${product.id}`}
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;