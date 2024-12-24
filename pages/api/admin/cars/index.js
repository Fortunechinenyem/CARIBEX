import connectDB from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { db } = await connectDB();
    const cars = await db
      .collection("cars")
      .find({ status: "Pending" })
      .toArray();

    return res.status(200).json({ cars });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch cars." });
  }
}
