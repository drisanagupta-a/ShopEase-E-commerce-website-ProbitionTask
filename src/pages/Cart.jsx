import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useToast } from "../context/useToast";
import "../styles/cart.css";

function Cart() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("shopease-cart") || "[]"
      );

      if (!Array.isArray(savedCart)) return [];

      return savedCart
        .filter(
          (item) =>
            item &&
            Number.isFinite(Number(item.id)) &&
            Number(item.quantity) > 0 &&
            Number.isFinite(Number(item.price))
        )
        .map((item) => ({
          ...item,
          quantity: Number(item.quantity),
          price: Number(item.price)
        }));
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();
  const { showToast } = useToast();

  function saveCart(updatedCart) {
    setCart(updatedCart);

    try {
      localStorage.setItem("shopease-cart", JSON.stringify(updatedCart));
    } catch {
      showToast("Unable to save your cart.", "error");
    }
  }

  function updateQuantity(id, change) {
    const updatedCart = cart
      .map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity: item.quantity + change
        };
      })
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  }

  function removeItem(id) {
    const updatedCart = cart.filter((item) => item.id !== id);

    saveCart(updatedCart);
    showToast("Product removed from cart.", "success");
  }

  function clearCart() {
    saveCart([]);
    showToast("Your cart has been cleared.", "success");
  }

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 5;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="cartPage">
        <div className="emptyCart">
          <div className="emptyCartIcon">
            <ShoppingBag size={38} strokeWidth={1.5} />
          </div>

          <h1>Your cart is empty</h1>

          <p>
            Looks like you haven't added anything to your cart yet.
            Explore our collection and find something you love.
          </p>

          <Link to="/products" className="continueShoppingButton">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cartPage">
      <div className="cartHeader">
        <div>
          <p className="cartEyebrow">YOUR SHOPPING BAG</p>
          <h1>Shopping Cart</h1>

          <p className="cartItemCount">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <button
          type="button"
          className="clearCartButton"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>

      <div className="cartLayout">
        <section className="cartItems">
          <div className="cartTableHeader">
            <span>PRODUCT</span>
            <span>PRICE</span>
            <span>QUANTITY</span>
            <span>TOTAL</span>
          </div>

          {cart.map((item) => (
            <article className="cartItem" key={item.id}>
              <div className="cartProduct">
                <Link
                  to={`/product/${item.id}`}
                  className="cartProductImage"
                >
                  <img src={item.thumbnail} alt={item.title} />
                </Link>

                <div className="cartProductInfo">
                  <Link
                    to={`/product/${item.id}`}
                    className="cartProductName"
                  >
                    {item.title}
                  </Link>

                  <p>{item.brand || "ShopEase Collection"}</p>

                  <button
                    type="button"
                    className="removeItemButton"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={15} />
                    Remove
                  </button>
                </div>
              </div>

              <div className="cartUnitPrice">
                ${item.price.toFixed(2)}
              </div>

              <div className="quantityControl">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, -1)}
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  <Minus size={14} />
                </button>

                <span>{item.quantity}</span>

                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, 1)}
                  aria-label={`Increase quantity of ${item.title}`}
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="cartLineTotal">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </article>
          ))}

          <div className="cartBottomActions">
            <Link to="/products" className="backToShopButton">
              <ArrowLeft size={17} />
              Continue Shopping
            </Link>
          </div>
        </section>

        <aside className="cartSummary">
          <h2>Order Summary</h2>

          <div className="summaryRow">
            <span>Subtotal ({totalItems} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summaryRow">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          {subtotal > 0 && subtotal < 100 && (
            <p className="shippingNote">
              Spend ${(100 - subtotal).toFixed(2)} more to get free shipping.
            </p>
          )}

          <div className="summaryDivider"></div>

          <div className="summaryTotal">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button
            type="button"
            className="checkoutButton"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>

          <p className="cartSecurityNote">
            Your order details will be confirmed at checkout.
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Cart;