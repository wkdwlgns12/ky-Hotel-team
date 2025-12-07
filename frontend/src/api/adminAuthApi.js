import axiosClient from "./axiosClient";

export const adminAuthApi = {
  // 로그인 (POST /api/auth/login)
  login: (credentials) => axiosClient.post("/auth/login", credentials),
  
  // 사업자 가입 (POST /api/auth/owner/register)
  businessSignup: (data) => axiosClient.post("/auth/owner/register", data),

  // 관리자/일반 가입 (POST /api/auth/register) -> 관리자 생성용
  register: (data) => axiosClient.post("/auth/register", data),

  // 내 정보 (GET /api/auth/me) -> 토큰 검증용
  getMyInfo: () => axiosClient.get("/auth/me"),
};
export default adminAuthApi;