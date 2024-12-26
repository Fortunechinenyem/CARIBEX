import connectDB from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { auctionId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { db } = await connectDB();

    const validAuctionId = ObjectId.isValid(auctionId)
      ? new ObjectId(auctionId)
      : null;

    if (!validAuctionId) {
      return res.status(400).json({ message: "Invalid auction ID" });
    }

    const auction = await db
      .collection("auctions")
      .findOne({ _id: validAuctionId });

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    const milestones = [
      { label: "Car Listed", date: auction.listedDate, completed: true },
      {
        label: "Auction Started",
        date: auction.startDate,
        completed: auction.status === "Active" || auction.status === "Sold",
      },
      {
        label: "Auction Ended",
        date: auction.endDate,
        completed: auction.status === "Sold",
      },
      {
        label: "Car Sold",
        date: auction.soldDate || null,
        completed: auction.status === "Sold",
      },
    ];

    res.status(200).json({
      status: auction.status,
      milestones,
    });
  } catch (error) {
    console.error("Error fetching auction tracking details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
