import { useContext, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../context/authContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthProvider);
  const [formData, setFormData] = useState({
    email:"",
    password:"",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name] :e.target.value });
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const { data } = await API.post("/auth/login", formData);
      login(data.token);
      toast.success("Login successful 🎉");
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    }   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to continue your shopping
        </p>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            name="email"
            onChange={handleChange} />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border p-2.5 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                name="password"
                onChange={handleChange}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition duration-200">
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-5 text-gray-600">
          New user?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </div>
    </div>
  )
};

export default Login;