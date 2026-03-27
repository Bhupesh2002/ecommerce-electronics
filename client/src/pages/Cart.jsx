import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await API.get("/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCart(data);
      } catch (error) {
        const message =
          error.response?.data?.message || "Failed to load cart";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
  try {
    await API.put(
      `/cart/${productId}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCart((prev) => {
      const updatedItems = prev.items.map((item) =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      );
      const totalPrice = updatedItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      return {
        ...prev,
        items: updatedItems,
        totalPrice,
      };
    });
    toast.success("Cart updated");
  } catch (error) {
    const message =
      error.response?.data?.message || "Update failed";
      console.log(error.response);
      toast.error(message);
  }
};

  const removeItem = async (productId) => {
  try {
    const { data } = await API.delete(`/cart/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCart(data);
    toast.success("Item removed");
  } catch (error) {
    const message =
      error.response?.data?.message || "Remove failed";

    toast.error(message);
  }
};

  if (loading) return <Loader />;
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart?.items?.length === 0 ? (
        <p className="text-center text-gray-500">Cart is empty</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col gap-4">
            {cart.items.map((item) => (
              <div
                key={item.product._id || item.product}  
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"/>
                <div className="flex-1">
                  <h2 className="font-semibold">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    ₹{item.product.price}
                  </p>
                </div>
                <select
                value={item.quantity}
                onChange={(e) =>
                    updateQuantity(item.product._id || item.product, Number(e.target.value))
                }
                className="border rounded px-2 py-1">
                    {[...Array(item.product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                        {x + 1}
                        </option>
                    ))}
                </select>
                <button onClick={ ()=> removeItem(item.product._id || item.product) } className="text-red-500 hover:underline">
                  Remove
                </button>
              </div>
            ))}
          </div>
          {/* RIGHT: Summary */}
          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <h2 className="text-lg font-bold mb-4">
              Order Summary
            </h2>
            <p className="mb-2">
              Total Items: {cart.items.length}
            </p>
            <p className="text-xl font-bold text-blue-600">
              ₹{cart.totalPrice}
            </p>
            <button
            onClick={() => navigate("/checkout")}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Checkout  
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;