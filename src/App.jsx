import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";

import { ToastProvider } from "./context/ToastContext.jsx";

import "./App.css";

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

          <Route
            path="/products/:category"
            element={<Products />}
          />

          <Route path="/wishlist" element={<EmptyPage />} />

          <Route path="/cart" element={<EmptyPage />} />

          <Route path="/profile" element={<EmptyPage />} />

          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;