const AdminReviewDetail = ({ review }) => {
  if (!review) return null;

  return (
    <div className="review-detail">
      <div className="card">
        <div className="review-header" style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
          <h2 style={{ marginBottom: '10px' }}>{review.title}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '14px' }}>
            <span>작성자: {review.guestName} ({review.guestEmail})</span>
            <span>작성일: {new Date(review.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <div className="review-info" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>호텔명:</span> {review.hotelName}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>평점:</span>
            <span style={{ color: '#f59e0b', fontSize: '18px' }}>{"⭐".repeat(review.rating)}</span>
            <span style={{ color: '#666' }}>({review.rating}점)</span>
          </div>
        </div>

        <div className="review-content" style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', minHeight: '100px', marginBottom: '20px' }}>
          {review.comment}
        </div>

        {review.images && review.images.length > 0 && (
          <div className="review-images" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {review.images.map((img, idx) => (
              <img key={idx} src={img} alt={`review-${idx}`} style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
            ))}
          </div>
        )}

        {review.reported && (
          <div className="report-info" style={{ background: '#fef2f2', padding: '15px', borderRadius: '8px', border: '1px solid #fca5a5', color: '#b91c1c' }}>
            <strong>🚨 신고된 리뷰입니다</strong>
            <p style={{ margin: '5px 0 0' }}>사유: {review.reportReason || "부적절한 내용"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviewDetail;