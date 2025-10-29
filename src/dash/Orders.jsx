import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Nav from "./Nav";

export default function Orders() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/carts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex overflow-x-hidden min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      
      <Sidebar isOpen={isSidebarOpen} />

     
      <div className="flex-1 overflow-x-hidden">
        <Nav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

       
        <div className="p-8 flex justify-center">
          <div className="w-full max-w-6xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-wide">
              🛍️ Recent Orders
            </h2>

            {loading ? (
              <p className="text-center text-gray-200 text-lg animate-pulse">
                Loading orders...
              </p>
            ) : error ? (
              <p className="text-center text-red-400 text-lg">{error}</p>
            ) : (
              <div className="overflow-x-auto rounded-2xl">
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/20 text-gray-100 uppercase text-sm tracking-wider">
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Items</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-white/20 hover:bg-white/20 transition-all duration-300"
                      >
                        <td className="px-6 py-4 text-white font-medium">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 text-gray-200">
                          User #{order.userId}
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {new Date(order.date).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {order.products.length}
                        </td>
                        <td className="px-6 py-4">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg shadow-md hover:shadow-blue-400/40 transition-all duration-300">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

           
            <div className="flex justify-between items-center mt-8 text-gray-200">
              <p>
                Showing <span className="text-white font-semibold">1–10</span> of{" "}
                <span className="text-white font-semibold">{orders.length}</span>{" "}
                orders
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white/10 border border-white/30 text-gray-300 rounded-lg hover:bg-white/20 hover:text-white transition-all duration-300">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md hover:shadow-blue-400/40 transition-all duration-300">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
