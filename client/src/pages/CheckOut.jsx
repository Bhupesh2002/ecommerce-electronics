import { useState, useEffect } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await API.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCart(data);
      } catch (error) {
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    if (!address || !city || !postalCode || !country) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { data } = await API.post(
        "/orders",
        {
          shippingAddress: {
            address,
            city,
            postalCode,
            country,
          },
          paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Order placed successfully 🎉");

      navigate(`/order/${data._id}`);
    } catch (error) {
      const message =
        error.response?.data?.message || "Order failed";

      toast.error(message);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      
      {/* LEFT: FORM */}
      <div className="bg-white p-6 rounded-lg shadow flex flex-col gap-4">
        <h2 className="text-xl font-bold">Shipping Details</h2>

        <input
          type="text"
          placeholder="Address"
          className="border p-2 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="City"
          className="border p-2 rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          type="text"
          placeholder="Postal Code"
          className="border p-2 rounded"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <input
          type="text"
          placeholder="Country"
          className="border p-2 rounded"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        {/* Payment */}
        <select
          className="border p-2 rounded"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
        </select>

        <button
          onClick={handlePlaceOrder}
          className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>

      {/* RIGHT: SUMMARY */}
      <div className="bg-white p-6 rounded-lg shadow h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {cart.items.map((item) => (
          <div key={item.product._id} className="flex justify-between mb-2">
            <span>{item.product.name} x {item.quantity}</span>
            <span>₹{item.product.price * item.quantity}</span>
          </div>
        ))}

        <hr className="my-3" />

        <p className="text-xl font-bold text-blue-600">
          Total: ₹{cart.totalPrice}
        </p>
      </div>

    </div>
  );
};

export default CheckOut;