import axiosClient from "./axiosClient";

export const adminCouponApi = {
  // [관리자] 쿠폰 목록
  getCoupons: (params) => {
    return axiosClient.get("/coupons/admin", { params });
  },
  // [관리자] 쿠폰 생성
  createCoupon: (data) => {
    return axiosClient.post("/coupons/admin", data);
  },
  // [관리자] 쿠폰 비활성화 (삭제 대신)
  deleteCoupon: (id) => {
    return axiosClient.patch(`/coupons/admin/${id}/deactivate`);
  },
  // [사업자] 내 쿠폰 목록
  getOwnerCoupons: () => {
    return axiosClient.get("/coupons/owner");
  },
  // 수정 (PUT)
  updateCoupon: (id, data) => {
    return axiosClient.put(`/coupons/admin/${id}`, data);
  }
};

export default adminCouponApi;