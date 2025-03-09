import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminTable from "@/app/components/admin/AdminTable";
import AuctionAnalytics from "@/app/components/admin/Chart";
import Link from "next/link";

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsCollection = collection(db, "cars");
        const carsSnapshot = await getDocs(carsCollection);
        const carsData = carsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCars(carsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to fetch car data");
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Platform Management
          </h2>
          <AdminTable
            data={cars.map((car) => ({
              id: car.id,
              name: `${car.make} ${car.model}`,
              bidCount: car.bidCount || 0,
              status: car.status || "Pending",
            }))}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Auction Analytics
          </h2>
          <AuctionAnalytics cars={cars} />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Quick Links
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/admin/cars"
            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Manage Cars
          </Link>
          <Link
            href="/admin/reports"
            className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition duration-200"
          >
            View Reports
          </Link>
          <Link
            href="/admin/users"
            className="bg-purple-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-700 transition duration-200"
          >
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
