import axiosClient from "./axiosClient";

export const adminHotelApi = {
  // [사업자] 내 호텔 목록
  getMyHotels: (params) => {
    return axiosClient.get("/hotel/owner", { params });
  },
  // [사업자] 호텔 등록
  createHotel: (data) => {
    return axiosClient.post("/hotel/owner", data);
  },
  // [사업자] 호텔 수정
  updateHotel: (hotelId, data) => {
    return axiosClient.patch(`/hotel/owner/${hotelId}`, data);
  },
  // [사업자] 호텔 삭제
  deleteHotel: (hotelId) => {
    // 백엔드 라우트가 있다면:
    return axiosClient.delete(`/hotel/owner/${hotelId}`); 
  },

  // [관리자] 승인 대기 목록
  getPendingHotels: () => {
    return axiosClient.get("/hotel/admin/pending");
  },
  // [관리자] 승인
  approveHotel: (hotelId) => {
    return axiosClient.patch(`/hotel/admin/${hotelId}/approve`);
  },
  // [관리자] 반려
  rejectHotel: (hotelId, reason) => {
    return axiosClient.patch(`/hotel/admin/${hotelId}/reject`, { reason });
  }
};

export default adminHotelApi;