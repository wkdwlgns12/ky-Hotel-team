import { useEffect, useState } from "react";
import { adminReviewApi } from "../../api/adminReviewApi";
import Loader from "../../components/common/Loader";

const BusinessReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [activeReviewId, setActiveReviewId] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // [백엔드] GET /api/reviews/owner
      const response = await adminReviewApi.getOwnerReviews();
      setReviews(Array.isArray(response) ? response : response.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReplySubmit = async (reviewId) => {
    if (!replyText.trim()) return;
    try {
      // [백엔드] POST /api/reviews/owner/:id/reply
      await adminReviewApi.replyReview(reviewId, replyText);
      alert("답글이 등록되었습니다.");
      setReplyText("");
      setActiveReviewId(null);
      fetchReviews();
    } catch (error) {
      alert("답글 등록 실패: " + error.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-container">
      <h2>리뷰 관리</h2>
      <div className="review-list">
        {reviews.map((review) => (
          <div key={review._id} className="card" style={{ marginBottom: "1rem" }}>
            <div className="review-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{review.guestName || "Guest"}</strong>
              <span>평점: {review.rating}</span>
            </div>
            <p className="review-content" style={{ margin: '10px 0' }}>{review.content}</p>
            
            {/* 답글 표시 */}
            {review.reply ? (
              <div className="review-reply" style={{ background: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>
                <strong>사장님 답글:</strong> {review.reply}
              </div>
            ) : (
              // 답글 작성 폼
              <div className="reply-form">
                {activeReviewId === review._id ? (
                  <div style={{ marginTop: '10px' }}>
                    <textarea 
                      value={replyText} 
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="답글을 입력하세요"
                      style={{ width: '100%', padding: '8px' }}
                    />
                    <div style={{ marginTop: '5px' }}>
                      <button className="btn btn-sm btn-primary" onClick={() => handleReplySubmit(review._id)}>등록</button>
                      <button className="btn btn-sm btn-secondary" onClick={() => setActiveReviewId(null)} style={{ marginLeft: '5px' }}>취소</button>
                    </div>
                  </div>
                ) : (
                  <button className="btn btn-sm btn-outline" onClick={() => setActiveReviewId(review._id)}>
                    답글 달기
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        {reviews.length === 0 && <p>등록된 리뷰가 없습니다.</p>}
      </div>
    </div>
  );
};

export default BusinessReviewPage;