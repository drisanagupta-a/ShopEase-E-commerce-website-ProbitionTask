import {NavLink} from "react-router-dom";
import {MousePointer2} from "lucide-react";

const heroProducts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
    alt: "Wireless headphones",
    className: "heroProductOne"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    alt: "Red sneakers",
    className: "heroProductTwo"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=85",
    alt: "Beauty and makeup products",
    className: "heroProductThree"
  }
];

const Hero = () => {
  return (
    <section className="heroSection">
      <div className="heroContent">
        <span className="heroEyebrow">
          YOUR EVERYDAY MARKETPLACE
        </span>

        <h1 className="heroTitle">
          Everything you love.
          <span>In one place.</span>
        </h1>

        <p className="heroText">
          Shop electronics, fashion, beauty and home essentials
          without the endless searching.
        </p>

        <NavLink to="/products" className="heroButton">
          Explore products
          <MousePointer2 size={17}/>
        </NavLink>
      </div>

      <div className="heroVisual">
        <div className="heroShape heroShapeOne"></div>
        <div className="heroShape heroShapeTwo"></div>

        {heroProducts.map((product) => (
          <NavLink
            to="/products"
            className={`heroProduct ${product.className}`}
            key={product.id}
            aria-label={`Explore ${product.alt}`}
          >
            <img
              src={product.image}
              alt={product.alt}
              className="heroProductImage"
            />
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default Hero;