import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Checkout</h1>
      <p className="text-gray-600 mb-8">This is a placeholder for the checkout page.</p>
      <Link
        to="/"
        className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Checkout;