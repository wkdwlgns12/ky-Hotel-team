import axiosClient from "./axiosClient";
import { mockHotelApi } from "./mockApi";

const USE_MOCK = false;

export const adminHotelApi = {
  getPendingHotels: (params) => {
    if (USE_MOCK) return mockHotelApi.getHotels(params);
    return axiosClient.get("/hotel/admin/pending", { params });
  },
  approveHotel: (hotelId) => {
    if (USE_MOCK) return mockHotelApi.approveHotel(hotelId);
    return axiosClient.patch(`/hotel/admin/${hotelId}/approve`);
  },
  rejectHotel: (hotelId, reason) => {
    if (USE_MOCK) return mockHotelApi.rejectHotel(hotelId, reason);
    return axiosClient.patch(`/hotel/admin/${hotelId}/reject`, { reason });
  },
};

export default adminHotelApi;