import axiosClient from "./axiosClient";

export const adminStatsApi = {
  // 대시보드 통계 (관리자/사업자 공용 혹은 라우트 내부 분기)
  getDashboardStats: () => {
    return axiosClient.get("/dashboard");
  },
  // 추가 통계 API가 있다면 여기에 작성
};

export default adminStatsApi;