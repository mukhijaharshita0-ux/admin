import React, { useState } from "react";
import axios from "axios";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";
import { FaTelegramPlane } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Sign() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setToast({ type: "error", message: "Passwords do not match" });
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/sign`, formData);
      // await axios.post("http://localhost:5000/api/auth/signup", formData);

      if (response.data.success) {
        setToast({ type: "success", message: "Account created successfully!" });
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      setToast({ type: "error", message: error.response?.data?.message || "Error creating account" });
    }
  };

  // ✅ Google Login Logic
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const decoded = jwtDecode(tokenResponse.credential);
        console.log("Google User Info:", decoded);
        setToast({ type: "success", message: `Welcome ${decoded.name}!` });
      } catch (err) {
        console.error("Decoding error:", err);
      }
    },
    onError: () => {
      setToast({ type: "error", message: "Google Sign-in failed." });
    },
  });

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="flex w-[70%] max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Left Section */}
          <div className="w-1/2 bg-blue-600 flex flex-col justify-center items-center text-white p-10">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Create your account <br /> and start managing smarter!
            </h2>
            <p className="text-center text-blue-100 mb-8">
              Join the ShopAdmin platform and simplify your e-commerce management today.
            </p>
            <div className="bg-blue-500 p-6 rounded-2xl">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
                alt="cart"
                className="w-32 h-32"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-1/2 p-10">
            <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
            <p className="text-center text-gray-500 mb-6 text-sm">
              Get started with your e-commerce dashboard
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <div className="flex gap-2">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                <FaTelegramPlane /> Sign Up
              </button>

              {/* Continue with Google */}
              <button
                type="button"
                onClick={() => googleLogin()}
                className="w-full flex items-center justify-center gap-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                <FcGoogle className="bg-white rounded-full p-[2px] text-2xl" />
                Continue with Google
              </button>
            </form>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed top-4 right-4">
            <Toast>
              {toast.type === "success" ? (
                <HiCheck className="h-5 w-5 text-green-500" />
              ) : (
                <HiExclamation className="h-5 w-5 text-red-500" />
              )}
              <div className="pl-4 text-sm font-medium">{toast.message}</div>
            </Toast>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}
