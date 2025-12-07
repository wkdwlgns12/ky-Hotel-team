import { useEffect, useState } from "react";
import { adminReviewApi } from "../../api/adminReviewApi";
import Loader from "../../components/common/Loader";

const BusinessReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 백엔드에는 '오너용 리뷰 목록 전체 조회'가 없음 (review/service.js 참조).
  // 대신 '유저가 신고한 리뷰'를 보는 `getReportedReviewsForOwner`가 있음.
  // 또는 로직상 내 호텔의 리뷰를 다 불러오는 API가 필요한데 현재는 없음.
  // 따라서 **'유저가 신고하여 문제가 된 리뷰 목록'**을 보여주는 페이지로 구성합니다.
  
  const fetchReviews = async () => {
    setLoading(true);
    try {
      // GET /api/reviews/owner/reported
      const res = await adminReviewApi.getOwnerReportedReviews();
      setReviews(res.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleEscalate = async (reviewId) => {
    const reason = prompt("관리자에게 신고할 사유를 입력하세요 (예: 욕설, 허위사실):");
    if(!reason) return;

    try {
      await adminReviewApi.escalateReview(reviewId, reason);
      alert("관리자에게 신고 접수되었습니다.");
      fetchReviews();
    } catch(e) {
      alert(e.message);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🚨 신고된 리뷰 관리</h1>
      </div>
      <p style={{marginBottom:20, color:'#64748b'}}>
        사용자들로부터 신고가 접수된 리뷰 목록입니다. 내용을 확인하고 관리자에게 삭제 요청(이관)을 할 수 있습니다.
      </p>

      <div className="review-list">
        {reviews.length > 0 ? reviews.map((review) => (
          <div key={review._id} className="card" style={{borderLeft: review.isEscalatedByOwner ? '4px solid #f59e0b' : '4px solid #ef4444'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:10}}>
              <span style={{fontWeight:'bold'}}>{review.hotelId?.name}</span>
              <span style={{color:'#f59e0b'}}>{"⭐".repeat(review.rating)}</span>
            </div>
            <p style={{background:'#f8fafc', padding:10, borderRadius:6, margin:'10px 0'}}>{review.comment}</p>
            
            <div style={{fontSize:'0.9rem', color:'#b91c1c', marginBottom:10}}>
              <strong>⚠️ 유저 신고 사유:</strong> {review.userReportReason || "사유 없음"}
            </div>

            <div style={{textAlign:'right'}}>
              {review.isEscalatedByOwner ? (
                <span className="badge badge-warning">관리자 검토 대기중</span>
              ) : (
                <button className="btn btn-danger-sm" onClick={() => handleEscalate(review._id)}>
                  관리자에게 이관(삭제 요청)
                </button>
              )}
            </div>
          </div>
        )) : (
          <div className="empty-state card">접수된 신고 리뷰가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default BusinessReviewPage;