import { Router } from "express";
import { successResponse, errorResponse } from "../common/response.js";
import { login, register } from "./service.js";
import * as authController from "./controller.js";
import { verifyToken } from "../common/authmiddleware.js";

const router = Router();

// --- 기본 로그인 ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(errorResponse("EMAIL_AND_PASSWORD_REQUIRED", 400));
    }
    const { user, token } = await login(email, password);
    return res.status(200).json(successResponse({ user, token }, "LOGIN_SUCCESS"));
  } catch (err) {
    const status = err.status || 401;
    return res.status(status).json(errorResponse(err.message || "LOGIN_FAIL", status));
  }
});

// --- 일반 회원가입 ---
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json(errorResponse("NAME_EMAIL_PASSWORD_REQUIRED", 400));
    }
    const { user, token } = await register({
      name, email, password, role: role || "user", phone
    });
    return res.status(201).json(successResponse({ user, token }, "REGISTER_SUCCESS", 201));
  } catch (err) {
    const status = err.status || 400;
    return res.status(status).json(errorResponse(err.message || "REGISTER_FAIL", status));
  }
});

// --- 🔥 사업자(Owner) 전용 회원가입 (수정됨) ---
router.post("/owner/register", async (req, res) => {
  try {
    // ✅ Phone과 BusinessNumber를 여기서 받아서 Service로 전달
    const { name, email, password, phone, businessNumber } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json(errorResponse("NAME_EMAIL_PASSWORD_REQUIRED", 400));
    }

    const { user, token } = await register({
      name,
      email,
      password,
      phone,           // 전화번호 전달
      businessNumber,  // 사업자번호 전달
      role: "owner",   // 역할 고정
    });

    return res.status(201).json(successResponse({ user, token }, "OWNER_REGISTER_SUCCESS", 201));
  } catch (err) {
    console.error("OWNER REGISTER ERROR:", err.message);
    const status = err.status || 400;
    return res.status(status).json(errorResponse(err.message || "OWNER_REGISTER_FAIL", status));
  }
});

// --- 내 정보 조회 ---
// controller.js에 있는 me 함수 사용 (혹은 아래처럼 직접 작성해도 됨)
router.get("/me", verifyToken, async (req, res, next) => {
    if (authController.me) {
        return authController.me(req, res, next);
    } else {
        return res.status(200).json(successResponse({ user: req.user }, "PROFILE_SUCCESS"));
    }
});


export default router;