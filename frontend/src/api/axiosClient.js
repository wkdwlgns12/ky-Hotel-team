import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api", // vite.config.js proxy 사용
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosClient.interceptors.response.use(
  (response) => {
    // 백엔드 응답 구조: { success: true, data: ..., message: ... }
    // data만 추출하여 반환하거나 response.data 전체 반환 (구조에 따라 조정)
    return response.data?.data !== undefined ? response.data.data : response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 로그인 페이지가 아닐 때만 리다이렉트
      if (!window.location.pathname.includes("/auth")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;