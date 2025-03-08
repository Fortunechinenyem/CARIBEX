import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Import Firestore instance
import AuctionDetails from "@/app/components/auction/AuctionDetails";
import BidForm from "@/app/components/auction/BidForm";
import BidHistory from "@/app/components/auction/BidHistory";

const AuctionsID = () => {
  const router = useRouter();
  const { id } = router.query;
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchAuction = async () => {
      try {
        const auctionRef = doc(db, "auctions", id);
        const auctionDoc = await getDoc(auctionRef);

        if (!auctionDoc.exists()) {
          setError("Auction not found");
          setLoading(false);
          return;
        }

        setAuction({ id: auctionDoc.id, ...auctionDoc.data() });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching auction:", err);
        setError("Failed to fetch auction details");
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <AuctionDetails auction={auction} />
        <BidForm auctionId={auction.id} currentBid={auction.currentBid} />
        <BidHistory auctionId={auction.id} />
      </div>
    </div>
  );
};

export default AuctionsID;
