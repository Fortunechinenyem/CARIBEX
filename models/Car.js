import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  currentBid: { type: Number, default: 0 },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ["active", "closed", "completed"],
    default: "active",
  },
});

export default mongoose.models.Car || mongoose.model("Car", CarSchema);
