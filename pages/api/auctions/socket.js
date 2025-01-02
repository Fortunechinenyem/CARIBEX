import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

let io;

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Starting Socket.io server...");
    const io = new Server(res.socket.server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("placeBid", (data) => {
        console.log(`New bid for car ID ${data.carId}: ₦${data.bidAmount}`);
        io.emit("newBid", data);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });
  }
  res.end();
}
