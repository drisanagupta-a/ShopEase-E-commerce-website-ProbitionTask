import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

const Home = () => {
  return (
    <main>
      <section className="heroSection">
        <div className="heroTopLabel">
          CURATED MARKETPLACE · 2026
        </div>

        <h1 className="heroTitle">
          THE THINGS
          <br/>
          WORTH HAVING.
        </h1>

        <p className="heroText">
          Curated for your everyday.
        </p>

        <NavLink className="heroButton" to="/products">
          SHOP NOW
          <span>→</span>
        </NavLink>
      </section>

      <section className="introSection">
        <p className="sectionLabel">01 / SHOP EASE</p>

        <h2>
          A CURATED
          <br/>
          EVERYDAY.
        </h2>

        <p className="introText">
          Discover things worth bringing into your everyday life.
          From technology and fashion to beauty and home,
          everything is selected with intention.
        </p>
      </section>
    </main>
  );
};

const Products = () => {
  return (
    <main className="placeholderPage">
      <h1>SHOP</h1>
      <p>Products coming next.</p>
    </main>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:category" element={<Products/>}/>
        <Route path="/wishlist" element={<div/>}/>
        <Route path="/cart" element={<div/>}/>
        <Route path="/profile" element={<div/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;