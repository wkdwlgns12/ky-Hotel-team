import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // 🚨 CORS 오류 해결: JWT 방식에서는 쿠키가 필수 아님. false로 변경하거나 삭제.
  withCredentials: false, 
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
    if (response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (!window.location.pathname.includes("/auth")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/auth/login";
      }
    }
    const errorMessage = error.response?.data?.message || error.message || "오류가 발생했습니다.";
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosClient;