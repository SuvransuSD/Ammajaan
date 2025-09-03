import React from "react";
import { useSelector } from "react-redux";

export default function Checkout() {
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr className="my-3" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping Form */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Shipping Details</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="City"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
