import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Import Firestore instance
import { verifyAdmin } from "@/middleware/authMiddleware"; // Import admin verification middleware

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;
  const { action } = req.body;

  if (!["approve", "reject"].includes(action)) {
    return res.status(400).json({ message: "Invalid action." });
  }

  await verifyAdmin(req, res, async () => {
    try {
      const carRef = doc(db, "cars", id);
      const newStatus = action === "approve" ? "Approved" : "Rejected";

      await updateDoc(carRef, { status: newStatus });

      return res.status(200).json({ message: `Car ${action}ed successfully.` });
    } catch (error) {
      console.error("Error updating car status:", error);
      return res.status(500).json({ message: "Failed to update car status." });
    }
  });
}
