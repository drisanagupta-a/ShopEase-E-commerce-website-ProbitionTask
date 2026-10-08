import {NavLink} from "react-router-dom";
import {Heart, ShoppingBag, UserRound, Search, LayoutGrid, Headphones, Shirt, Sparkles, House} from "lucide-react";

const Navbar = () => {
  const categories = [
    {name: "All", path: "/products", icon: LayoutGrid},
    {name: "Electronics", path: "/products/electronics", icon: Headphones},
    {name: "Fashion", path: "/products/fashion", icon: Shirt},
    {name: "Beauty", path: "/products/beauty", icon: Sparkles},
    {name: "Home & Living", path: "/products/home-living", icon: House}
  ];

  return (
    <header className="siteHeader">
      <div className="mainNav">
        <NavLink to="/" className="brandLogo">
          SHOP EASE
        </NavLink>

        <nav className="mainLinks">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/products">New In</NavLink>
          <a href="#about">About</a>
        </nav>

        <div className="navActions">
          <NavLink to="/products" aria-label="Search">
            <Search size={19}/>
          </NavLink>

          <NavLink to="/wishlist" aria-label="Wishlist">
            <Heart size={19}/>
          </NavLink>

          <NavLink to="/cart" aria-label="Cart">
            <ShoppingBag size={19}/>
          </NavLink>

          <NavLink to="/profile" aria-label="Profile">
            <UserRound size={19}/>
          </NavLink>
        </div>
      </div>

      <div className="categoryNav">
        <div className="categoryList">
          {categories.map(({name, path, icon: Icon}) => (
            <NavLink
              key={name}
              to={path}
              className={({isActive}) =>
                `categoryItem ${isActive ? "activeCategory" : ""}`
              }
            >
              <Icon size={21} strokeWidth={1.6}/>
              <span>{name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;