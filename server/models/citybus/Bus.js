import { mongoose } from "mongoose";

const BusSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    required: true,
  }
});

export const Bus = mongoose.model("Bus", BusSchema);
