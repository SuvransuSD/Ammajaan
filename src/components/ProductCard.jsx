// src/components/ProductCard.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart`);
  };

  // Fallbacks
  const getDefaultImage = (category) => {
    const defaultImages = {
      electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      laptops:   "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
      accessories:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
      fashion:   "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      shoes:     "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      default:   "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    };
    return defaultImages[category?.toLowerCase()] || defaultImages.default;
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Prepend backend origin for stored images
  const backendOrigin = "http://localhost:5000";
  const rawPath = product.image || "";
  const imageUrl = rawPath.startsWith("http")
    ? rawPath
    : `${backendOrigin}${rawPath}`;
  const imageToShow = imageError ? getDefaultImage(product.category) : imageUrl;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300 group">
      <div className="w-full h-48 mb-4 overflow-hidden rounded-md bg-gray-100 relative">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        <img
          src={imageToShow}
          alt={product.title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />

        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400">
              <svg
                className="mx-auto h-12 w-12 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs">No Image</span>
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2 min-h-[3rem] flex items-center justify-center">
          {product.title}
        </h3>

        {product.category && (
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mb-3 capitalize">
            {product.category}
          </span>
        )}

        <p className="text-2xl font-bold text-green-600 mb-4">
          ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
