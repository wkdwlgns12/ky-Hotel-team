import axiosClient from "./axiosClient";

export const adminHotelApi = {
  // Owner
  getMyHotels: (params) => axiosClient.get("/hotel/owner", { params }),
  createHotel: (data) => axiosClient.post("/hotel/owner", data),
  updateHotel: (hotelId, data) => axiosClient.patch(`/hotel/owner/${hotelId}`, data),
  
  // Admin
  getPendingHotels: () => axiosClient.get("/hotel/admin/pending"),
  approveHotel: (hotelId) => axiosClient.patch(`/hotel/admin/${hotelId}/approve`),
  rejectHotel: (hotelId, reason) => axiosClient.patch(`/hotel/admin/${hotelId}/reject`, { reason }),
};