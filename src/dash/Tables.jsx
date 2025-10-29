import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

export default function Tables() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex overflow-x-hidden">
     
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex-1 overflow-x-hidden">
        <Nav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="pt-20 p-6 text-gray-900 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 min-h-screen flex justify-center">
          
          <div className="relative shadow-2xl sm:rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 p-8 mt-16 w-[90%] md:w-[80%] lg:w-[70%] overflow-x-auto">
            <h1 className="text-2xl font-bold text-white mb-6 tracking-wide text-center">
              🛍️ E-Commerce Products
            </h1>

           
            {loading ? (
              <p className="text-gray-200 text-center text-xl py-10 animate-pulse">
                Loading products...
              </p>
            ) : error ? (
              <p className="text-red-400 text-center text-xl py-10">{error}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm md:text-base text-left text-gray-100">
                  <thead className="uppercase bg-white/10 text-gray-100 border-b border-white/30 text-base">
                    <tr>
                      <th className="p-3">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-5 h-5 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </th>
                      <th className="px-4 py-3">Product Name</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Rating</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, index) => (
                      <tr
                        key={item.id}
                        className="bg-white/10 border-b border-white/20 hover:bg-white/20 transition-all duration-300"
                      >
                        <td className="p-3">
                          <input
                            id={`checkbox-${index}`}
                            type="checkbox"
                            className="w-5 h-5 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-white">
                          {item.title}
                        </td>
                        <td className="px-4 py-3 capitalize">{item.category}</td>
                        <td className="px-4 py-3">${item.price}</td>
                        <td className="px-4 py-3">{item.rating?.rate ?? "N/A"}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelectedProduct(item)}
                            className="font-medium text-blue-400 hover:text-blue-300 hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

           
            <nav
              className="flex items-center justify-between pt-8"
              aria-label="Table navigation"
            >
              <span className="text-base md:text-lg font-normal text-gray-300">
                Showing <span className="font-semibold text-white">1–10</span> of{" "}
                <span className="font-semibold text-white">{products.length}</span>
              </span>

              <ul className="flex items-center justify-center gap-2 mt-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg p-2 md:p-3">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 md:px-4 h-9 md:h-10 text-gray-200 bg-white/10 border border-white/30 rounded-lg hover:bg-white/20 hover:text-white transition-all duration-300"
                  >
                    Previous
                  </a>
                </li>
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n}>
                    <a
                      href="#"
                      className={`flex items-center justify-center px-3 md:px-4 h-9 md:h-10 border border-white/30 rounded-lg transition-all duration-300 ${
                        n === 1
                          ? "text-white bg-white/25 backdrop-blur-lg shadow-md shadow-blue-400/40 scale-105"
                          : "text-gray-300 bg-white/10 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {n}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 md:px-4 h-9 md:h-10 text-gray-200 bg-white/10 border border-white/30 rounded-lg hover:bg-white/20 hover:text-white transition-all duration-300"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </main>
      </div>

      
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-2xl w-[90%] md:w-[50%] text-white shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {selectedProduct.title}
            </h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-40 h-40 object-contain mx-auto mb-4"
            />
            <p className="text-lg mb-4 text-gray-200">
              {selectedProduct.description}
            </p>
            <div className="flex justify-between text-lg mb-6">
              <span className="font-semibold text-blue-300">
                💰 Price: ${selectedProduct.price}
              </span>
              <span className="font-semibold text-yellow-300">
                ⭐ Rating: {selectedProduct.rating?.rate ?? "N/A"}
              </span>
            </div>
            <button
              onClick={() => setSelectedProduct(null)}
              className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
