import { useSelector } from 'react-redux';

export default function Invoice() {
  const items = useSelector(state => state.cart.items);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0); // ✅ FIXED: Changed i.qty to i.quantity
  const orderId = "ORD-" + Math.floor(Math.random() * 10000);

  return (
    <div>
      <h2>Order ID: {orderId}</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td>{i.title}</td>
              <td>{i.quantity}</td> {/* ✅ FIXED: Changed i.qty to i.quantity */}
              <td>${i.price * i.quantity}</td> {/* ✅ FIXED: Changed i.qty to i.quantity */}
            </tr>
          ))}
        </tbody>
      </table>
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
    </div>
  );
}