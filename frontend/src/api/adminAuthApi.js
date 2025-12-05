import axiosClient from "./axiosClient";

export const adminAuthApi = {
  // 로그인
  login: (credentials) => {
    return axiosClient.post("/auth/login", credentials);
  },
  // 사업자 회원가입
  businessSignup: (data) => {
    // 백엔드: POST /api/auth/owner/register
    return axiosClient.post("/auth/owner/register", data);
  },
  // 내 정보 확인
  getMyInfo: () => {
    return axiosClient.get("/auth/me");
  },
  // 로그아웃
  logout: () => {
    // 백엔드 로그아웃이 없다면 Promise.resolve() 처리해도 됨
    // 여기서는 있다고 가정하거나 클라이언트 처리를 위해 호출
    return Promise.resolve({ success: true });
  }
};

export default adminAuthApi;