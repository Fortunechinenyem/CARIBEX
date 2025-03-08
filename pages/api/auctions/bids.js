import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { carId, userId, bidAmount } = req.body;

    try {
      const carRef = doc(db, "cars", carId);
      const carDoc = await getDoc(carRef);

      if (!carDoc.exists()) {
        return res.status(404).json({ error: "Car not found" });
      }

      const carData = carDoc.data();

      if (bidAmount <= carData.currentBid) {
        return res
          .status(400)
          .json({ error: "Bid must be higher than the current bid" });
      }

      // Add the new bid to the "bids" collection
      const bidsCollection = collection(db, "bids");
      const newBid = await addDoc(bidsCollection, {
        carId,
        userId,
        bidAmount,
        timestamp: new Date(),
      });

      await updateDoc(carRef, {
        currentBid: bidAmount,
      });

      res.status(201).json({ id: newBid.id, carId, userId, bidAmount });
    } catch (error) {
      console.error("Error placing bid:", error);
      res.status(500).json({ error: "Failed to place bid" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
