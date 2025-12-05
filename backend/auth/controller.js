import * as authService from "./service.js";
import { successResponse, errorResponse } from "../common/response.js";

// 일반 로그인
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json(successResponse(result, "LOGIN_SUCCESS"));
  } catch (err) {
    res.status(401).json(errorResponse(err.message, 401));
  }
};

// 일반 회원가입
export const registerUser = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(successResponse(result, "REGISTER_SUCCESS"));
  } catch (err) {
    res.status(400).json(errorResponse(err.message, 400));
  }
};

// 사업자 회원가입
export const registerOwner = async (req, res) => {
  try {
    const result = await authService.register({ ...req.body, role: "owner" });
    res.status(201).json(successResponse(result, "OWNER_REGISTER_SUCCESS"));
  } catch (err) {
    res.status(400).json(errorResponse(err.message, 400));
  }
};

// --- 소셜 로그인 요청 (리다이렉트) ---

export const kakaoLogin = (req, res) => {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
  res.redirect(kakaoAuthUrl);
};

export const naverLogin = (req, res) => {
  const state = process.env.NAVER_LOGIN_STATE || "naver_state";
  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.NAVER_REDIRECT_URI}&response_type=code&state=${state}`;
  res.redirect(naverAuthUrl);
};

export const googleLogin = (req, res) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  res.redirect(googleAuthUrl);
};

// --- 소셜 로그인 콜백 ---

const handleSocialCallback = async (res, serviceFunction, code, state, redirectUrl) => {
  try {
    const { token, user } = await serviceFunction(code, state);
    // 프론트엔드로 리다이렉트하며 토큰 전달
    res.redirect(`${redirectUrl}?token=${token}&role=${user.role}`);
  } catch (err) {
    console.error("Social Login Error:", err);
    res.redirect(`${redirectUrl}?error=${encodeURIComponent(err.message)}`);
  }
};

export const kakaoCallback = async (req, res) => {
  const { code } = req.query;
  await handleSocialCallback(res, authService.kakaoLoginService, code, null, process.env.KAKAO_LOGIN_REDIRECT);
};

export const naverCallback = async (req, res) => {
  const { code, state } = req.query;
  await handleSocialCallback(res, authService.naverLoginService, code, state, process.env.NAVER_LOGIN_REDIRECT);
};

export const googleCallback = async (req, res) => {
  const { code } = req.query;
  await handleSocialCallback(res, authService.googleLoginService, code, null, process.env.GOOGLE_LOGIN_REDIRECT);
};