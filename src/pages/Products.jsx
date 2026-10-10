import { useEffect, useState } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { useToast } from "../context/useToast";
import { getProducts, getShopEaseCategory } from "../services/api";
import "../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("0");

  const [searchParams] = useSearchParams();
  const { category: pathCategory } = useParams();
  const queryCategory = searchParams.get("category") || "";
  const category = pathCategory || queryCategory;
  const { showToast } = useToast();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Unable to load products.");
        showToast(err.message || "Unable to load products.", "error");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [showToast]);

  function normalizeCategory(value) {
    const normalized = value.toLowerCase().replace(/[-_]/g, " ").trim();

    if (normalized === "all") return "";
    if (normalized === "home living") return "home & living";

    return normalized;
  }

  const filteredProducts = products
    .filter((product) => {
      const productCategory = normalizeCategory(
        getShopEaseCategory(product.category)
      );

      const selectedCategory = normalizeCategory(category);

      const matchesCategory =
        !selectedCategory || productCategory === selectedCategory;

      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      const matchesRating = product.rating >= Number(minRating);

      return (
        matchesCategory &&
        matchesSearch &&
        matchesPrice &&
        matchesRating
      );
    })
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "name") return a.title.localeCompare(b.title);
      if (sort === "newest") return b.id - a.id;
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
        <h1>
          {category
            ? category === "home-living"
              ? "Home & Living"
              : category.charAt(0).toUpperCase() + category.slice(1)
            : "All Products"}
        </h1>
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
          <option value="rating">Rating: Highest First</option>
          <option value="newest">Newest</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <div className="productFilters">
        <label>
          Maximum Price ($)
          <input
            type="number"
            min="0"
            placeholder="Any price"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </label>

        <label>
          Minimum Rating
          <select
            value={minRating}
            onChange={(event) => setMinRating(event.target.value)}
          >
            <option value="0">All Ratings</option>
            <option value="3">3+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </label>

        <button
          type="button"
          className="productButton"
          onClick={() => {
            setSearch("");
            setSort("default");
            setMaxPrice("");
            setMinRating("0");
          }}
        >
          Clear Filters
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="productsMessage">
          <p>No products found. Try changing your search or filters.</p>
        </div>
      ) : (
        <div className="productsGrid">
          {filteredProducts.map((product) => (
            <div className="productCard" key={product.id}>
              <Link
                to={`/product/${product.id}`}
                className="productImageBox"
                aria-label={`View ${product.title}`}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                />
              </Link>

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
                  to={`/product/${product.id}`}
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