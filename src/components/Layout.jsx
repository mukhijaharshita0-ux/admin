import React, { useState } from "react";
import Sidebar from "../dash/Sidebar"; // ✅ correct path
import Nav from "../dash/Nav";         // ✅ correct path
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 transition-all duration-300">
        <Nav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="pt-24 px-8 text-white">
          {/* This renders nested components */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
