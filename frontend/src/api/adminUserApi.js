import axiosClient from "./axiosClient";

export const adminUserApi = {
  // [관리자] 전체 유저 목록
  getUsers: (params) => {
    return axiosClient.get("/user/admin", { params });
  },
  // [관리자] 유저 정보 수정 (권한 등)
  updateUser: (userId, data) => {
    return axiosClient.put(`/user/admin/${userId}`, data);
  },
  // [공통] 내 정보 수정
  updateMyInfo: (data) => {
    return axiosClient.put("/user/me", data);
  },
  // [공통] 비밀번호 변경
  changePassword: (data) => {
    return axiosClient.put("/user/me/password", data);
  }
};

export default adminUserApi;