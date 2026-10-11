import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useToast } from "../context/useToast";
import "../styles/wishlist.css";

function Wishlist() {
  const { showToast } = useToast();

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = JSON.parse(
        localStorage.getItem("shopease-wishlist") || "[]"
      );

      return Array.isArray(savedWishlist) ? savedWishlist : [];
    } catch {
      return [];
    }
  });

  function removeItem(id) {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updatedWishlist);
    localStorage.setItem(
      "shopease-wishlist",
      JSON.stringify(updatedWishlist)
    );

    showToast("Removed from wishlist.", "success");
  }

  function clearWishlist() {
    setWishlist([]);
    localStorage.setItem("shopease-wishlist", "[]");
    showToast("Wishlist cleared.", "success");
  }

  if (wishlist.length === 0) {
    return (
      <main className="wishlistPage">
        <section className="emptyWishlist">
          <div className="emptyWishlistIcon">
            <Heart size={38} strokeWidth={1.5} />
          </div>

          <h1>Your wishlist is empty</h1>

          <p>
            Save your favourite products here and find them whenever
            you return.
          </p>

          <Link to="/products" className="wishlistShopButton">
            Discover Products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="wishlistPage">
      <div className="wishlistHeader">
        <div>
          <p className="wishlistEyebrow">YOUR COLLECTION</p>
          <h1>My Wishlist</h1>
          <p>{wishlist.length} saved products</p>
        </div>

        <button
          type="button"
          className="clearWishlistButton"
          onClick={clearWishlist}
        >
          Clear Wishlist
        </button>
      </div>

      <div className="wishlistGrid">
        {wishlist.map((product) => (
          <article className="wishlistCard" key={product.id}>
            <Link
              to={`/product/${product.id}`}
              className="wishlistImage"
            >
              <img src={product.thumbnail} alt={product.title} />
            </Link>

            <div className="wishlistInfo">
              <p>{product.category}</p>

              <Link
                to={`/product/${product.id}`}
                className="wishlistProductName"
              >
                {product.title}
              </Link>

              <strong>${Number(product.price).toFixed(2)}</strong>

              <div className="wishlistActions">
                <Link
                  to={`/product/${product.id}`}
                  className="wishlistViewButton"
                >
                  View Product
                </Link>

                <button
                  type="button"
                  className="wishlistRemoveButton"
                  onClick={() => removeItem(product.id)}
                  aria-label={`Remove ${product.title} from wishlist`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="wishlistBottom">
        <Link to="/products">
          <ShoppingBag size={17} />
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default Wishlist;