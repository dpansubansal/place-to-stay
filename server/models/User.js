import { mongoose } from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, min: 2, max: 50, required: true, trim: true },
  email: {
    type: String,
    min: 5,
    max: 50,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  photoUrl: { type: String, default: "", trim: true },
}, {
	timestamps: true
});

export const User = mongoose.model("users", userSchema);
