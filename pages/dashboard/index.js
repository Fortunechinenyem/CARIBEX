import AuctionCard from "@/app/components/auction/AuctionCard";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetch("/api/auctions")
      .then((res) => res.json())
      .then((data) => setAuctions(data))
      .catch((error) => console.error("Error fetching auctions:", error));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-semibold text-center mb-8">Your Auctions</h1>
      {auctions.map((auction) => (
        <AuctionCard key={auction._id} car={auction} />
      ))}
    </div>
  );
};

export default Dashboard;
