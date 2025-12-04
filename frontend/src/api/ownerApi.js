import axiosClient from "./axiosClient";
import { mockStatsApi, mockHotelApi, mockBookingApi, mockReviewApi, mockCouponApi } from "./mockApi";

const USE_MOCK = false;

export const ownerApi = {
  // Dashboard
  getDashboardStats: () => {
    if (USE_MOCK) return mockStatsApi.getDashboardStats();
    return axiosClient.get("/dashboard/owner");
  },

  // Hotel
  getMyHotels: () => {
    if (USE_MOCK) return mockHotelApi.getHotels();
    return axiosClient.get("/hotel/owner");
  },
  createHotel: (data) => {
    if (USE_MOCK) return mockHotelApi.createHotel(data);
    return axiosClient.post("/hotel/owner", data);
  },
  updateHotel: (hotelId, data) => {
    if (USE_MOCK) return mockHotelApi.updateHotel(hotelId, data);
    return axiosClient.patch(`/hotel/owner/${hotelId}`, data);
  },

  // Reservation
  getReservations: (params) => {
    if (USE_MOCK) return mockBookingApi.getBookings(params);
    return axiosClient.get("/reservation/owner", { params });
  },
  updateReservationStatus: (reservationId, status) => {
    if (USE_MOCK) return mockBookingApi.updateBookingStatus(reservationId, status);
    return axiosClient.patch(`/reservation/${reservationId}/status`, { status });
  },

  // Review
  getReportedReviews: (params) => {
    if (USE_MOCK) return mockReviewApi.getReviews(params);
    return axiosClient.get("/reviews/owner/reported", { params });
  },
  escalateReview: (reviewId) => {
    if (USE_MOCK) return mockReviewApi.reportReview(reviewId);
    return axiosClient.patch(`/reviews/owner/${reviewId}/escalate`);
  },

  // Coupon
  getCoupons: () => {
    if (USE_MOCK) return mockCouponApi.getCoupons();
    return axiosClient.get("/coupons/owner");
  },

  // Room
  getRoomsByHotel: (hotelId) => {
    if (USE_MOCK) return Promise.resolve({ rooms: [] });
    return axiosClient.get(`/room/owner/hotel/${hotelId}`);
  },
  createRoom: (hotelId, data) => {
    if (USE_MOCK) return Promise.resolve({ room: data });
    return axiosClient.post(`/room/owner/${hotelId}`, data);
  },
  updateRoom: (roomId, data) => {
    if (USE_MOCK) return Promise.resolve({ room: data });
    return axiosClient.patch(`/room/owner/${roomId}`, data);
  },
  deleteRoom: (roomId) => {
    if (USE_MOCK) return Promise.resolve();
    return axiosClient.delete(`/room/owner/${roomId}`);
  },
};

export default ownerApi;

