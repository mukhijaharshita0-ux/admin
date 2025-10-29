import React, { useState, useContext, useEffect } from "react";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";
import { FaTelegramPlane } from "react-icons/fa";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { UserContext } from "../dash/createContext";

function Forms() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { setUserData } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    birthDate: "",
    phone: "",
  });

  const [toast, setToast] = useState({ type: "", message: "" });

 
  useEffect(() => {
    const savedProfile = localStorage.getItem("profileData");
    if (savedProfile) {
      const parsedData = JSON.parse(savedProfile);
      setFormData(parsedData);
      setUserData(parsedData);
    }
  }, [setUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { firstName, lastName, email, position, birthDate, phone } = formData;

    if (!firstName || !lastName || !email || !position || !birthDate || !phone) {
      return "All fields are required!";
    }

    const nameRegex = /^[A-Za-z]{2,}$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return "Name must contain only letters and be at least 2 characters long.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return "Phone number must be 10 digits.";
    }

    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)\d\d$/;
    if (!dobRegex.test(birthDate)) {
      return "Enter DOB in DD-MM-YYYY or DD/MM/YYYY format.";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setToast({ type: "error", message: validationError });
      return;
    }

   
    setUserData(formData);
    localStorage.setItem("profileData", JSON.stringify(formData));

    setToast({ type: "success", message: "Profile data saved successfully!" });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-800 via-blue-700 to-purple-800 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Nav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex justify-center items-center flex-1 px-6 md:px-10 overflow-hidden">
          <div className="w-full max-w-4xl backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 md:p-10 relative">

            {toast.message && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
                <Toast
                  className={`shadow-lg ${
                    toast.type === "error" ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  {toast.type === "error" ? (
                    <HiExclamation className="h-5 w-5 text-red-600" />
                  ) : (
                    <HiCheck className="h-5 w-5 text-green-600" />
                  )}
                  <div className="ml-3 text-sm font-medium text-gray-800">
                    {toast.message}
                  </div>
                </Toast>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-8 text-base sm:text-lg"
            >
              <h2 className="text-white text-2xl sm:text-3xl font-semibold text-center mb-6">
                Register Your Profile
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block mb-2 text-base font-medium text-white">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-base font-medium text-white">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-base font-medium text-white">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-base font-medium text-white">
                    MOBILE
                  </label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Enter your mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-base font-medium text-white">
                    DATE OF BIRTH
                  </label>
                  <input
                    type="text"
                    name="birthDate"
                    placeholder="DD-MM-YYYY"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-base font-medium text-white">
                    POSITION
                  </label>
                  <input
                    type="text"
                    name="position"
                    placeholder="Enter your position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-lg rounded-lg border border-white/30 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-blue-300 flex items-center justify-center space-x-2"
                >
                  <FaTelegramPlane className="text-white text-xl" />
                  <span>Register</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forms;
