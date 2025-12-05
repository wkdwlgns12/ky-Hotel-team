import axiosClient from "./axiosClient";

export const adminReviewApi = {
  // [관리자] 전체 리뷰 조회
  getAdminReviews: (params) => {
    return axiosClient.get("/reviews/admin", { params });
  },
  // [관리자] 리뷰 삭제
  deleteReview: (reviewId) => {
    return axiosClient.delete(`/reviews/admin/${reviewId}`);
  },
  
  // [사업자] 내 호텔 리뷰 조회
  getOwnerReviews: (params) => {
    return axiosClient.get("/reviews/owner", { params });
  },
  // [사업자] 리뷰 답글 달기
  replyReview: (reviewId, comment) => {
    return axiosClient.post(`/reviews/owner/${reviewId}/reply`, { comment });
  }
};

export default adminReviewApi;