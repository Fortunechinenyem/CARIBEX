import { useState } from "react";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Import Firestore instance

const AuctionCard = ({ car }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");

  const handleBid = async (e) => {
    e.preventDefault();

    if (!bidAmount || isNaN(bidAmount)) {
      setError("Please enter a valid bid amount.");
      return;
    }

    if (parseFloat(bidAmount) <= car.currentBid) {
      setError("Bid must be higher than the current bid.");
      return;
    }

    try {
      // Update the car's current bid in Firestore
      const carRef = doc(db, "cars", car.id);
      await updateDoc(carRef, {
        currentBid: parseFloat(bidAmount),
      });

      // Add the bid to the "bids" collection
      await addDoc(collection(db, "bids"), {
        carId: car.id,
        userId: "user-id-here", // Replace with actual user ID from Firebase Auth
        bidAmount: parseFloat(bidAmount),
        timestamp: new Date(),
      });

      setBidAmount("");
      setError("");
    } catch (err) {
      setError("Failed to place bid. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={car.image || "/images/default-car.png"}
        alt={`${car.make} ${car.model}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {car.make} {car.model}
        </h2>
        <p className="text-gray-600 mb-4">{car.description}</p>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold text-gray-800">
            Current Bid:{" "}
            <span className="text-blue-600">₦{car.currentBid}</span>
          </p>
          <p className="text-sm text-gray-600">
            Ends in: {new Date(car.endTime).toLocaleString()}
          </p>
        </div>
        <form onSubmit={handleBid} className="flex flex-col space-y-4">
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Enter your bid"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={car.currentBid + 1}
            step="0.01"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Place Bid
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuctionCard;
