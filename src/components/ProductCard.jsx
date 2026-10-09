import {Heart, ShoppingBag, Star} from "lucide-react";
import {NavLink} from "react-router-dom";

const ProductCard = ({product}) => {
  return (
    <article className="productCard">
      <div className="productImageWrapper">
        <NavLink to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="productImage"
          />
        </NavLink>

        <button
          type="button"
          className="wishlistButton"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart size={18} />
        </button>

        <span className="productCategory">
          {product.category}
        </span>
      </div>

      <div className="productCardContent">
        <div className="productRating">
          <Star size={14} fill="currentColor" />
          <span>{product.rating}</span>
        </div>

        <NavLink
          to={`/products/${product.id}`}
          className="productName"
        >
          {product.name}
        </NavLink>

        <div className="productBottom">
          <strong className="productPrice">
            ₹{product.price.toLocaleString("en-IN")}
          </strong>

          <button
            type="button"
            className="addToCartButton"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={17} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;