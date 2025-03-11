import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { verifyAdmin } from "@/middleware/authMiddleware";

export default async function handler(req, res) {
  await verifyAdmin(req, res, async () => {
    try {
      const carsCollection = collection(db, "cars");
      const carsSnapshot = await getDocs(carsCollection);
      const cars = carsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
}
