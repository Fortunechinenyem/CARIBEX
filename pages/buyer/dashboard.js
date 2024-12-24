import Link from "next/link";
import { useEffect, useState } from "react";

const BuyerDashboard = () => {
  const [trackedAuctions, setTrackedAuctions] = useState([]);

  useEffect(() => {
    fetch("/api/buyer/auctions")
      .then((res) => res.json())
      .then((data) => setTrackedAuctions(data))
      .catch((error) =>
        console.error("Error fetching tracked auctions:", error)
      );
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-semibold text-center mb-8">My Auctions</h1>
      {trackedAuctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trackedAuctions.map((auction) => (
            <div key={auction._id} className="border rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold">{auction.carModel}</h2>
              <p className="text-gray-600">Status: {auction.status}</p>
              <Link
                href={`/buyer/auction/${auction._id}`}
                className="text-blue-500 hover:underline mt-4 block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No auctions found.</p>
      )}
    </div>
  );
};

export default BuyerDashboard;
