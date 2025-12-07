import axiosClient from "./axiosClient";

export const adminReviewApi = {
  // [사업자] 유저가 신고한(문제가 된) 내 호텔 리뷰 목록 조회
  // GET /api/reviews/owner/reported
  getOwnerReportedReviews: (params) => {
    return axiosClient.get("/reviews/owner/reported", { params });
  },

  // [사업자] 리뷰를 관리자에게 신고(이관)
  // PATCH /api/reviews/owner/:reviewId/escalate
  escalateReview: (reviewId, reason) => {
    return axiosClient.patch(`/reviews/owner/${reviewId}/escalate`, { reason });
  },

  // [관리자] 오너가 이관한(신고한) 리뷰 목록 조회
  // GET /api/reviews/admin/reported
  getAdminReportedReviews: (params) => {
    return axiosClient.get("/reviews/admin/reported", { params });
  },

  // [관리자] 신고 승인 (리뷰 삭제됨)
  // PATCH /api/reviews/admin/:reviewId/approve-report
  approveReviewReport: (reviewId) => {
    return axiosClient.patch(`/reviews/admin/${reviewId}/approve-report`);
  },

  // [관리자] 신고 반려 (리뷰 유지됨)
  // PATCH /api/reviews/admin/:reviewId/reject-report
  rejectReviewReport: (reviewId) => {
    return axiosClient.patch(`/reviews/admin/${reviewId}/reject-report`);
  },
};

export default adminReviewApi;