import AdminTable from "@/app/components/admin/AdminTable";
import AuctionAnalytics from "@/app/components/admin/Chart";
import Link from "next/link";

const AdminDashboard = () => {
  const sampleData = [
    { id: 1, name: "Toyota Camry", bidCount: 10, status: "Pending" },
    { id: 2, name: "Honda Civic", bidCount: 6, status: "Approved" },
    { id: 3, name: "Tesla Model 3", bidCount: 15, status: "Rejected" },
  ];

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
          <AdminTable data={sampleData} />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Auction Analytics
          </h2>
          <AuctionAnalytics />
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
