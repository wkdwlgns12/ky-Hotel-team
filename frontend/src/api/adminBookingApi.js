import axiosClient from "./axiosClient";
import { mockBookingApi } from "./mockApi";

const USE_MOCK = false;

export const adminBookingApi = {
  getBookings: (params) => {
    if (USE_MOCK) return mockBookingApi.getBookings(params);
    return axiosClient.get("/reservation/admin", { params });
  },
  updateBookingStatus: (bookingId, status) => {
    if (USE_MOCK) return mockBookingApi.updateBookingStatus(bookingId, status);
    return axiosClient.patch(`/reservation/${bookingId}/status`, { status });
  },
};

export default adminBookingApi;