import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserRound,
  MapPin,
  Package,
  Pencil,
  Save,
  X,
  ShoppingBag
} from "lucide-react";
import { useToast } from "../context/useToast";
import { formatCurrency } from "../utils/formatCurrency";
import "../styles/profile.css";

function getSavedData(key, fallback) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

function Profile() {
  const savedOrders = getSavedData("shopease-orders", []);
  const orders = Array.isArray(savedOrders) ? savedOrders : [];

  const lastOrder = getSavedData("shopease-last-order", null);
  const initialProfile = getSavedData("shopease-profile", null);

  const latestCustomer =
    initialProfile ||
    lastOrder?.customer ||
    orders[0]?.customer ||
    {};

  const [profile, setProfile] = useState({
    fullName: latestCustomer.fullName || "",
    email: latestCustomer.email || "",
    phone: latestCustomer.phone || "",
    address: latestCustomer.address || "",
    city: latestCustomer.city || "",
    state: latestCustomer.state || "",
    pincode: latestCustomer.pincode || ""
  });

  const [form, setForm] = useState(profile);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: ""
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!/^[A-Za-z][A-Za-z .'-]{1,48}$/.test(form.fullName.trim())) {
      newErrors.fullName =
        "Enter a valid name with at least 2 characters.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ||
      form.email.length > 100
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number.";
    }

    if (
      form.address.trim().length < 10 ||
      form.address.trim().length > 150
    ) {
      newErrors.address = "Address must contain 10–150 characters.";
    }

    if (!/^[A-Za-z][A-Za-z .'-]{1,48}$/.test(form.city.trim())) {
      newErrors.city = "Enter a valid city name.";
    }

    if (!/^[A-Za-z][A-Za-z .'-]{1,48}$/.test(form.state.trim())) {
      newErrors.state = "Enter a valid state name.";
    }

    if (!/^[1-9]\d{5}$/.test(form.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit PIN code.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function saveProfile(event) {
    event.preventDefault();

    if (!validateForm()) {
      showToast("Please correct the highlighted fields.", "error");
      return;
    }

    const updatedProfile = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      pincode: form.pincode.trim()
    };

    try {
      localStorage.setItem(
        "shopease-profile",
        JSON.stringify(updatedProfile)
      );

      setProfile(updatedProfile);
      setForm(updatedProfile);
      setEditing(false);
      setErrors({});

      showToast("Profile updated successfully!", "success");
    } catch {
      showToast("Unable to save your profile.", "error");
    }
  }

  function cancelEditing() {
    setForm(profile);
    setErrors({});
    setEditing(false);
  }

  function formatDate(date) {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter your full name",
      type: "text"
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      type: "email"
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "10-digit mobile number",
      type: "tel"
    },
    {
      name: "address",
      label: "Street Address",
      placeholder: "House number, street and locality",
      type: "text",
      full: true
    },
    {
      name: "city",
      label: "City",
      placeholder: "Enter your city",
      type: "text"
    },
    {
      name: "state",
      label: "State",
      placeholder: "Enter your state",
      type: "text"
    },
    {
      name: "pincode",
      label: "PIN Code",
      placeholder: "6-digit PIN code",
      type: "text"
    }
  ];

  return (
    <main className="profilePage">
      <section className="profileHeading">
        <div>
          <span className="profileEyebrow">YOUR ACCOUNT</span>
          <h1>My Profile</h1>
          <p>
            Manage your personal details and keep track of your orders.
          </p>
        </div>

        <div className="profileHeadingIcon">
          <UserRound size={32} />
        </div>
      </section>

      <section className="profileSummary">
        <div className="profileAvatar">
          {profile.fullName
            ? profile.fullName.trim().charAt(0).toUpperCase()
            : "U"}
        </div>

        <div className="profileSummaryInfo">
          <h2>{profile.fullName || "Welcome to ShopEase"}</h2>
          <p>
            {profile.email ||
              "Add your email address to complete your profile."}
          </p>
        </div>

        <div className="profileOrderCount">
          <Package size={20} />
          <div>
            <strong>{orders.length}</strong>
            <span>{orders.length === 1 ? "Order" : "Orders"}</span>
          </div>
        </div>
      </section>

      <section className="profileSection">
        <div className="profileSectionHeading">
          <div className="profileSectionTitle">
            <UserRound size={21} />
            <div>
              <h2>Personal Information</h2>
              <p>Your contact and delivery details</p>
            </div>
          </div>

          {!editing && (
            <button
              type="button"
              className="profileEditButton"
              onClick={() => setEditing(true)}
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={saveProfile} className="profileForm">
          <div className="profileFields">
            {fields.map((field) => (
              <div
                className={`profileField ${
                  field.full ? "profileFieldFull" : ""
                }`}
                key={field.name}
              >
                <label htmlFor={field.name}>{field.label}</label>

                {editing ? (
                  <>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={form[field.name]}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      maxLength={field.name === "address" ? 150 : 100}
                      required
                    />

                    {errors[field.name] && (
                      <span className="profileFieldError">
                        {errors[field.name]}
                      </span>
                    )}
                  </>
                ) : (
                  <div className="profileFieldValue">
                    {profile[field.name] || "Not provided"}
                  </div>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <div className="profileFormActions">
              <button
                type="button"
                className="profileCancelButton"
                onClick={cancelEditing}
              >
                <X size={17} />
                Cancel
              </button>

              <button type="submit" className="profileSaveButton">
                <Save size={17} />
                Save Changes
              </button>
            </div>
          )}
        </form>
      </section>

      <section className="profileSection">
        <div className="profileSectionHeading">
          <div className="profileSectionTitle">
            <MapPin size={21} />
            <div>
              <h2>Saved Address</h2>
              <p>Your current delivery address</p>
            </div>
          </div>
        </div>

        {profile.address || profile.city || profile.pincode ? (
          <div className="profileAddressCard">
            <MapPin size={22} />

            <div>
              <strong>{profile.fullName || "Your Name"}</strong>
              <p>{profile.address || "Street address not provided"}</p>
              <p>
                {[profile.city, profile.state, profile.pincode]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <p>{profile.phone || "Phone number not provided"}</p>
            </div>
          </div>
        ) : (
          <div className="profileEmptyAddress">
            <MapPin size={28} />
            <p>No delivery address saved yet.</p>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="profileEditButton"
            >
              Add Address
            </button>
          </div>
        )}
      </section>

      <section className="profileSection">
        <div className="profileSectionHeading">
          <div className="profileSectionTitle">
            <ShoppingBag size={21} />
            <div>
              <h2>My Orders</h2>
              <p>View your previous purchases</p>
            </div>
          </div>

          <span className="profileOrdersBadge">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="profileEmptyOrders">
            <div className="profileEmptyIcon">
              <ShoppingBag size={30} />
            </div>

            <h3>No orders yet</h3>
            <p>
              Your completed orders will appear here after you place your
              first order.
            </p>

            <Link to="/products" className="profileShopButton">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="profileOrdersList">
            {orders.map((order, index) => (
              <article
                className="profileOrderCard"
                key={order.orderId || order.id || index}
              >
                <div className="profileOrderHeader">
                  <div>
                    <span className="profileOrderLabel">ORDER ID</span>
                    <h3>
                      {order.orderId ||
                        order.id ||
                        "Order details unavailable"}
                    </h3>
                    <p>{formatDate(order.orderDate)}</p>
                  </div>

                  <span className="profileOrderStatus">
                    {order.status || "Confirmed"}
                  </span>
                </div>

                <div className="profileOrderedProducts">
                  {(Array.isArray(order.items) ? order.items : []).map(
                    (item, itemIndex) => (
                      <div
                        className="profileOrderedProduct"
                        key={item.id || itemIndex}
                      >
                        <img
                          src={item.thumbnail || item.images?.[0] || ""}
                          alt={item.title || "Ordered product"}
                          loading="lazy"
                        />

                        <div className="profileOrderedProductInfo">
                          <strong>{item.title || "Product"}</strong>
                          <span>Quantity: {item.quantity || 1}</span>
                        </div>

                        <strong className="profileOrderedPrice">
                          {formatCurrency(
                            Number(item.price || 0) *
                              Number(item.quantity || 1)
                          )}
                        </strong>
                      </div>
                    )
                  )}
                </div>

                <div className="profileOrderFooter">
                  <span>Order Total</span>
                  <strong>
                    {formatCurrency(
                      Number(order.total ?? order.subtotal ?? 0)
                    )}
                  </strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;