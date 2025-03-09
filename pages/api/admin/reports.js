import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Import Firestore instance
import { verifyAdmin } from "@/middleware/authMiddleware"; // Import admin verification middleware

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await verifyAdmin(req, res, async () => {
    try {
      const reportsCollection = collection(db, "reports");
      const reportsSnapshot = await getDocs(reportsCollection);
      const reports = reportsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
}
