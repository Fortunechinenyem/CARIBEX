import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const BidHistory = ({ auctionId }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bidsQuery = query(
      collection(db, "bids"),
      where("auctionId", "==", auctionId),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(bidsQuery, (snapshot) => {
      const bidsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBids(bidsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auctionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Bid History</h2>
      {bids.length > 0 ? (
        <div className="space-y-4">
          {bids.map((bid) => (
            <div key={bid.id} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-800">
                  ₦{bid.bidAmount}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(bid.timestamp?.toDate()).toLocaleString()}
                </p>
              </div>
              <p className="text-sm text-gray-600">User ID: {bid.userId}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No bids have been placed yet.</p>
      )}
    </div>
  );
};

export default BidHistory;
