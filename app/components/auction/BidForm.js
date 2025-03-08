import { useState } from "react";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const BidForm = ({ auctionId, currentBid }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBid = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!bidAmount || isNaN(bidAmount)) {
      setError("Please enter a valid bid amount.");
      setLoading(false);
      return;
    }

    if (parseFloat(bidAmount) <= currentBid) {
      setError(`Bid must be higher than the current bid (₦${currentBid}).`);
      setLoading(false);
      return;
    }

    try {
      const auctionRef = doc(db, "auctions", auctionId);
      await updateDoc(auctionRef, {
        currentBid: parseFloat(bidAmount),
      });

      const bidsCollection = collection(db, "bids");
      await addDoc(bidsCollection, {
        auctionId,
        userId: "user-id-here",
        bidAmount: parseFloat(bidAmount),
        timestamp: new Date(),
      });

      setBidAmount("");
      setSuccess("Bid placed successfully!");
    } catch (err) {
      console.error("Error placing bid:", err);
      setError("Failed to place bid. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleBid} className="space-y-4">
      <div>
        <label
          htmlFor="bidAmount"
          className="block text-sm font-medium text-gray-700"
        >
          Enter Your Bid (₦)
        </label>
        <input
          type="number"
          id="bidAmount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder={`Minimum bid: ₦${currentBid + 1}`}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          min={currentBid + 1}
          step="0.01"
          required
        />
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      {success && (
        <div className="text-green-500 text-sm text-center">{success}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Placing Bid..." : "Place Bid"}
      </button>
    </form>
  );
};

export default BidForm;
