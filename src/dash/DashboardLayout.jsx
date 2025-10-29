
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Nav from "./Nav";

export default function DashboardLayout() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Nav />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
