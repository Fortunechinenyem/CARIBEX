import connectDB from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { carModel, description, price } = req.body;
  const sellerId = req.user._id;

  try {
    const { db } = await connectDB();
    const newAuction = {
      carModel,
      description,
      price,
      sellerId,
      status: "Auction Created",
    };

    await db.collection("auctions").insertOne(newAuction);

    return res.status(201).json({ message: "Car uploaded successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
