import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const ProductDetails = () => {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        const message =
          error.response?.data?.message || "Failed to load product";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
        toast.error("Please login first");
        return;
    }
    try {
        await API.post("/cart",{
            productId: product._id,
            quantity: qty,
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    toast.success(`Added ${qty} item(s) to cart`);
    } catch (error) {
        const message = error.response?.data?.message || "Failed to add to cart";
        toast.error(`${message}`);
    }
  };
  if (loading) return <Loader />;
  if (!product) {
    return (
      <p className="text-center mt-10 text-red-500">
        Product not found
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
        
        <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow-md">
        
        {/* LEFT: IMAGE */}
        <div className="flex justify-center items-center">
            <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[400px] object-contain rounded-lg"
            />
        </div>
        <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-gray-800">
            {product.name}
            </h2>
            <p className="text-gray-500 text-sm">
            Brand: <span className="font-medium">{product.brand}</span>
            </p>
            <p className="text-3xl font-bold text-blue-600">
            ₹{product.price}
            </p>
            <span
            className={`w-fit px-3 py-1 text-sm rounded-full ${
                product.countInStock > 0    
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}>
            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
            <p className="text-gray-600 leading-relaxed">
            {product.description}
            </p>
            <div className="flex items-center gap-3 mt-2">
            <span className="font-medium">Qty:</span>
            <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="border rounded px-2 py-1">
                {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                    {x + 1}
                    </option>
                ))}
                </select>
            </div>
            <div className="flex gap-5">
              <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className="mt-4 bg-blue-600 w-50 text-white py-3 rounded-lg hover:bg-blue-700 scale-105 transform transition disabled:bg-gray-400 font-medium"
              >Add to Cart
              </button>
              <button onClick={()=> navigate("/")} 
              className="mt-4 bg-red-600 w-50 text-white rounded-lg hover:bg-red-700 scale-105 transform transition py-3">Back</button>
            </div>
            </div>
        </div>
    </div>
    );
};

export default ProductDetails;