import connectDB from "@/lib/db";
// import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      console.log("Invalid method:", req.method);
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("Missing fields:", req.body);
      return res.status(400).json({ message: "Please fill all fields." });
    }

    console.log("Connecting to database...");
    const { db } = await connectDB();
    console.log("Connected to database!");

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Inserting new user...");
    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
    });

    console.log("User registered successfully!");
    return res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in API route:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
