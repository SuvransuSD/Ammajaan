import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const items = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🛒 Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="flex justify-between items-center border p-4 rounded mb-3 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:5000/images/${item.image}`}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-600">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>

            <div className="flex gap-3">
              <button
                onClick={() => dispatch(clearCart())}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
              >
                Clear Cart
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
