import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api", // Vite Proxy (/api -> http://localhost:3000/api)
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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

axiosClient.interceptors.response.use(
  (response) => {
    // response.js 포맷: { success: true, data: ..., message: ... }
    // API 호출 부에서 바로 데이터를 쓸 수 있게 data 필드 반환
    return response.data?.data !== undefined ? response.data.data : response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 인증 실패 시 로그인 화면으로 이동 (무한 루프 방지)
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