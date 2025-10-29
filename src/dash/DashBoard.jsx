import React, { useState } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";



export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
     
      <Sidebar isOpen={isSidebarOpen} />

      
      <div className="flex-1">
        <Nav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="pt-20 p-6 text-gray-900">
          <h2 className="text-2xl font-bold">Main Content Here</h2>
        </main>
      </div>
    </div>
  );
}
