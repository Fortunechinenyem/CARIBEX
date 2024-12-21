import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

let io;

export default function handler(req, res) {
  if (!io) {
    const server = res.socket.server;

    io = new Server(server, {
      path: "/api/auctions/socket",
    });

    io.on("connection", (socket) => {
      console.log("New WebSocket connection");

      socket.on("placeBid", (data) => {
        io.emit("newBid", data);
      });
    });
  }

  res.end();
}
