import connectDB from "@/lib/db";
import { Server } from "socket.io";

let io;

export default async function handler(req, res) {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("message", (data) => {
        console.log(data);
        socket.broadcast.emit("message", data);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    console.log("WebSocket server initialized.");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { carModel, description, price } = req.body;

    if (!carModel || !description || !price) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const sellerId = req.user?._id;
    if (!sellerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { db } = await connectDB();

    const newAuction = {
      carModel,
      description,
      price,
      sellerId,
      status: "Auction Created",
      createdAt: new Date(),
    };

    await db.collection("auctions").insertOne(newAuction);

    return res.status(201).json({ message: "Car uploaded successfully." });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
