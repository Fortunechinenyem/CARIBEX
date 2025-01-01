import StatusIndicator from "@/app/components/tracking/StatusIndicator";
import TrackingTimeline from "@/app/components/tracking/TrackingTimeline";
import React, { useState, useEffect } from "react";

const TrackingPage = () => {
  const [auctionStatus, setAuctionStatus] = useState("Pending");
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch("/api/tracking/auction-id")
      .then((res) => res.json())
      .then((data) => {
        setAuctionStatus(data.status);
        setTimeline(data.milestones);
      })
      .catch((err) => console.error("Error fetching tracking data:", err));
  }, []);

  const milestones = [
    { label: "Car Listed", completed: true },
    { label: "Bidding Started", completed: true },
    { label: "Auction Completed", completed: false },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-semibold text-center mb-8">
        Auction Tracking
      </h1>

      <div className="mb-8 text-center">
        <h2 className="text-2xl font-medium mb-4">Current Status</h2>
        <StatusIndicator status={auctionStatus} />
      </div>

      <div>
        <h2 className="text-2xl font-medium mb-4 text-center">
          Tracking Timeline
        </h2>
        <TrackingTimeline milestones={milestones} />
      </div>
    </div>
  );
};

export default TrackingPage;
