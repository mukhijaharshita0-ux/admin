import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./dash/Nav";
import Sidebar from "./dash/Sidebar";
import Dashboard from "./dash/DashBoard";
import Forms from "./dash/Forms";
import Tables from "./dash/Tables";
import Orders from "./dash/Orders";
import Profile from "./dash/Profile";
import Logout from "./dash/Logout";
import Page from "./page/Login";
import Sign from "./page/Sign";
import PrivateRoute from "./PrivateRoute";
import Login from "./page/Login";

export default function App() {
  return (
    <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />

   
      <Route element={<PrivateRoute />}>
        <Route
          path="*"
          element={
            <div className="flex bg-gray-100 min-h-screen">
              <Sidebar />
              <div className="flex-1 ml-64">
                <Nav />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/forms" element={<Forms />} />
                  <Route path="/tables" element={<Tables />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/logout" element={<Logout />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
``