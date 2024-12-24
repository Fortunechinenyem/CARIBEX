import connectDB from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { db } = await connectDB();

    const reports = await db.collection("reports").find().toArray(); // Ensure this is an array

    if (!Array.isArray(reports)) {
      return res
        .status(500)
        .json({ message: "Reports data is not in the expected array format" });
    }

    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
