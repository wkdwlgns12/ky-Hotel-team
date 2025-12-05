import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    reply: { type: String }, // 사업자 답글
    
    // 신고 관련
    isReportedByUser: { type: Boolean, default: false },
    userReportReason: { type: String },
    isEscalatedByOwner: { type: Boolean, default: false },
    ownerReportReason: { type: String },
    adminReportStatus: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },
  },
  { timestamps: true }
);

reviewSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Review = mongoose.model("Review", reviewSchema);
export default Review;