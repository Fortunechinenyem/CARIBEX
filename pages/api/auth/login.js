import connectDB from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
