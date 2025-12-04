import axiosClient from "./axiosClient";

export const adminUserApi = {
  // [관리자] 전체 회원 목록 조회
  getUsers: (params) => {
    // Backend: GET /api/user/admin
    return axiosClient.get("/user/admin", { params });
  },

  // [관리자] 회원 정보 수정 (상태 변경 등)
  updateUser: (userId, data) => {
    // Backend: PUT /api/user/admin/:userId
    return axiosClient.put(`/user/admin/${userId}`, data);
  },
  
  // 회원 상세 조회 (필요 시)
  getUserById: (userId) => {
    return axiosClient.get(`/user/admin/${userId}`);
  },
  
  // 회원 삭제 (백엔드 라우트에 현재 없으므로 확인 필요)
  deleteUser: (userId) => {
    return axiosClient.delete(`/user/admin/${userId}`);
  },
};

export default adminUserApi;