import axiosClient from "./axiosClient";

export const adminReviewApi = {
  // [사업자] 유저가 신고한 리뷰 목록 조회
  getOwnerReportedReviews: (params) => {
    return axiosClient.get("/reviews/owner/reported", { params });
  },
  // [사업자] 리뷰를 관리자에게 이관(신고)
  escalateReview: (reviewId, reason) => {
    return axiosClient.patch(`/reviews/owner/${reviewId}/escalate`, { reason });
  },
  // [관리자] 신고된 리뷰 목록 조회
  getAdminReportedReviews: (params) => {
    return axiosClient.get("/reviews/admin/reported", { params });
  },
  // [관리자] 신고 승인 (리뷰 삭제)
  approveReviewReport: (reviewId) => {
    return axiosClient.patch(`/reviews/admin/${reviewId}/approve-report`);
  },
  // [관리자] 신고 반려 (리뷰 유지)
  rejectReviewReport: (reviewId) => {
    return axiosClient.patch(`/reviews/admin/${reviewId}/reject-report`);
  }
};

export default adminReviewApi;