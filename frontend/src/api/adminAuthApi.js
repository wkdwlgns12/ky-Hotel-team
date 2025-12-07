import axiosClient from "./axiosClient";

export const adminAuthApi = {
  // 로그인
  login: (credentials) => {
    return axiosClient.post("/auth/login", credentials);
  },
  // 사업자 회원가입
  businessSignup: (data) => {
    return axiosClient.post("/auth/owner/register", data);
  },
  // 내 정보 조회
  getMyInfo: () => {
    return axiosClient.get("/auth/me");
  },
  // 로그아웃 (클라이언트 처리)
  logout: () => {
    return Promise.resolve({ success: true });
  }
};

export default adminAuthApi;