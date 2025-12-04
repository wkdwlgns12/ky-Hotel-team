import axiosClient from "./axiosClient";
import { mockUserApi } from "./mockApi";

const USE_MOCK = false;

export const adminUserApi = {
  getUsers: (params) => {
    if (USE_MOCK) return mockUserApi.getUsers(params);
    return axiosClient.get("/user/admin", { params });
  },
  updateUser: (userId, data) => {
    if (USE_MOCK) return mockUserApi.updateUser(userId, data);
    return axiosClient.put(`/user/admin/${userId}`, data);
  },
};

export default adminUserApi;