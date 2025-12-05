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

// 사업자 회원가입
export const registerOwner = async (req, res) => {
  try {
    // role을 강제로 owner로 설정
    const result = await authService.register({ ...req.body, role: "owner" });
    res.status(201).json(successResponse(result, "OWNER_REGISTER_SUCCESS"));
  } catch (err) {
    res.status(400).json(errorResponse(err.message, 400));
  }
};

// OAuth 콜백 처리 (Kakao, Naver, Google)
// 프론트에서 code를 받아 백엔드로 전달하면, 백엔드가 토큰을 발급하는 방식 권장
export const socialLogin = async (req, res) => {
  try {
    const { provider } = req.params; // kakao, naver, google
    const { code } = req.body; // 인가 코드
    const result = await authService.socialLogin(provider, code);
    res.status(200).json(successResponse(result, "SOCIAL_LOGIN_SUCCESS"));
  } catch (err) {
    res.status(400).json(errorResponse(err.message, 400));
  }
};