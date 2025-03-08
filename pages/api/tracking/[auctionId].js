import { db } from "@/lib/firebase"; // Import Firestore instance
import { doc, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { auctionId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Fetch the auction document from Firestore
    const auctionRef = doc(db, "auctions", auctionId);
    const auctionDoc = await getDoc(auctionRef);

    if (!auctionDoc.exists()) {
      return res.status(404).json({ message: "Auction not found" });
    }

    const auction = auctionDoc.data();

    // Define milestones based on auction status
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
