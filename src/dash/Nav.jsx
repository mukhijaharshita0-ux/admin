import React, { useContext, useEffect, useState } from "react";
import { BellIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../dash/createContext";
import { useNavigate } from "react-router-dom";

export default function Nav({ onToggleSidebar }) {
  const { userData } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState("https://flowbite.com/docs/images/people/profile-picture-5.jpg");
  const navigate = useNavigate();


  useEffect(() => {
    const savedProfile = localStorage.getItem("profileData");
    if (savedProfile) {
      const parsedData = JSON.parse(savedProfile);
      if (parsedData.photo) {
        setProfilePic(parsedData.photo);
      }
    }
  }, [userData]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 antialiased">
      <nav className="relative w-full bg-gradient-to-r from-[#0d47a1] via-[#1565c0] to-[#283593] border-gray-200 px-6 lg:px-10 py-5 shadow-lg overflow-hidden h-24 flex items-center">
      
        <div className="absolute inset-0 bg-white/10 opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-40 blur-md pointer-events-none"></div>

        <div className="relative flex items-center justify-between w-full">
         
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="p-1.5 text-gray-200 rounded hover:bg-blue-600/50 hover:text-white transition"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h18M3 9h18M3 15h18"
                />
              </svg>
            </button>
            <h1 className="text-white font-semibold text-3xl tracking-wide">
              Dashboard
            </h1>
          </div>

       
          <div className="hidden md:flex items-center bg-white/20 rounded-full px-5 py-3 w-1/3 focus-within:bg-white/30 transition">
            <input
              type="text"
              placeholder="Enter keywords"
              className="bg-transparent outline-none text-lg text-white placeholder-gray-200 flex-grow"
            />
            <svg
              className="w-6 h-6 text-gray-100"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.2-5.2M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          
          <div className="flex items-center gap-5">
            
            <EnvelopeIcon className="w-7 h-7 text-white opacity-90 hover:opacity-100 cursor-pointer transition-transform hover:scale-105" />
            <BellIcon className="w-7 h-7 text-white opacity-90 hover:opacity-100 cursor-pointer transition-transform hover:scale-105" />

            
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate("/profile")}
              title="Go to Profile"
            >
              <img
                src={profilePic}
                className="w-10 h-10 rounded-full border-2 border-blue-300 shadow-md transition-transform duration-300 group-hover:scale-110"
                alt="User Avatar"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
