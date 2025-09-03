import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/AddProduct";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaHome, FaPlus, FaSearch } from "react-icons/fa";

function App() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      {/* ✅ FULL WIDTH NAVIGATION */}
      <nav className="bg-white shadow-lg border-b sticky top-0 z-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">A</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ammajaan
              </span>
            </Link>
            
            {/* ✅ FULL WIDTH SEARCH BAR */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 sm:py-3 pl-10 sm:pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
                <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base"
              >
                <FaHome />
                <span className="hidden sm:block">Home</span>
              </Link>
              
              <Link 
                to="/add-product" 
                className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base"
              >
                <FaPlus />
                <span className="hidden sm:block">Sell</span>
              </Link>
              
              <Link 
                to="/cart" 
                className="flex items-center space-x-1 sm:space-x-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 px-3 sm:px-4 py-2 rounded-lg relative text-sm sm:text-base"
              >
                <FaShoppingCart />
                <span className="hidden sm:block">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-medium">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Toast container */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          },
          success: {
            style: {
              background: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />

      {/* ✅ FULL WIDTH ROUTES CONTAINER */}
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
