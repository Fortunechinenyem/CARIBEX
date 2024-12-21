import React from "react";
import { FaUsers, FaCar, FaChartBar } from "react-icons/fa"; // Icons for sections

const AdminDashboard = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative container mx-auto text-white py-16">
        <h1 className="text-4xl font-semibold text-center mb-8">
          Admin Dashboard
        </h1>
        <p className="text-xl text-center mb-12">
          Manage and monitor the Car Auction Platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 text-center">
            <FaUsers className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold">Manage Users</h3>
            <p className="mb-4">
              View and manage registered users on the platform.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md">
              Manage Users
            </button>
          </div>

          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 text-center">
            <FaCar className="text-4xl text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold">Manage Cars</h3>
            <p className="mb-4">View and manage car listings for auctions.</p>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow-md">
              Manage Cars
            </button>
          </div>

          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 text-center">
            <FaChartBar className="text-4xl text-yellow-600 mb-4" />
            <h3 className="text-2xl font-semibold">View Reports</h3>
            <p className="mb-4">
              Monitor sales and activity reports on the platform.
            </p>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-6 rounded-lg shadow-md">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
