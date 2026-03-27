import { Link, useNavigate } from "react-router-dom";


const Productcard = ({ product }) => {

  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl hover:scale-105 transform shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}    
          className="w-full h-52 object-cover"
        />  
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-500">
            {product.name}
          </h2>
        </Link>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="text-xl font-bold text-blue-600 mt-2">
          ₹{product.price}
        </p>
        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={ ()=> navigate(`/product/${product._id}`)}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default Productcard;