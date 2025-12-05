import { Router } from "express";
import * as authController from "./controller.js";
import { verifyToken } from "../common/authmiddleware.js";
import { successResponse } from "../common/response.js";

const router = Router();

// 일반 로그인/회원가입
router.post("/login", authController.login);
router.post("/register", authController.registerUser);
router.post("/owner/register", authController.registerOwner);

// 소셜 로그인 (프론트 -> 백엔드 리다이렉트 요청)
router.get("/kakao", authController.kakaoLogin);
router.get("/naver", authController.naverLogin);
router.get("/google", authController.googleLogin);

// 소셜 로그인 콜백 (Provider -> 백엔드 -> 프론트)
router.get("/kakao/callback", authController.kakaoCallback);
router.get("/naver/callback", authController.naverCallback);
router.get("/google/callback", authController.googleCallback);

// 내 정보
router.get("/me", verifyToken, (req, res) => {
  res.json(successResponse({ user: req.user }, "PROFILE_SUCCESS"));
});

export default router;