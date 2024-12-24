import connectDB from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { db } = await connectDB();

      const users = await db.collection("users").find().toArray();

      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const { db } = await connectDB();

      const result = await db
        .collection("users")
        .deleteOne({ _id: new ObjectId(userId) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    const { userId, updatedData } = req.body;

    if (!userId || !updatedData) {
      return res.status(400).json({ message: "User ID and data are required" });
    }

    try {
      const { db } = await connectDB();

      const result = await db
        .collection("users")
        .updateOne({ _id: new ObjectId(userId) }, { $set: updatedData });

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
