import connectDB from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { db } = await connectDB();

    const userId = req.userId;

    const auctions = await db
      .collection("auctions")
      .find({ participants: userId })
      .toArray();

    return res.status(200).json(auctions);
  } catch (error) {
    console.error("Error fetching auctions for buyer:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
