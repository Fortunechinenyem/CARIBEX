import AuctionCard from "@/app/components/auction/AuctionCard";
import { useEffect, useState } from "react";

const AuctionPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/api/auctions")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCars(data);
        } else {
          console.error("Expected an array, got:", data);
        }
      })
      .catch((error) => console.error("Failed to fetch auctions:", error));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-semibold text-center mb-8">
        Ongoing Auctions
      </h1>
      {cars.map((car) => (
        <AuctionCard key={car._id} car={car} />
      ))}
    </div>
  );
};

export default AuctionPage;
