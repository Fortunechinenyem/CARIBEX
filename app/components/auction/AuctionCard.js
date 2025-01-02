import Image from "next/image";
import { useState, useEffect } from "react";

import io from "socket.io-client";

const socket = io("http://localhost:3000");

const AuctionCard = ({ car }) => {
  const [currentBid, setCurrentBid] = useState(car.currentBid);
  const [bidAmount, setBidAmount] = useState("");
  const [timer, setTimer] = useState(car.endTime - Date.now());

  useEffect(() => {
    socket.on("newBid", (data) => {
      if (data.carId === car._id) {
        setCurrentBid(data.bidAmount);
      }
    });

    const interval = setInterval(() => {
      setTimer(car.endTime - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [car]);

  const placeBid = () => {
    if (bidAmount <= currentBid) {
      alert("Your bid must be higher than the current bid!");
      return;
    }

    socket.emit("placeBid", {
      carId: car._id,
      bidAmount: parseInt(bidAmount),
    });

    setBidAmount("");
  };

  return (
    <div className="card bg-white p-6 rounded-lg shadow-md mb-6">
      <Image
        src={car.image}
        alt={car.make}
        height={250}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold">
        {car.make} {car.model} ({car.year})
      </h3>
      <p>{car.description}</p>
      <div className="mt-4">
        <h4>Current Bid: ₦{currentBid}</h4>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="mt-2 p-2 border rounded-lg"
          placeholder="Enter your bid"
        />
        <button
          onClick={placeBid}
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg"
        >
          Place Bid
        </button>
      </div>
      <p className="mt-2">Time Left: {Math.max(timer, 0) / 1000}s</p>
    </div>
  );
};

export default AuctionCard;
