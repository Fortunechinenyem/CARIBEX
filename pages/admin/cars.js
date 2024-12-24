import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ManageCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/api/admin/cars")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Cars:", data);
        setCars(data);
      })
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  const handleDelete = (carId) => {
    console.log(`Deleting car with ID: ${carId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Manage Cars</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border-b p-4">Car Name</th>
            <th className="border-b p-4">Auction Status</th>
            <th className="border-b p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cars) && cars.length > 0 ? (
            cars.map((car) => (
              <tr key={car._id}>
                <td className="border-b p-4">{car.name}</td>
                <td className="border-b p-4">{car.auctionStatus}</td>
                <td className="border-b p-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                  <button className="ml-4 text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border-b p-4 text-center">
                No cars available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCars;
