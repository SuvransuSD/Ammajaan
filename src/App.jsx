import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/AddProduct";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

function App() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <nav className="flex items-center justify-between p-4 bg-gray-200">
        {/* Left side */}
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/add-product">Add Product</Link>
        </div>

        {/* Right side - Cart with badge */}
        <div className="relative">
          <Link to="/cart" className="flex items-center">
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* ✅ Toast container */}
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
