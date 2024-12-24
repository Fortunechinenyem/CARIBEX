import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuctionDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [auctionDetails, setAuctionDetails] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/auctions/${id}`)
      .then((res) => res.json())
      .then((data) => setAuctionDetails(data))
      .catch((error) =>
        console.error("Error fetching auction details:", error)
      );
  }, [id]);

  if (!auctionDetails) {
    return <p>Loading...</p>;
  }

  const timelineEvents = [
    { label: "Auction Created", date: auctionDetails.createdAt },
    { label: "Bidding Started", date: auctionDetails.biddingStart },
    { label: "Auction Ended", date: auctionDetails.biddingEnd },
    {
      label: "Winner Declared",
      date: auctionDetails.winner ? auctionDetails.winner.announcedAt : "TBD",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-semibold text-center mb-8">
        Auction Details for {auctionDetails.carModel}
      </h1>
      <div className="mb-8 p-4 border rounded shadow">
        <h2 className="text-2xl font-semibold">
          Car Model: {auctionDetails.carModel}
        </h2>
        <p>Status: {auctionDetails.status}</p>
        <p>Highest Bid: ₦{auctionDetails.highestBid || "N/A"}</p>
      </div>

      <div className="timeline">
        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className={`timeline-item ${event.date ? "complete" : "pending"}`}
          >
            <div className="timeline-icon"></div>
            <div className="timeline-content">
              <h3 className="font-bold">{event.label}</h3>
              <p className="text-gray-600">{event.date || "Pending"}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .timeline-item {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .timeline-icon {
          width: 20px;
          height: 20px;
          background: #ccc;
          border-radius: 50%;
        }
        .timeline-item.complete .timeline-icon {
          background: #4caf50;
        }
        .timeline-item.pending .timeline-icon {
          background: #ccc;
        }
        .timeline-content {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default AuctionDetails;
