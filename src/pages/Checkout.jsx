import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../context/useToast";
import { formatCurrency } from "../utils/formatCurrency";
import "../styles/checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [cart] = useState(() => {
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
            Number.isFinite(Number(item.price)) &&
            Number(item.price) >= 0
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

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const FREE_SHIPPING_THRESHOLD = 999;
  const SHIPPING_FEE = 49;

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FEE;

  const total = subtotal + shipping;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  }

  function validateForm() {
    const newErrors = {};

    const namePattern = /^[A-Za-z][A-Za-z .'-]*$/;
    const phonePattern = /^[6-9]\d{9}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const locationPattern = /^[A-Za-z][A-Za-z .'-]*$/;

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (
      form.fullName.trim().length < 3 ||
      form.fullName.trim().length > 50
    ) {
      newErrors.fullName = "Name must contain 3–50 characters.";
    } else if (!namePattern.test(form.fullName.trim())) {
      newErrors.fullName =
        "Use letters, spaces, apostrophes, dots or hyphens only.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      form.email.trim().length > 100 ||
      !emailPattern.test(form.email.trim())
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phonePattern.test(form.phone.trim())) {
      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required.";
    } else if (
      form.address.trim().length < 10 ||
      form.address.trim().length > 150
    ) {
      newErrors.address = "Address must contain 10–150 characters.";
    } else if (!/[A-Za-z]/.test(form.address)) {
      newErrors.address =
        "Address must include a street or locality name.";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    } else if (
      form.city.trim().length < 2 ||
      form.city.trim().length > 50 ||
      !locationPattern.test(form.city.trim())
    ) {
      newErrors.city = "Enter a valid city name (2–50 characters).";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required.";
    } else if (
      form.state.trim().length < 2 ||
      form.state.trim().length > 50 ||
      !locationPattern.test(form.state.trim())
    ) {
      newErrors.state = "Enter a valid state name (2–50 characters).";
    }

    if (!form.pincode.trim()) {
      newErrors.pincode = "PIN code is required.";
    } else if (!/^[1-9]\d{5}$/.test(form.pincode.trim())) {
      newErrors.pincode = "PIN code must be a valid 6-digit number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) {
      showToast("Your cart is empty.", "error");
      navigate("/products");
      return;
    }

    if (!validateForm()) {
      showToast("Please correct the highlighted fields.", "error");
      return;
    }

    const orderId = `SE${Date.now().toString().slice(-8)}`;

    const order = {
      orderId,
      customer: {
        ...form,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        phone: form.phone.trim(),
        pincode: form.pincode.trim()
      },
      items: cart,
      subtotal,
      shipping,
      total,
      orderDate: new Date().toISOString(),
      status: "Confirmed"
    };

    try {
      const previousOrders = JSON.parse(
        localStorage.getItem("shopease-orders") || "[]"
      );

      const orders = Array.isArray(previousOrders)
        ? previousOrders
        : [];

      localStorage.setItem(
        "shopease-orders",
        JSON.stringify([order, ...orders])
      );

      localStorage.setItem(
        "shopease-last-order",
        JSON.stringify(order)
      );

      localStorage.removeItem("shopease-cart");

      navigate(`/order-confirmation/${orderId}`);
    } catch {
      showToast("Unable to save your order. Please try again.", "error");
    }
  }

  if (cart.length === 0) {
    return (
      <main className="checkoutMessage">
        <h1>Your cart is empty</h1>
        <p>Add products to your cart before checking out.</p>

        <Link to="/products" className="checkoutPrimaryButton">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="checkoutPage">
      <div className="checkoutHeading">
        <p className="checkoutEyebrow">ALMOST YOURS</p>
        <h1>Checkout</h1>
        <p>Enter your details to complete your order.</p>
      </div>

      <div className="checkoutLayout">
        <form
          className="checkoutForm"
          onSubmit={handleSubmit}
          noValidate
        >
          <section className="checkoutSection">
            <h2>Contact Information</h2>

            <div className="checkoutField">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                maxLength={50}
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "fullNameError" : undefined
                }
              />

              {errors.fullName && (
                <p className="fieldError" id="fullNameError">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="checkoutField">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                maxLength={100}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "emailError" : undefined
                }
              />

              {errors.email && (
                <p className="fieldError" id="emailError">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="checkoutField">
              <label htmlFor="phone">Mobile Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength={10}
                inputMode="numeric"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={
                  errors.phone ? "phoneError" : undefined
                }
              />

              {errors.phone && (
                <p className="fieldError" id="phoneError">
                  {errors.phone}
                </p>
              )}
            </div>
          </section>

          <section className="checkoutSection">
            <h2>Shipping Address</h2>

            <div className="checkoutField">
              <label htmlFor="address">
                House Number and Street Address
              </label>

              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="House number, street, locality"
                rows={3}
                maxLength={150}
                autoComplete="street-address"
                aria-invalid={Boolean(errors.address)}
                aria-describedby={
                  errors.address ? "addressError" : "addressHelp"
                }
              />

              <p className="fieldHint" id="addressHelp">
                Enter 10–150 characters.
              </p>

              {errors.address && (
                <p className="fieldError" id="addressError">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="checkoutField">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter your city"
                maxLength={50}
                autoComplete="address-level2"
                aria-invalid={Boolean(errors.city)}
                aria-describedby={
                  errors.city ? "cityError" : undefined
                }
              />

              {errors.city && (
                <p className="fieldError" id="cityError">
                  {errors.city}
                </p>
              )}
            </div>

            <div className="checkoutField">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                type="text"
                value={form.state}
                onChange={handleChange}
                placeholder="Enter your state"
                maxLength={50}
                autoComplete="address-level1"
                aria-invalid={Boolean(errors.state)}
                aria-describedby={
                  errors.state ? "stateError" : undefined
                }
              />

              {errors.state && (
                <p className="fieldError" id="stateError">
                  {errors.state}
                </p>
              )}
            </div>

            <div className="checkoutField">
              <label htmlFor="pincode">PIN Code</label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                value={form.pincode}
                onChange={handleChange}
                placeholder="6-digit PIN code"
                maxLength={6}
                inputMode="numeric"
                autoComplete="postal-code"
                aria-invalid={Boolean(errors.pincode)}
                aria-describedby={
                  errors.pincode ? "pincodeError" : undefined
                }
              />

              {errors.pincode && (
                <p className="fieldError" id="pincodeError">
                  {errors.pincode}
                </p>
              )}
            </div>
          </section>

          <button type="submit" className="placeOrderButton">
            Place Order · {formatCurrency(total)}
          </button>

          <p className="checkoutDisclaimer">
            Demo checkout only. No payment will be collected.
          </p>
        </form>

        <aside className="checkoutSummary">
          <h2>Your Order</h2>

          <div className="checkoutProducts">
            {cart.map((item) => (
              <div className="checkoutProduct" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />

                <div className="checkoutProductInfo">
                  <h3>{item.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>

                <strong>
                  {formatCurrency(
                    Number(item.price) * Number(item.quantity)
                  )}
                </strong>
              </div>
            ))}
          </div>

          <div className="checkoutSummaryRow">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="checkoutSummaryRow">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? "FREE" : formatCurrency(shipping)}
            </span>
          </div>

          {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
            <p className="shippingNote">
              Spend{" "}
              {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)}{" "}
              more to get free shipping.
            </p>
          )}

          <div className="checkoutTotal">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;