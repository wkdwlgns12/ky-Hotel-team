import { Router } from "express";
import { login, register } from "./service.js";
import * as authController from "./controller.js"; // 컨트롤러 전체 import
import { successResponse, errorResponse } from "../common/response.js";
import { verifyToken } from "../common/authmiddleware.js";

const router = Router();

// --- 일반 로그인/회원가입 ---
router.post("/login", authController.login);
router.post("/register", authController.registerUser); // 일반 회원가입
router.post("/owner/register", authController.registerOwner); // 사업자 회원가입

// --- 소셜 로그인 (요청) ---
router.get("/kakao", authController.kakaoLogin);
router.get("/naver", authController.naverLogin);
router.get("/google", authController.googleLogin);

// --- 소셜 로그인 (콜백) ---
router.get("/kakao/callback", authController.kakaoCallback);
router.get("/naver/callback", authController.naverCallback);
router.get("/google/callback", authController.googleCallback);

// --- 기타 ---
router.get("/me", verifyToken, (req, res) => {
    res.json(successResponse({ user: req.user }, "PROFILE_SUCCESS"));
});

export default router;