import mongoose from "mongoose";

const BidSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bidAmount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Bid || mongoose.model("Bid", BidSchema);
