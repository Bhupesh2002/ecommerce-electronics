import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/Productcard";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
        setTimeout(() => {
        setLoading(false);
      }, 2000);
      } catch (error) {
        setLoading(false);
        let message;
        if(error.response){
          message = error.response.data.message;
        }
        else if (error.request){
          message = "Server not reachable";
        }
        else{
          message = "Something went wrong"
        }
        toast.error(`⚠️ ${message}`);
      }
    };
    fetchProducts();
  }, []);

  return (
  <div className="max-w-7xl mx-auto p-6">
    
    <h1 className="text-3xl font-bold mb-6 text-gray-800">
      Latest Electronics
    </h1>

    {loading ? (
      <Loader />
    ) : products.length === 0 ? (
      <p className="text-center text-gray-500 mt-10 h-100">
        No products available
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    )}

  </div>
);
};

export default Home;