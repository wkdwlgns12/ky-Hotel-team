import axiosClient from "./axiosClient";
import { mockReviewApi } from "./mockApi";

const USE_MOCK = false;

export const adminReviewApi = {
  getReportedReviews: (params) => {
    if (USE_MOCK) return mockReviewApi.getReviews(params);
    return axiosClient.get("/reviews/admin/reported", { params });
  },
  approveReviewReport: (reviewId) => {
    if (USE_MOCK) return mockReviewApi.deleteReview(reviewId);
    return axiosClient.patch(`/reviews/admin/${reviewId}/approve-report`);
  },
  rejectReviewReport: (reviewId) => {
    if (USE_MOCK) return mockReviewApi.rejectReport(reviewId);
    return axiosClient.patch(`/reviews/admin/${reviewId}/reject-report`);
  },
};

export default adminReviewApi;