import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { db, auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import AdminTable from "@/app/components/admin/AdminTable";
import AuctionAnalytics from "@/app/components/admin/Chart";
import Link from "next/link";

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const fetchUserRole = async () => {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists() && userDoc.data().role === "admin") {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || "Admin",
              role: "admin",
            });
            setLoading(false);
          } else {
            router.push("/login");
          }
        };

        fetchUserRole();
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const carsCollection = collection(db, "cars");
    const unsubscribe = onSnapshot(
      carsCollection,
      (snapshot) => {
        const carsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCars(carsData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching cars:", err);
        setError("Failed to fetch car data");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <AdminTable
            data={cars.map((car) => ({
              id: car.id,
              name: `${car.make} ${car.model}`,
              bidCount: car.bidCount || 0,
              status: car.status || "Pending",
            }))}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Auction Analytics
          </h2>
          <AuctionAnalytics cars={cars} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white shadow-md rounded-lg p-6 text-center"
      >
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white shadow-md rounded-lg p-6 mt-8"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {cars.slice(0, 5).map((car) => (
            <div key={car.id} className="border-b border-gray-200 pb-4">
              <p className="text-gray-800">
                <span className="font-semibold">
                  {car.make} {car.model}
                </span>{" "}
                - <span className="text-blue-600">₦{car.currentBid}</span>
              </p>
              <p className="text-sm text-gray-600">
                Status: <span className="font-semibold">{car.status}</span>
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
