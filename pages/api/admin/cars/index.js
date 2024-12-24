export default async function handler(req, res) {
  try {
    const cars = await db.collection("cars").find().toArray();
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
