import React, { useState } from "react";
import axios from "axios";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [toast, setToast] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToast({ type: "success", message: "Login successful! Redirecting..." });
        setTimeout(() => navigate("/"), 1500);
      } else {
        setToast({ type: "error", message: response.data.message });
      }
    } catch (error) {
      setToast({ type: "error", message: "Invalid credentials" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden w-[900px] h-[520px]">
        
        {/* Left Blue Section */}
        <div className="w-1/2 bg-blue-600 flex flex-col justify-center items-center text-white p-10">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Welcome Back!
          </h2>
          <p className="text-center text-blue-100 text-sm leading-relaxed">
            Manage your shop efficiently and stay connected with your customers.
            Access your ShopAdmin dashboard today.
          </p>
          <div className="mt-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/869/869636.png"
              alt="Login Illustration"
              className="w-40 h-40"
            />
          </div>
        </div>

        {/* Right White Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
            Login
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Access your e-commerce management dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              placeholder="Email Address"
              type="email"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
            >
              <FaTelegramPlane className="text-lg" /> Login
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 hover:bg-gray-100 py-2 rounded-lg flex items-center justify-center gap-2 text-gray-700 font-medium transition-all duration-300"
            >
              <FcGoogle className="text-xl" /> Continue with Google
            </button>
          </form>

          {toast && (
            <div className="fixed top-4 right-4">
              <Toast>
                {toast.type === "success" ? (
                  <HiCheck className="h-5 w-5 text-green-500" />
                ) : (
                  <HiExclamation className="h-5 w-5 text-red-500" />
                )}
                <div className="pl-4 text-sm">{toast.message}</div>
              </Toast>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
