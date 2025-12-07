import axiosClient from "./axiosClient";

export const adminCouponApi = {
  // [관리자] 쿠폰 생성
  createCoupon: (data) => {
    return axiosClient.post("/coupons/admin", data);
  },
  // [관리자] 쿠폰 목록
  getCoupons: (params) => {
    return axiosClient.get("/coupons/admin", { params });
  },
  // [관리자] 쿠폰 비활성화
  deactivateCoupon: (id) => {
    return axiosClient.patch(`/coupons/admin/${id}/deactivate`);
  },
  // [사업자] 내 쿠폰 목록
  getOwnerCoupons: (params) => {
    return axiosClient.get("/coupons/owner", { params });
  },
  // 상세 조회 (임시: 목록에서 찾도록 하거나 추가 구현 필요)
  getCouponById: (id) => {
    // 백엔드에 단건 조회 API가 없다면 목록 호출 후 필터링해야 함
    // 여기서는 목록 API를 호출
    return axiosClient.get("/coupons/admin"); 
  }
};

export default adminCouponApi;