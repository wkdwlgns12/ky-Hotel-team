import axiosClient from "./axiosClient";

export const adminStatsApi = {
  // [관리자] 대시보드 통계
  getAdminStats: () => {
    return axiosClient.get("/dashboard/admin");
  },
  // [사업자] 대시보드 통계
  getOwnerStats: () => {
    return axiosClient.get("/dashboard/owner");
  },
};

export default adminStatsApi;