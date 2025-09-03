// src/pages/Home.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
    {Array.from({ length: 10 }).map((_, idx) => (
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
  <div className="flex flex-col items-center justify-center min-h-96 p-6">
    <div className="text-red-500 text-6xl mb-4">⚠️</div>
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
    <p className="text-gray-600 mb-4 text-center">
      Error: {message}
    </p>
    <button 
      onClick={onRetry}
      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
    >
      Try Again
    </button>
  </div>
);

// Fetch function - ✅ Fixed endpoint to match backend
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

  // ✅ Fixed empty returns to show proper components
  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;

  // ✅ Handle empty products array
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 p-6">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h2>
        <p className="text-gray-600 text-center">
          There are currently no products available. Please check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Added header section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="text-gray-600 mt-2">Discover our amazing collection of products</p>
        </div>
      </div>

      {/* ✅ Added proper grid layout */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
