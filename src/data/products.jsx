import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img src={product.image} alt={product.title} className="h-40 w-full object-contain" />
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-gray-500">{product.category}</p>
          <p className="font-semibold">${product.price}</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
 