import React from 'react'
import { useState } from 'react'
import API from '../services/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:""
    });

    const handleChange = (e) => {
        setFormData({ ...formData,[e.target.name] : e.target.value  });
    }
    const handleRegister = async(e) => {
        e.preventDefault();
        if(!formData.name || !formData.email || !formData.password){
            toast.error("Please fill all fields");
            return;
        }
        try {
            const { data } = await API.post("/auth/register", formData);
            localStorage.setItem("token", data.token);
            toast.success("Registration successful 🎉");
            navigate("/login");
            } catch (error) {
            const message = error.response?.data?.message || "Registration failed";
            toast.error(message);
            }
        };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Power up your experience ⚡
        </p>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
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
            className="bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition">
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;