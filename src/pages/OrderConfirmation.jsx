import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import "../styles/orderConfirmation.css";

function OrderConfirmation() {
  const { id } = useParams();

  const [order] = useState(() => {
    try {
      const savedOrder = JSON.parse(
        localStorage.getItem("shopease-last-order") || "null"
      );

      if (savedOrder && savedOrder.orderId === id) {
        return savedOrder;
      }

      const savedOrders = JSON.parse(
        localStorage.getItem("shopease-orders") || "[]"
      );

      if (!Array.isArray(savedOrders)) return null;

      return savedOrders.find((item) => item.orderId === id) || null;
    } catch {
      return null;
    }
  });

  if (!order) {
    return (
      <main className="confirmationPage">
        <div className="confirmationCard">
          <h1>Order not found</h1>
          <p>We couldn't find the requested order details.</p>

          <Link to="/products" className="confirmationButton">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="confirmationPage">
      <section className="confirmationCard">
        <div className="confirmationCheck">✓</div>

        <p className="confirmationEyebrow">
          ORDER PLACED SUCCESSFULLY
        </p>

        <h1>Thank you for shopping with ShopEase!</h1>

        <p className="confirmationMessage">
          Your demo order has been confirmed. Here is your order summary.
        </p>

        <div className="confirmationOrderId">
          <span>ORDER ID</span>
          <strong>{order.orderId}</strong>
        </div>

        <div className="confirmationDetails">
          <h2>Delivery Details</h2>

          <p>
            <strong>{order.customer.fullName}</strong>
          </p>

          <p>{order.customer.address}</p>

          <p>
            {order.customer.city}, {order.customer.state} -{" "}
            {order.customer.pincode}
          </p>

          <p>{order.customer.email}</p>
          <p>{order.customer.phone}</p>
        </div>

        <div className="confirmationDetails">
          <h2>Order Summary</h2>

          {order.items.map((item) => (
            <div className="confirmationProduct" key={item.id}>
              <span>
                {item.title} × {item.quantity}
              </span>

              <strong>
                {formatCurrency(
                  Number(item.price) * Number(item.quantity)
                )}
              </strong>
            </div>
          ))}

          <div className="confirmationProduct">
            <span>Shipping</span>

            <strong>
              {Number(order.shipping) === 0
                ? "FREE"
                : formatCurrency(order.shipping)}
            </strong>
          </div>

          <div className="confirmationFinalTotal">
            <span>Total</span>

            <strong>{formatCurrency(order.total)}</strong>
          </div>
        </div>

        <p className="confirmationDisclaimer">
          This is a frontend demo. No payment has been collected.
        </p>

        <Link to="/products" className="confirmationButton">
          Continue Shopping
        </Link>
      </section>
    </main>
  );
}

export default OrderConfirmation;
