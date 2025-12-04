import axiosClient from "./axiosClient";

export const adminHotelApi = {
  // [사업자] 내 호텔 목록
  getHotels: (params) => {
    // 사업자용 경로가 기본
    return axiosClient.get("/hotel/owner", { params });
  },
  // [사업자] 호텔 생성
  createHotel: (data) => {
    return axiosClient.post("/hotel/owner", data);
  },
  // [사업자] 호텔 수정
  updateHotel: (hotelId, data) => {
    return axiosClient.patch(`/hotel/owner/${hotelId}`, data);
  },
  // [사업자] 호텔 삭제 (필요시 백엔드 구현 확인 필요, 현재는 owner 경로로 추정)
  deleteHotel: (hotelId) => {
    // 백엔드에 delete route가 명시되지 않았다면 구현 필요. 
    // 우선 owner 경로로 요청.
    return axiosClient.delete(`/hotel/owner/${hotelId}`); 
  },
  
  // [관리자] 승인 대기 호텔 목록
  getPendingHotels: () => {
    return axiosClient.get("/hotel/admin/pending");
  },
  // [관리자] 호텔 상세 (관리자용 상세 조회가 없다면 owner/admin 공용 로직 확인 필요)
  // 임시로 owner 경로 또는 별도 구현된 public 경로 사용
  getHotelById: (hotelId) => {
    return axiosClient.get(`/hotel/owner/${hotelId}`); // 혹은 /hotel/${hotelId} (공용)
  },
  // [관리자] 승인
  approveHotel: (hotelId) => {
    return axiosClient.patch(`/hotel/admin/${hotelId}/approve`);
  },
  // [관리자] 반려
  rejectHotel: (hotelId, reason) => {
    return axiosClient.patch(`/hotel/admin/${hotelId}/reject`, { reason });
  },
};

export default adminHotelApi;