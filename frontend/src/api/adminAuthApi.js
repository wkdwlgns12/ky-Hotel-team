import axiosClient from "./axiosClient";

export const adminAuthApi = {
  // 공통 로그인 (관리자/사업자)
  login: (credentials) => {
    // Backend: POST /api/auth/login
    return axiosClient.post("/auth/login", credentials);
  },
  
  // 사업자 회원가입
  businessSignup: (data) => {
    // Backend: POST /api/auth/owner/register
    return axiosClient.post("/auth/owner/register", data);
  },

  // 내 정보 조회
  getMyInfo: () => {
    // Backend: GET /api/auth/me
    return axiosClient.get("/auth/me");
  },

  // 로그아웃 (프론트엔드 처리 - 토큰 삭제 등)
  logout: async () => {
    // 백엔드에 로그아웃 API가 없다면 클라이언트에서 처리
    // 만약 있다면: return axiosClient.post("/auth/logout");
    return Promise.resolve({ message: "Logged out" });
  },
};

export default adminAuthApi;