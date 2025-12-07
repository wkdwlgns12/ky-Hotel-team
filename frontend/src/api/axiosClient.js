import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 토큰 자동 삽입
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

// 응답 인터셉터: 데이터 추출 및 에러 정규화
axiosClient.interceptors.response.use(
  (response) => {
    // 백엔드 response.js: { success: true, data: ..., message: ... }
    // axiosClient는 여기서 data 필드 내부의 실제 데이터를 반환하도록 설정
    if (response.data && response.data.success) {
      return response.data.data; 
    }
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 인증 만료 시 로그아웃 처리 (로그인 페이지 제외)
      if (!window.location.pathname.includes("/auth")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/auth/login";
      }
    }
    // 백엔드 에러 메시지 추출
    const errorMessage = error.response?.data?.message || error.message || "오류가 발생했습니다.";
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosClient;