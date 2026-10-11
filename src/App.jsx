import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import { ToastProvider } from "./context/ToastContext.jsx";
import "./App.css";
import Wishlist from "./pages/Wishlist";

function EmptyPage() {
  return (
    <main className="placeholderPage">
      <h1>COMING SOON</h1>
      <p>This page is under development.</p>
    </main>
  );
}

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/order-confirmation/:id"
            element={<OrderConfirmation />}
          />
<Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<EmptyPage />} />
          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;