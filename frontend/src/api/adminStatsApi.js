import axiosClient from "./axiosClient";

export const adminStatsApi = {
  // [관리자] 통계
  getAdminStats: () => {
    return axiosClient.get("/dashboard/admin");
  },
  // [사업자] 통계
  getOwnerStats: () => {
    return axiosClient.get("/dashboard/owner");
  }
};

export default adminStatsApi;