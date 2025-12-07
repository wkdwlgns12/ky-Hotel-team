import adminHotelApi from "./adminHotelApi";
import adminRoomApi from "./adminRoomApi";
import adminCouponApi from "./adminCouponApi";
import adminReviewApi from "./adminReviewApi";
import adminStatsApi from "./adminStatsApi";
import adminBookingApi from "./adminBookingApi";

export const ownerApi = {
  // Dashboard
  getDashboardStats: adminStatsApi.getOwnerStats,

  // Hotel
  getMyHotels: adminHotelApi.getMyHotels,
  createHotel: adminHotelApi.createHotel,
  updateHotel: adminHotelApi.updateHotel,

  // Room
  getRoomsByHotel: adminRoomApi.getRoomsByHotel,
  createRoom: adminRoomApi.createRoom,
  updateRoom: adminRoomApi.updateRoom,
  deleteRoom: adminRoomApi.deleteRoom,

  // Coupon
  getCoupons: adminCouponApi.getOwnerCoupons,

  // Review
  getReportedReviews: adminReviewApi.getOwnerReportedReviews,
  escalateReview: adminReviewApi.escalateReview,

  // Booking
  getReservations: adminBookingApi.getOwnerBookings,
  updateReservationStatus: adminBookingApi.updateBookingStatus,
};

export default ownerApi;