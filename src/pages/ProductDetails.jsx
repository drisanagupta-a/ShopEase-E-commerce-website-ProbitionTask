import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct, getShopEaseCategory } from "../services/api";
import { useToast } from "../context/useToast";
import { formatCurrency } from "../utils/formatCurrency";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError("");
      setProduct(null);
      setSelectedImage(0);

      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Unable to load product details.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  function addToCart(redirect = false) {
    if (!product) return;

    try {
      const savedCart = JSON.parse(
        localStorage.getItem("shopease-cart") || "[]"
      );

      const existingProduct = savedCart.find(
        (item) => item.id === product.id
      );

      let updatedCart;

      if (existingProduct) {
        updatedCart = savedCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...savedCart,
          { ...product, quantity: 1 }
        ];
      }

      localStorage.setItem(
        "shopease-cart",
        JSON.stringify(updatedCart)
      );

      if (redirect) {
        navigate("/checkout");
      } else {
        showToast("Product added to your cart!", "success");
      }
    } catch {
      showToast("Unable to update your cart.", "error");
    }
  }

  if (loading) {
    return (
      <main className="productDetailsMessage">
        <p>Loading product details...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="productDetailsMessage">
        <h2>Product unavailable</h2>
        <p>{error || "We couldn't find this product."}</p>

        <Link to="/products" className="detailsBackButton">
          Back to Products
        </Link>
      </main>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : [product.thumbnail];

  const originalPrice =
    product.price /
    (1 - (product.discountPercentage || 0) / 100);

  return (
    <main className="productDetailsPage">
      <div className="detailsBreadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{product.title}</span>
      </div>

      <section className="productDetailsLayout">
        <div className="detailsGallery">
          <div className="detailsMainImage">
            <img
              src={images[selectedImage]}
              alt={product.title}
            />

            {product.discountPercentage > 0 && (
              <span className="detailsDiscount">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="detailsThumbnails">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={
                    selectedImage === index
                      ? "detailsThumbnail activeThumbnail"
                      : "detailsThumbnail"
                  }
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={selectedImage === index}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detailsInfo">
          <p className="detailsCategory">
            {getShopEaseCategory(product.category)}
          </p>

          <h1>{product.title}</h1>

          <div className="detailsRating">
            <span>★ {product.rating?.toFixed(1) || "N/A"}</span>
            <span>Customer rating</span>
          </div>

          <div className="detailsPrice">
            <strong>{formatCurrency(product.price)}</strong>

            {product.discountPercentage > 0 && (
              <>
                <span className="detailsOriginalPrice">
                  {formatCurrency(originalPrice)}
                </span>

                <span className="detailsSaving">
                  Save {Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className="detailsDescription">
            {product.description}
          </p>

          <div className="detailsAvailability">
            <span
              className={
                product.stock > 0
                  ? "detailsInStock"
                  : "detailsOutOfStock"
              }
            >
              {product.stock > 0
                ? "In Stock"
                : "Currently Unavailable"}
            </span>

            {product.stock > 0 && (
              <span>{product.stock} available</span>
            )}
          </div>

          <div className="detailsActions">
            <button
              type="button"
              className="detailsAddButton"
              onClick={() => addToCart()}
              disabled={product.stock <= 0}
            >
              Add to Cart
            </button>

            <button
              type="button"
              className="detailsBuyButton"
              onClick={() => addToCart(true)}
              disabled={product.stock <= 0}
            >
              Buy Now
            </button>
          </div>

          <div className="detailsProductInfo">
            <h3>Product Information</h3>

            <div>
              <span>Category</span>
              <span>{product.category}</span>
            </div>

            <div>
              <span>Brand</span>
              <span>{product.brand || "Not specified"}</span>
            </div>

            <div>
              <span>SKU</span>
              <span>{product.sku || product.id}</span>
            </div>

            <div>
              <span>Availability</span>
              <span>
                {product.availabilityStatus || "Check stock"}
              </span>
            </div>

            {product.warrantyInformation && (
              <div>
                <span>Warranty</span>
                <span>{product.warrantyInformation}</span>
              </div>
            )}

            {product.shippingInformation && (
              <div>
                <span>Shipping</span>
                <span>{product.shippingInformation}</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;