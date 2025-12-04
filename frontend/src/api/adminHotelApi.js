import axiosClient from "./axiosClient";

export const adminHotelApi = {
  // [관리자] 승인 대기 호텔 목록 조회
  getPendingHotels: () => {
    // Backend: GET /api/hotel/admin/pending
    return axiosClient.get("/hotel/admin/pending");
  },

  // [관리자] 호텔 승인
  approveHotel: (hotelId) => {
    // Backend: PATCH /api/hotel/admin/:hotelId/approve
    return axiosClient.patch(`/hotel/admin/${hotelId}/approve`);
  },

  // [관리자] 호텔 반려
  rejectHotel: (hotelId, reason) => {
    // Backend: PATCH /api/hotel/admin/:hotelId/reject
    return axiosClient.patch(`/hotel/admin/${hotelId}/reject`, { reason });
  },

  // [사업자] 내 호텔 목록 조회
  getMyHotels: () => {
    // Backend: GET /api/hotel/owner
    return axiosClient.get("/hotel/owner");
  },

  // [사업자] 호텔 등록 (입점 신청)
  createHotel: (data) => {
    // Backend: POST /api/hotel/owner
    return axiosClient.post("/hotel/owner", data);
  },

  // [사업자] 호텔 정보 수정
  updateHotel: (hotelId, data) => {
    // Backend: PATCH /api/hotel/owner/:hotelId
    return axiosClient.patch(`/hotel/owner/${hotelId}`, data);
  },
};

export default adminHotelApi;