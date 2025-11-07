import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";

export default function Message() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  return (
    <div className="flex overflow-x-hidden min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden p-8">
        <Nav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Centered Section */}
        <div className="flex flex-col justify-center items-center mt-32 space-y-6">
          <h1 className="text-3xl font-bold tracking-wide text-white drop-shadow-lg">
            Welcome to the Dashboard
          </h1>
          <p className="text-gray-200 text-center max-w-md">
            Manage your messages and stay connected with your team.  
            Click below to log in or access your account.
          </p>

          <Button
            color="blue"
            className="px-8 py-3 text-lg font-semibold rounded-xl shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 bg-blue-600 hover:bg-blue-700"
            onClick={() => setOpenModal(true)}
          >
            🚀 Open Login Modal
          </Button>
        </div>

        {/* Flowbite Modal */}
        <Modal show={openModal} size="md" popup onClose={onCloseModal}>
          <ModalHeader className="bg-blue-600 text-white text-center">
            Login Portal
          </ModalHeader>
          <ModalBody className="bg-white rounded-b-lg p-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                Sign in to your account
              </h3>

              {/* Email */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your Email" />
                </div>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your Password" />
                </div>
                <TextInput id="password" type="password" required />
              </div>

              {/* Remember Me + Forgot Password */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <a
                  href="#"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <div className="w-full">
                <Button
                  color="blue"
                  className="w-full py-2 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-all duration-200"
                >
                  Log In
                </Button>
              </div>

              {/* Footer */}
              <div className="text-center text-gray-600 text-sm">
                Not registered?&nbsp;
                <a
                  href="#"
                  className="text-blue-700 hover:underline font-medium"
                >
                  Create account
                </a>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
