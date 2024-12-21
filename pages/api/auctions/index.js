import connectDB from "@/lib/db";
import Car from "@/models/Car";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const cars = await Car.find({ status: "active" }).sort({ startTime: -1 });
      res.status(200).json(cars);
    } catch (error) {
      res.status(400).json({ error: "Failed to fetch auctions" });
    }
  }
}
