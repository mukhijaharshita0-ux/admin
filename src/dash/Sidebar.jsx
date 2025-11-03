import React from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import TableChartIcon from "@mui/icons-material/TableChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Face6Icon from "@mui/icons-material/Face6";
import LoginIcon from "@mui/icons-material/Login";
import MessageIcon from '@mui/icons-material/Message';
import HowToRegIcon from "@mui/icons-material/HowToReg";
import "../App.css";

export default function Sidebar({ isOpen }) {
  const location = useLocation();
  const navigate=useNavigate();


 const navItems = [
  { link: "/", name: "Dashboard", icon: <InsertChartIcon fontSize="inherit" /> },
  { link: "/forms", name: "Forms", icon: <FormatAlignJustifyIcon fontSize="inherit" /> },
  { link: "/tables", name: "Stock", icon: <TableChartIcon fontSize="inherit" /> },
  { link: "/message", name: "Message", icon: <MessageIcon fontSize="inherit" /> },
  { link: "/orders", name: "Orders", icon: <CalendarMonthIcon fontSize="inherit" />, badge: "New" },
  { link: "/profile", name: "Profile", icon: <Face6Icon fontSize="inherit" /> },
  { link: "/logout", name: "Logout", icon: <LoginIcon fontSize="inherit" /> },
 
];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen text-gray-200 shadow-xl bg-gradient-to-b from-[#001f3f] via-[#023c7b] to-[#046b99] transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col justify-between">

        <div className="flex items-center justify-center h-24 border-b border-gray-700 bg-gradient-to-r from-[#023c7b] to-[#046b99] shadow-inner">
          <h1 className="text-4xl font-extrabold text-white tracking-wider">
            DASH<span className="text-cyan-300">TREME</span>
          </h1>
        </div>

        
        <div className="overflow-y-auto flex-1">
          <div className="px-6 mt-10 mb-4 text-gray-300 text-lg uppercase tracking-widest font-bold">
            Main Navigation
          </div>

          <nav className="px-4 space-y-3 overflow-hidden">
            {navItems.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className={`group flex items-center justify-between px-5 py-3 text-xl font-semibold rounded-md transition-all duration-300 ${
                  location.pathname === item.link
                    ? "bg-gradient-to-r from-[#00bcd4] to-[#0288d1] text-white shadow-md shadow-cyan-400/30"
                    : "text-gray-100 hover:bg-gradient-to-r hover:from-[#00bcd4] hover:to-[#0288d1] hover:text-white hover:shadow-md hover:shadow-cyan-400/30"
                }`}
              >
                <div className="flex items-center gap-5">
                  <span className="text-3xl text-gray-300 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </span>
                  <span className="text-gray-200 group-hover:text-white transition-all duration-300">
                    {item.name}
                  </span>
                </div>

              
                {item.badge && (
                  <span className="text-xs bg-white text-[#0079d6] font-bold px-2 py-[1px] rounded-full shadow-md">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        
        <div className="text-center text-xs text-gray-400 mb-4 border-t border-gray-700 pt-3">
          © 2025 Dashtreme Clone
        </div>
      </div>
    </aside>
  );
}
