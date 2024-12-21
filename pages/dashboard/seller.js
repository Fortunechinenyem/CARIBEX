import React from "react";
import { FaUpload, FaBox, FaClipboardList } from "react-icons/fa"; // Icons for sections

const SellerDashboard = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative container mx-auto text-white py-16">
        <h1 className="text-4xl font-semibold text-center mb-8">
          Seller Dashboard
        </h1>
        <p className="text-xl text-center mb-12">
          Manage your car listings and track auctions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 text-center">
            <FaUpload className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold">Upload Car</h3>
            <p className="mb-4">
              Add new cars for auction by uploading your vehicle details.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md">
              Upload Car
            </button>
          </div>

          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 text-center">
            <FaBox className="text-4xl text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold">View Listings</h3>
            <p className="mb-4">
              Keep track of your current car listings and their status.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow-md">
              View Listings
            </button>
          </div>

          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 text-center">
            <FaClipboardList className="text-4xl text-yellow-600 mb-4" />
            <h3 className="text-2xl font-semibold">Auction Progress</h3>
            <p className="mb-4">
              Monitor the progress of your cars in the auction.
            </p>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-6 rounded-lg shadow-md">
              View Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
