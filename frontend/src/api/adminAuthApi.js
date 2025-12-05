import axiosClient from "./axiosClient";

export const adminAuthApi = {
  // [공통] 로그인
  login: (credentials) => {
    return axiosClient.post("/auth/login", credentials);
  },
  // [사업자] 회원가입
  businessSignup: (data) => {
    // Backend Route: POST /api/auth/owner/register
    return axiosClient.post("/auth/owner/register", data);
  },
  // [공통] 내 정보 조회
  getMyInfo: () => {
    return axiosClient.get("/auth/me");
  },
  // [공통] 로그아웃
  logout: () => {
    // 클라이언트 사이드 로그아웃 처리
    return Promise.resolve({ success: true });
  }
};

export default adminAuthApi;