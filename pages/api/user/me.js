import connectDB from "@/lib/db";
import { authenticateUser } from "@/middleware/authMiddleware";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await authenticateUser()(req, res, async () => {
    try {
      const { db } = await connectDB();
      const user = await db.collection("users").findOne({ _id: req.user._id });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  });
}
