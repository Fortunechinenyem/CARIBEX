import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Footer from "@/app/components/common/Footer";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || "User",
          role: "buyer",
        });
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome, <span className="text-blue-600">{user.name}</span>!
        </h1>
        <p className="text-lg text-gray-600">
          {user.role === "seller"
            ? "Manage your car listings and connect with buyers."
            : "Explore amazing cars and place your bids."}
        </p>
      </header>

      <div className="max-w-7xl mx-auto">
        {user.role === "seller" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Upload a New Car
              </h2>
              <p className="text-gray-600 mb-4">
                List your car for auction and reach potential buyers.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                Upload Car
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Manage Listings
              </h2>
              <p className="text-gray-600 mb-4">
                View and edit your current car listings.
              </p>
              <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors">
                View Listings
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Sales Analytics
              </h2>
              <p className="text-gray-600 mb-4">
                Track your sales and performance.
              </p>
              <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
                View Analytics
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Explore Cars
              </h2>
              <p className="text-gray-600 mb-4">
                Browse through a wide range of cars available for auction.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                Browse Cars
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                My Bids
              </h2>
              <p className="text-gray-600 mb-4">
                Track the status of your active bids.
              </p>
              <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors">
                View Bids
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Auction History
              </h2>
              <p className="text-gray-600 mb-4">
                Review your past auction activities.
              </p>
              <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
                View History
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
