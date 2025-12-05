import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String }, // 소셜 로그인 시 password 없을 수 있음
    role: {
      type: String,
      enum: ["user", "owner", "admin"],
      default: "user",
    },
    phone: { type: String },
    businessNumber: { type: String }, // 사업자 번호
    provider: { type: String, default: "local" }, // local, kakao, naver, google
    snsId: { type: String },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 비밀번호 해시
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 비밀번호 검증
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

export const User = mongoose.model("User", userSchema);
export default User;