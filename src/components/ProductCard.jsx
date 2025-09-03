// src/components/ProductCard.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* ✅ Added missing image element */}
      <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
          {product.title}
        </h3>
        
        {/* ✅ Added category if available */}
        {product.category && (
          <p className="text-sm text-gray-500 mb-2 capitalize">
            {product.category}
          </p>
        )}
        
        <p className="text-xl font-bold text-green-600 mb-4">
          ${product.price}
        </p>
        
        <button 
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
