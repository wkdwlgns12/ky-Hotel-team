import axiosClient from "./axiosClient";
import { mockAuthApi } from "./mockApi";

// ★ 백엔드 연결을 위해 false로 변경
const USE_MOCK = false;

export const adminAuthApi = {
  login: (credentials) => {
    if (USE_MOCK) return mockAuthApi.login(credentials);
    return axiosClient.post("/auth/login", credentials);
  },
  businessSignup: (data) => {
    if (USE_MOCK) return mockAuthApi.businessSignup(data);
    // 사업자 회원가입 경로
    return axiosClient.post("/auth/owner/register", data);
  },
  getMyInfo: () => {
    if (USE_MOCK) return mockAuthApi.getMyInfo();
    return axiosClient.get("/auth/me");
  },
  changePassword: (data) => {
    if (USE_MOCK) return mockAuthApi.changePassword(data);
    return axiosClient.put("/user/me/password", data);
  },
};

export default adminAuthApi;