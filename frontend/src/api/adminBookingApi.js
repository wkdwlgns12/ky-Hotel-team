import axiosClient from "./axiosClient";

export const adminBookingApi = {
  // [관리자] 전체 예약 목록
  getBookings: (params) => {
    return axiosClient.get("/reservation/admin", { params });
  },
  // [사업자] 내 호텔 예약 목록
  getOwnerBookings: (params) => {
    return axiosClient.get("/reservation/owner", { params });
  },
  // [공통] 상태 변경
  updateBookingStatus: (bookingId, status) => {
    return axiosClient.patch(`/reservation/${bookingId}/status`, { status });
  },
  // [공통] 예약 취소 (status: cancelled로 처리)
  cancelBooking: (bookingId, reason) => {
    return axiosClient.patch(`/reservation/${bookingId}/status`, { 
      status: "cancelled", 
      reason 
    });
  },
  // 상세 조회 (백엔드 라우트에 따라 수정 가능)
  getBookingById: (bookingId) => {
    return axiosClient.get(`/reservation/${bookingId}`);
  }
};

export default adminBookingApi;