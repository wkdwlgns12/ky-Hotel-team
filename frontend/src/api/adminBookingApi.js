import axiosClient from "./axiosClient";

export const adminBookingApi = {
  // [관리자] 전체 예약 목록 조회
  getBookings: (params) => {
    // Backend: GET /api/reservation/admin
    return axiosClient.get("/reservation/admin", { params });
  },

  // [사업자] 내 호텔 예약 목록 조회
  getOwnerBookings: (params) => {
    // Backend: GET /api/reservation/owner
    return axiosClient.get("/reservation/owner", { params });
  },

  // [공통] 예약 상세 조회 (필요 시 구현, 현재 백엔드 파일에는 목록/상태변경만 보임)
  getBookingById: (bookingId) => {
    // 예시 경로 - 백엔드에 구현되어 있는지 확인 필요
    return axiosClient.get(`/reservation/${bookingId}`);
  },

  // [공통] 예약 상태 변경 (승인, 취소 등)
  updateBookingStatus: (bookingId, status) => {
    // Backend: PATCH /api/reservation/:id/status
    return axiosClient.patch(`/reservation/${bookingId}/status`, { status });
  },

  // [공통] 예약 취소 (상태 변경 로직 활용)
  cancelBooking: (bookingId, reason) => {
    // Backend: PATCH /api/reservation/:id/status
    return axiosClient.patch(`/reservation/${bookingId}/status`, { 
      status: "cancelled", 
      reason 
    });
  },
};

export default adminBookingApi;