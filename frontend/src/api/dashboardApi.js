import axiosClient from "./axiosClient";

export const dashboardApi = {
  // 관리자: 대시보드 데이터
  getAdminDashboard: async () => {
    return await axiosClient.get("/dashboard/admin");
  },

  // 사업자: 대시보드 데이터
  getOwnerDashboard: async () => {
    return await axiosClient.get("/dashboard/owner");
  },
};

export default dashboardApi;

