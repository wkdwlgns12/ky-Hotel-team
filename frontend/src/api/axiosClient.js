import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api", // vite proxy를 타도록 설정
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 토큰 자동 첨부
axiosClient.interceptors.request.use(
  (config) => {
    // 토큰 저장소 키 통일 (adminToken 또는 token)
    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리 및 데이터 추출
axiosClient.interceptors.response.use(
  (response) => {
    // 백엔드 응답 구조가 { success: true, data: ... } 형태일 경우 data만 반환하도록 처리
    return response.data?.data || response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 인증 만료 시 로그아웃 처리
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("user");
      // 무한 리다이렉트 방지를 위해 현재 페이지 체크 필요하나, 기본적으로 로그인 페이지로 이동
      if (!window.location.pathname.includes('/login')) {
         window.location.href = "/auth/login"; 
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;