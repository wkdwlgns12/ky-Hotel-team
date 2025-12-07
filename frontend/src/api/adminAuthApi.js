import axiosClient from "./axiosClient";

export const adminAuthApi = {
  login: (credentials) => axiosClient.post("/auth/login", credentials),
  register: (data) => axiosClient.post("/auth/register", data), // 일반/관리자
  businessSignup: (data) => axiosClient.post("/auth/owner/register", data), // 사업자
  getMyInfo: () => axiosClient.get("/auth/me"),
  forgotPassword: (email) => {
    // 백엔드 구현 필요 시 추가, 현재는 더미 처리 혹은 에러 처리
    console.warn("Forgot Password API not implemented in backend");
    return Promise.resolve();
  }
};
export default adminAuthApi;