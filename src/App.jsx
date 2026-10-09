import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";

const Products = () => {
  return (
    <main className="placeholderPage">
      <span className="sectionLabel">SHOP EASE</span>
      <h1>SHOP</h1>
      <p>Products will be displayed here.</p>
    </main>
  );
};

const EmptyPage = () => {
  return (
    <main className="placeholderPage">
      <h1>COMING SOON</h1>
    </main>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/wishlist" element={<EmptyPage />} />
        <Route path="/cart" element={<EmptyPage />} />
        <Route path="/profile" element={<EmptyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;