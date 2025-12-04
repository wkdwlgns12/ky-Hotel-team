import axiosClient from "./axiosClient";
import { mockStatsApi } from "./mockApi";

const USE_MOCK = false;

export const adminStatsApi = {
  getDashboardStats: () => {
    if (USE_MOCK) return mockStatsApi.getDashboardStats();
    return axiosClient.get("/dashboard/admin");
  },
};

export default adminStatsApi;