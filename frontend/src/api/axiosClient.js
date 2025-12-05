import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api", // vite.config.js의 proxy 설정 사용 (http://localhost:3000/api)
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 토큰 자동 첨부
axiosClient.interceptors.request.use(
  (config) => {
    // 토큰 키를 'token' 하나로 통일합니다.
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 데이터 구조 정규화 및 401 처리
axiosClient.interceptors.response.use(
  (response) => {
    // 백엔드가 { success: true, data: ... } 형태로 주면 data만, 아니면 전체 반환
    return response.data && response.data.data ? response.data.data : response.data;
  },
  (error) => {
    // 401 인증 에러 발생 시 로그아웃 처리
    if (error.response?.status === 401) {
      // 로그인 관련 페이지가 아닐 때만 리다이렉트 (무한 루프 방지)
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