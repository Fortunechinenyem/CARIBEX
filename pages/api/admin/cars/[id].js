import connectDB from "@/lib/db";
import { verifyAdmin } from "@/middleware/authMiddleware";
import { ObjectId } from "mongodb";

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
      const { db } = await connectDB();
      const result = await db
        .collection("cars")
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: { status: action === "approve" ? "Approved" : "Rejected" } }
        );

      if (result.modifiedCount === 0) {
        return res
          .status(404)
          .json({ message: "Car not found or already processed." });
      }

      return res.status(200).json({ message: `Car ${action}ed successfully.` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to update car status." });
    }
  });
}
