import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import errorHandler from "./common/errorhandler.js";
import registerRoutes from "./routes/index.js";

const app = express();

// DB 연결
connectDB();

// 미들웨어 설정
app.use(cors({
  origin: process.env.FRONT_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 등록
registerRoutes(app);

// 404 핸들러
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Requested resource not found",
  });
});

// 에러 핸들러
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;