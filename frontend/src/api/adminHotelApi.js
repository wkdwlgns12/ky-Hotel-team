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
    // 백엔드 라우트에 맞춰 수정 필요 (현재 삭제 API 부재 시 예외 처리)
    // 임시로 owner 경로로 요청
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
  },
  
  // 상세 조회 (공용)
  getHotelById: (hotelId) => {
    // 백엔드 구조에 따라 경로 확인 필요. 임시로 owner 경로 사용
    return axiosClient.get(`/hotel/owner/${hotelId}`); 
  }
};

export default adminHotelApi;