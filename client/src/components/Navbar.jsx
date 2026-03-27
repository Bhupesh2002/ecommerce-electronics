import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useContext } from "react";
import AuthProvider from "../context/authContext";


const Navbar = () => {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userToken, logout } = useContext(AuthProvider);

  useEffect(() => {
    const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };
  checkAuth();
  window.addEventListener("storage", checkAuth);
  return () => window.removeEventListener("storage", checkAuth);
},[]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-[#0f172a] text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-400">
        VoltNex
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {
          userToken ? (
            <>
            <Link to="/cart" className="flex items-center gap-2 hover:text-blue-400 smooth">
              <FaShoppingCart />
              <span>Cart</span>
            </Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
              Logout
            </button>
            </>
          ) : (
            <>
              <Link to="/" className="flex items-center gap-2  hover-blue-400 smooth">
              <FaHome/>
              <span>Home</span>
              </Link> 
              {/* Login */}
              <Link to="/login" className="flex items-center gap-2 hover:text-blue-400 mx-2">
                <FaUser />
                <span>Login</span>
              </Link>
              <Link to="/register" className="hover:text-blue-400">
                Register
              </Link>
            </>
          )
        }
      </div>
    </nav>
  );
};

export default Navbar;