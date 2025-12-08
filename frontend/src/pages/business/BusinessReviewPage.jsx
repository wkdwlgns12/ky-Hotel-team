import { useEffect, useState } from "react";
import { adminReviewApi } from "../../api/adminReviewApi";
import Loader from "../../components/common/Loader";

const BusinessReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 백엔드: GET /api/reviews/owner/reported (유저가 신고한 내 호텔 리뷰 조회)
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await adminReviewApi.getOwnerReportedReviews();
      setReviews(res.items || res.data?.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 백엔드: PATCH /api/reviews/owner/:reviewId/escalate (관리자에게 이관)
  const handleEscalate = async (reviewId) => {
    const reason = prompt("관리자에게 신고할 사유를 입력하세요 (예: 욕설, 허위사실):");
    if (!reason) return;

    try {
      await adminReviewApi.escalateReview(reviewId, reason);
      alert("관리자에게 신고가 접수되었습니다.");
      fetchReviews(); // 목록 갱신
    } catch (e) {
      alert(e.message || "신고 처리에 실패했습니다.");
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🚨 리뷰 신고 관리</h1>
      </div>
      <div className="info-box" style={{marginBottom: '20px', padding: '15px', background: '#f1f5f9', borderRadius: '8px', color: '#475569', fontSize: '0.9rem'}}>
        💡 고객이 신고한 리뷰 목록입니다. 내용을 확인하고 '관리자에게 신고' 버튼을 누르면 관리자가 검토 후 삭제할 수 있습니다.
      </div>

      <div className="review-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {reviews.length > 0 ? reviews.map((review) => (
          <div key={review._id} className="card" style={{ 
            borderLeft: review.isEscalatedByOwner ? '5px solid #f59e0b' : '5px solid #ef4444',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{review.hotelId?.name}</span>
              <span style={{ color: '#f59e0b' }}>{"⭐".repeat(review.rating)}</span>
            </div>
            
            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '6px', margin: '10px 0', fontSize: '0.95rem' }}>
              {review.comment}
            </div>
            
            <div style={{ fontSize: '0.9rem', color: '#b91c1c', marginBottom: '15px' }}>
              <strong>⚠️ 고객 신고 사유:</strong> {review.userReportReason || "사유 없음"}
            </div>

            <div style={{ textAlign: 'right' }}>
              {review.isEscalatedByOwner ? (
                <span className="badge badge-warning" style={{ padding: '8px 12px' }}>
                  ⏳ 관리자 심사 대기중
                </span>
              ) : (
                <button 
                  className="btn btn-danger-sm" 
                  onClick={() => handleEscalate(review._id)}
                  style={{ padding: '8px 16px' }}
                >
                  📢 관리자에게 삭제 요청 (신고)
                </button>
              )}
            </div>
          </div>
        )) : (
          <div className="empty-state card" style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>
            접수된 신고 리뷰가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessReviewPage;