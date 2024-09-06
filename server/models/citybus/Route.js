import { mongoose } from "mongoose";

const RouteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  //   waypoints: [
  //     {
  //       lat: {
  //         type: Number,
  //         required: true,
  //       },
  //       lng: {
  //         type: Number,
  //         required: true,
  //       },
  //     },
  //   ],
  waypoints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location", // Reference to the Location model
      required: true,
    },
  ],
});

export const Route = mongoose.model("Route", RouteSchema);
