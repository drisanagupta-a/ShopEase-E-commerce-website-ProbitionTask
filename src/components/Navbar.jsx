import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import {
  Heart,
  ShoppingBag,
  UserRound,
  Search,
  LayoutGrid,
  Headphones,
  Shirt
} from "lucide-react";

const CompactIcon = ({ size = 21, strokeWidth = 1.8 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h16v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5Z" />
      <path d="M4 12a8 8 0 0 1 16 0" />
      <circle cx="12" cy="7" r="3.2" />
      <path d="M9 17h6" />
    </svg>
  );
};

const Navbar = () => {
  const { user } = useAuth();

  const categories = [
    {
      name: "All",
      path: "/products",
      icon: LayoutGrid
    },
    {
      name: "Electronics",
      path: "/products/electronics",
      icon: Headphones
    },
    {
      name: "Fashion",
      path: "/products/fashion",
      icon: Shirt
    },
    {
      name: "Beauty",
      path: "/products/beauty",
      icon: CompactIcon
    },
    {
      name: "Home & Living",
      path: "/products/home-living",
      icon: ({ size = 21, strokeWidth = 1.8 }) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v12h14V9" />
          <path d="M9 21v-8h6v8" />
        </svg>
      )
    }
  ];

  return (
    <header className="siteHeader">
      <div className="mainNav">
        <NavLink to="/" className="brandLogo">
          SHOP EASE
        </NavLink>

        <nav className="mainLinks" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/products">New In</NavLink>
          <a href="/#about">About</a>
        </nav>

        <div className="navActions">
          <NavLink
            to="/products"
            aria-label="Search products"
            title="Search"
          >
            <Search size={21} />
          </NavLink>

          <NavLink
            to="/wishlist"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart size={21} />
          </NavLink>

          <NavLink
            to="/cart"
            aria-label="Shopping cart"
            title="Cart"
          >
            <ShoppingBag size={21} />
          </NavLink>

          {!user ? (
            <NavLink to="/login" className="navSignIn">
              Sign In
            </NavLink>
          ) : (
            <span className="navWelcome">
              Hi, {user.name.split(" ")[0]}
            </span>
          )}

          <NavLink
            to="/profile"
            className="navProfileLink"
            aria-label="My profile"
            title="My Profile"
          >
            <UserRound size={21} />
          </NavLink>
        </div>
      </div>

      <nav className="categoryNav" aria-label="Product categories">
        <div className="categoryList">
          {categories.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              end={path === "/products"}
              className={({ isActive }) =>
                `categoryItem ${isActive ? "activeCategory" : ""}`
              }
            >
              <span className="categoryIcon">
                <Icon size={23} strokeWidth={1.8} />
              </span>

              <span>{name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;