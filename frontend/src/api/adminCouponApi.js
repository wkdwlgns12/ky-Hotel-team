import axiosClient from "./axiosClient";

export const adminCouponApi = {
  // [관리자] 쿠폰 목록 조회
  getCoupons: (params) => {
    // Backend: GET /api/coupons/admin
    return axiosClient.get("/coupons/admin", { params });
  },

  // [관리자] 쿠폰 생성
  createCoupon: (data) => {
    // Backend: POST /api/coupons/admin
    return axiosClient.post("/coupons/admin", data);
  },

  // [관리자] 쿠폰 비활성화 (삭제 대신 비활성화 사용)
  deleteCoupon: (id) => {
    // Backend: PATCH /api/coupons/admin/:id/deactivate
    return axiosClient.patch(`/coupons/admin/${id}/deactivate`);
  },

  // [사업자] 내 쿠폰 목록 조회
  getOwnerCoupons: () => {
    // Backend: GET /api/coupons/owner
    return axiosClient.get("/coupons/owner");
  },
  
  // 쿠폰 상세 조회 (백엔드 라우트에 명시되진 않았으나 필요 시 추가)
  getCouponById: (id) => {
    return axiosClient.get(`/coupons/admin/${id}`);
  },

  // 쿠폰 수정 (백엔드 라우트에 명시되진 않았으나 필요 시 추가)
  updateCoupon: (id, data) => {
     return axiosClient.put(`/coupons/admin/${id}`, data);
  }
};

export default adminCouponApi;