// src/pages/Home.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { FaArrowRight, FaStar, FaShoppingBag, FaTruck, FaShieldAlt, FaHeadset } from "react-icons/fa";

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 w-full">
    {Array.from({ length: 12 }).map((_, idx) => (
      <div key={idx} className="animate-pulse">
        <div className="bg-gray-300 rounded-lg h-48 mb-4"></div>
        <div className="space-y-2">
          <div className="bg-gray-300 h-4 rounded w-3/4 mx-auto"></div>
          <div className="bg-gray-300 h-4 rounded w-1/2 mx-auto"></div>
          <div className="bg-gray-300 h-8 rounded w-full"></div>
        </div>
      </div>
    ))}
  </div>
);

// Error Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-96 p-6 w-full">
    <div className="text-red-500 text-6xl mb-4">⚠️</div>
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
    <p className="text-gray-600 mb-4 text-center">Error: {message}</p>
    <button 
      onClick={onRetry}
      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
    >
      Try Again
    </button>
  </div>
);

// Hero Section Component
const HeroSection = () => (
  <div className="relative w-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    <div className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-none">
        <div className="space-y-6 lg:space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Discover Amazing
              <span className="block text-yellow-400">Products</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-2xl">
              Shop the latest technology, fashion, and lifestyle products with unbeatable prices and quality.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105 text-center"
            >
              Shop Now
              <FaArrowRight className="ml-2" />
            </Link>
            <Link
              to="/add-product"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-200 text-center"
            >
              Sell Products
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-6 lg:pt-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold">1M+</div>
              <div className="text-blue-200 text-xs sm:text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold">50k+</div>
              <div className="text-blue-200 text-xs sm:text-sm">Products</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => <FaStar key={i} className="text-sm sm:text-base" />)}
              </div>
              <div className="text-blue-200 text-xs sm:text-sm">5-Star Reviews</div>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-3xl opacity-20"></div>
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&auto=format"
              alt="Shopping Experience"
              className="relative rounded-2xl shadow-2xl w-full h-80 lg:h-96 xl:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Features Section Component
const FeaturesSection = () => (
  <div className="py-12 sm:py-16 bg-gray-50 w-full">
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-none">
        <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
            <FaTruck className="text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Shipping</h3>
          <p className="text-gray-600">Free delivery on orders over $50. Fast and reliable shipping worldwide.</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
            <FaShieldAlt className="text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payment</h3>
          <p className="text-gray-600">Your payment information is safe with our encrypted checkout process.</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
            <FaHeadset className="text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
          <p className="text-gray-600">Our customer support team is here to help you anytime, anywhere.</p>
        </div>
      </div>
    </div>
  </div>
);

// Categories Section Component
const CategoriesSection = () => {
  const categories = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=400&fit=crop",
      count: "2,500+ products"
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=400&fit=crop",
      count: "1,800+ products"
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=400&fit=crop",
      count: "1,200+ products"
    },
    {
      name: "Laptops",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop",
      count: "800+ products"
    }
  ];

  return (
    <div className="py-12 sm:py-16 bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg sm:text-xl text-gray-600">Explore our wide range of product categories</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-gray-100 h-64 sm:h-72 lg:h-80">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200">{category.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Fetch function
const fetchProducts = async () => {
  const res = await fetch("http://localhost:5000/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

const Home = () => {
  const { data: products, error, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section - Full Width */}
      <HeroSection />
      
      {/* Features Section - Full Width */}
      <FeaturesSection />
      
      {/* Categories Section - Full Width */}
      <CategoriesSection />
      
      {/* Featured Products Section - Full Width */}
      <div className="py-12 sm:py-16 bg-gray-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg sm:text-xl text-gray-600">Discover our best-selling and newest arrivals</p>
          </div>
          
          {isLoading && (
            <div className="mb-8 w-full">
              <LoadingSkeleton />
            </div>
          )}
          
          {error && <ErrorMessage message={error.message} onRetry={refetch} />}
          
          {products && products.length === 0 && (
            <div className="text-center py-16 w-full">
              <FaShoppingBag className="mx-auto text-6xl text-gray-300 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Products Available</h3>
              <p className="text-gray-500 mb-6">Be the first to add products to our store!</p>
              <Link
                to="/add-product"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add First Product
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          )}
          
          {products && products.length > 0 && (
            <>
              {/* ✅ FULL WIDTH PRODUCT GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 sm:gap-6 lg:gap-8 mb-12 w-full">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <div className="text-center">
                <button className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  View All Products
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Newsletter Section - Full Width */}
      <div className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-indigo-700 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 lg:mb-8">
            Get the latest updates on new products, special offers, and exclusive deals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md lg:max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg border-0 focus:outline-none focus:ring-4 focus:ring-blue-300 text-gray-900"
            />
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
