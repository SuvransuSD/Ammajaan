// src/pages/Home.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="products-grid">
    {Array.from({ length: 6 }).map((_, idx) => (
      <div
        key={idx}
        className="skeleton-card"
        style={{
          height: "300px",
          background: "#e0e0e0",
          borderRadius: "8px",
          animation: "pulse 1.5s infinite",
        }}
      />
    ))}
    <style>
      {`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}
    </style>
  </div>
);

// Error Component
const ErrorMessage = ({ message, onRetry }) => (
  <div style={{ textAlign: "center", marginTop: "2rem" }}>
    <p style={{ color: "red" }}>Error: {message}</p>
    <button
      onClick={onRetry}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Retry
    </button>
  </div>
);

// Fetch function
const fetchProducts = async () => {
  const res = await fetch("http://localhost:5000/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

const Home = () => {
  const { data: products, error, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;
