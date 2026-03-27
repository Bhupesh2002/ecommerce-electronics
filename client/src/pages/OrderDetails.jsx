import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrder(data);
      } catch (error) {
        const message =
          error.response?.data?.message || "Failed to load order";

        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <Loader />;

  if (!order) {
    return (
      <p className="text-center text-red-500 mt-10">
        Order not found
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Order Details
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow flex flex-col gap-4">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Name:</strong> {order.user?.name}
          </p>
          <p>
            <strong>Email:</strong> {order.user?.email}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode},{" "}
            {order.shippingAddress.country}
          </p>
          <p>
            <strong>Payment:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {order.isPaid ? (
              <span className="text-green-600 font-medium">
                Paid
              </span>
            ) : (
              <span className="text-red-500 font-medium">
                Not Paid
              </span>
            )}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">
            Order Items
          </h2>
          {order.orderItems.map((item) => (
            <div
              key={item.product}
              className="flex justify-between mb-2">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <hr className="my-3" />
          <p className="text-xl font-bold text-blue-600">
            Total: ₹{order.totalPrice}
          </p>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;