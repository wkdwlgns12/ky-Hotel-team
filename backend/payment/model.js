import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reservation: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation", required: true },
    provider: { type: String, default: "toss" },
    paymentKey: { type: String, required: true, unique: true },
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "failed"],
      default: "pending",
    },
    rawResponse: { type: Object },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;