import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear tokens
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");

    // Redirect to login after 2 seconds
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        You’ve been logged out successfully!
      </h1>
      <p className="text-gray-600 mb-8">
        Redirecting you to the login page...
      </p>

      <button
        onClick={() => navigate("/login", { replace: true })}
        className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200"
      >
        Go Back to Login Now
      </button>
    </div>
  );
}
