import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { UserContext } from "../dash/createContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  
  useEffect(() => {
    const savedProfile = localStorage.getItem("profileData");
    if (savedProfile) {
      setUserData(JSON.parse(savedProfile));
    }
  }, [setUserData]);

  
  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = { ...userData, photo: reader.result };
        setUserData(updated);
        localStorage.setItem("profileData", JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(userData));
    setIsEditing(false);
  };

  return (
    <div className="flex">
      
      <Sidebar isOpen={isSidebarOpen} />

    
      <div className="flex-1 bg-gradient-to-br from-gray-100 via-blue-50 to-white min-h-screen">
        <Nav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="pt-24 px-6 md:px-10 flex flex-col items-center">
        
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-10 w-full max-w-3xl transition-all hover:shadow-blue-200"
          >
            
            <div className="flex flex-col items-center mb-8 relative">
              <div className="relative group">
                <img
                  className="rounded-full w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 object-cover border-4 border-blue-600 shadow-xl transition-transform duration-300 group-hover:scale-110"
                  src={userData?.photo || "https://via.placeholder.com/150"}
                  alt="Profile"
                />

                <label
                  htmlFor="profilePicInput"
                  className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full cursor-pointer shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Change
                </label>
                <input
                  id="profilePicInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mt-4">
                {userData?.firstName || "First Name"}{" "}
                {userData?.lastName || "Last Name"}
              </h2>
              <p className="text-gray-600">{userData?.position || "Developer"}</p>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700">
              <div>
                <p className="font-medium text-gray-500">Email</p>
                <p className="text-lg">{userData?.email || "—"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Phone</p>
                <p className="text-lg">{userData?.phone || "—"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Date of Birth</p>
                <p className="text-lg">{userData?.birthDate || "—"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Location</p>
                <p className="text-lg">{userData?.location || "—"}</p>
              </div>
            </div>

            
            <hr className="my-8 border-gray-200" />

            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all"
              >
                Edit Profile
              </button>

            </div>
          </motion.div>
        </main>

       
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-lg"
              >
                <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
                  Edit Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={userData?.firstName || ""}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={userData?.lastName || ""}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userData?.email || ""}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={userData?.phone || ""}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2"
                  />
                  <input
                    type="text"
                    name="birthDate"
                    placeholder="Date of Birth"
                    value={userData?.birthDate || ""}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={userData?.location || ""}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2"
                  />
                  <input
                    type="text"
                    name="position"
                    placeholder="Position"
                    value={userData?.position || ""}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 md:col-span-2"
                  />
                </div>

                <div className="flex justify-end mt-6 space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
