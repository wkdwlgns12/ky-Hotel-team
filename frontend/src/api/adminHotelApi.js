import axiosClient from "./axiosClient";

export const adminHotelApi = {
  // [사업자] 내 호텔 목록 조회
  // GET /api/hotel/owner
  getMyHotels: (params) => {
    return axiosClient.get("/hotel/owner", { params });
  },

  // [사업자] 호텔 생성
  // POST /api/hotel/owner
  createHotel: (data) => {
    return axiosClient.post("/hotel/owner", data);
  },

  // [사업자] 호텔 정보 수정
  // PATCH /api/hotel/owner/:hotelId
  updateHotel: (hotelId, data) => {
    return axiosClient.patch(`/hotel/owner/${hotelId}`, data);
  },

  // [관리자] 승인 대기중인 호텔 목록 조회
  // GET /api/hotel/admin/pending
  getPendingHotels: () => {
    return axiosClient.get("/hotel/admin/pending");
  },

  // [관리자] 호텔 입점 승인
  // PATCH /api/hotel/admin/:hotelId/approve
  approveHotel: (hotelId) => {
    return axiosClient.patch(`/hotel/admin/${hotelId}/approve`);
  },

  // [관리자] 호텔 입점 반려
  // PATCH /api/hotel/admin/:hotelId/reject
  rejectHotel: (hotelId, reason) => {
    return axiosClient.patch(`/hotel/admin/${hotelId}/reject`, { reason });
  },
};

export default adminHotelApi;