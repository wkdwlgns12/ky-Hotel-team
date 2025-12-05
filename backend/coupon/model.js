import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    discountAmount: { type: Number, required: true, min: 0 },
    minOrderAmount: { type: Number, default: 0 },
    quantity: { type: Number, default: 100 }, // 발급 수량
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 쿠폰 소유자(사업자)
    isActive: { type: Boolean, default: true },
    description: { type: String },
    type: { type: String, enum: ['fixed', 'percent'], default: 'fixed' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

couponSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;