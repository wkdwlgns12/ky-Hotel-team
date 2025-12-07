import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // JWT 방식이므로 false 권장
});

// 요청 인터셉터: 헤더에 토큰 추가
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

// 응답 인터셉터: data 추출 및 에러 처리
axiosClient.interceptors.response.use(
  (response) => {
    // 백엔드가 { success: true, data: {...}, message: "..." } 형태로 줄 경우
    if (response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 인증 실패 시 로그인 페이지로 (단, 로그인 중일 땐 제외)
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