import axiosClient from "./axiosClient";

export const adminStatsApi = {
  // [관리자용] 대시보드 통계 (GET /api/dashboard/admin)
  getAdminStats: () => {
    return axiosClient.get("/dashboard/admin");
  },
  
  // [사업자용] 대시보드 통계 (GET /api/dashboard/owner)
  getOwnerStats: () => {
    return axiosClient.get("/dashboard/owner");
  }
};

export default adminStatsApi;