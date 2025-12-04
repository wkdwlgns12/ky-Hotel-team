import axiosClient from "./axiosClient";
import { mockCouponApi } from "./mockApi";

const USE_MOCK = false;

export const adminCouponApi = {
  getCoupons: () => {
    if (USE_MOCK) return mockCouponApi.getCoupons();
    return axiosClient.get("/coupons/admin");
  },
  createCoupon: (data) => {
    if (USE_MOCK) return mockCouponApi.createCoupon(data);
    return axiosClient.post("/coupons/admin", data);
  },
  deactivateCoupon: (id) => {
    if (USE_MOCK) return mockCouponApi.deleteCoupon(id);
    return axiosClient.patch(`/coupons/admin/${id}/deactivate`);
  },
};

export default adminCouponApi;