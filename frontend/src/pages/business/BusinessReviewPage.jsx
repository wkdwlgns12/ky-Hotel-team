import { useEffect, useState } from "react";
import { adminReviewApi } from "../../api/adminReviewApi";
import Loader from "../../components/common/Loader";

const BusinessReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReportedReviews = async () => {
    setLoading(true);
    try {
      // 백엔드에는 '전체 리뷰' 조회 기능이 없고, '신고된 리뷰' 조회만 있음.
      // 따라서 '내가 신고한 리뷰 목록'을 보여주는 것으로 대체하거나,
      // 백엔드 API가 추가될 때까지 임시 처리.
      const response = await adminReviewApi.getOwnerReportedReviews();
      setReviews(Array.isArray(response.items) ? response.items : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportedReviews();
  }, []);

  // 답글 달기 기능은 백엔드에 구현되어 있지 않으므로 제거하거나 주석 처리
  
  if (loading) return <Loader />;

  return (
    <div className="page-container">
      <h2>신고된 리뷰 관리</h2>
      <p style={{color:'#666', marginBottom:'20px'}}>사용자가 신고하여 관리자에게 접수된 내 호텔 리뷰 목록입니다.</p>
      
      <div className="review-list">
        {reviews.length > 0 ? reviews.map((review) => (
          <div key={review._id} className="card" style={{ marginBottom: "1rem" }}>
            <div className="review-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{review.guestName || "Guest"}</strong>
              <span>평점: {review.rating}</span>
            </div>
            <p className="review-content" style={{ margin: '10px 0' }}>{review.comment}</p>
            <div style={{background:'#fef2f2', padding:'10px', borderRadius:'5px', fontSize:'0.9rem', color:'#b91c1c'}}>
                🚨 신고 사유: {review.userReportReason}
            </div>
          </div>
        )) : (
          <div className="empty-state">
            <p>신고된 리뷰가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessReviewPage;