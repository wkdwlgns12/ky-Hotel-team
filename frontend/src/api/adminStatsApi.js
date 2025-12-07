import axiosClient from "./axiosClient";

export const adminStatsApi = {
  // 관리자 대시보드 (GET /api/dashboard/admin)
  getAdminStats: () => axiosClient.get("/dashboard/admin"),
  
  // 사업자 대시보드 (GET /api/dashboard/owner)
  getOwnerStats: () => axiosClient.get("/dashboard/owner"),
};
export default adminStatsApi;