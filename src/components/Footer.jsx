const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerTop">
        <div className="footerBrand">
          <h2>SHOP EASE</h2>

          <p>
            Everyday finds for every part of life.
          </p>
        </div>

        <div className="footerLinks">
          <div>
            <h3>SHOP</h3>

            <a href="/products">All Products</a>
            <a href="/products/electronics">Electronics</a>
            <a href="/products/fashion">Fashion</a>
            <a href="/products/beauty">Beauty</a>
            <a href="/products/home-living">Home & Living</a>
          </div>

          <div>
            <h3>ACCOUNT</h3>

            <a href="/wishlist">Wishlist</a>
            <a href="/cart">Cart</a>
            <a href="/profile">Profile</a>
          </div>

          <div>
            <h3>CONNECT</h3>

            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">Email</a>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <span>© 2026 ShopEase</span>
        <span>Made for everyday shopping.</span>
      </div>
    </footer>
  );
};

export default Footer;