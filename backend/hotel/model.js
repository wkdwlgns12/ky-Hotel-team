import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true }, // 지역 (서울, 부산 등)
    address: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    description: { type: String },
    category: { type: String, default: "호텔" },
    rooms: { type: Number, default: 0 },
    price: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
    },
    images: [{ type: String }],
    amenities: [{ type: String }],
    contact: {
        phone: { type: String },
        email: { type: String }
    }
  },
  { timestamps: true }
);

export const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;