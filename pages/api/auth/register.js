import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password, role = "user" } = req.body;

  try {
    const { db } = await connectDB();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log("New user registered:", email);
    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
