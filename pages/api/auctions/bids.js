import connectDB from "@/lib/db";
import Bid from "@/models/Bid";
import Car from "@/models/Car";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { carId, userId, bidAmount } = req.body;

    try {
      const car = await Car.findById(carId);

      if (bidAmount <= car.currentBid) {
        return res
          .status(400)
          .json({ error: "Bid must be higher than the current bid" });
      }

      const newBid = await Bid.create({
        carId,
        userId,
        bidAmount,
      });

      car.currentBid = bidAmount;
      await car.save();

      res.status(201).json(newBid);
    } catch (error) {
      res.status(400).json({ error: "Failed to place bid" });
    }
  }
}
