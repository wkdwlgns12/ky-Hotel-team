import { Link } from "react-router-dom";

const AdminReviewTable = ({ reviews, onApprove, onReject }) => {
  return (
    <div className="table-wrapper card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>호텔명</th>
            <th>신고 내용 (사유)</th>
            <th>작성자</th>
            <th>별점</th>
            <th style={{width: '200px'}}>신고 처리</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.hotelName}</td>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Link to={`/admin/reviews/${review.id}`} style={{ color: '#2563eb', fontWeight: 500, textDecoration:'none' }}>
                    {review.title}
                  </Link>
                  <span style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>{review.comment}</span>
                  {/* 신고 사유 표시 */}
                  <div style={{marginTop:'6px', fontSize:'0.8rem', color:'#ef4444', background:'#fef2f2', padding:'4px 8px', borderRadius:'4px', display:'inline-block'}}>
                    🚨 신고 사유: {review.reportReason}
                  </div>
                </div>
              </td>
              <td>{review.guestName}</td>
              <td style={{ color: '#f59e0b' }}>{"⭐".repeat(review.rating)}</td>
              <td>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {/* 승인 버튼 -> 리뷰 삭제 */}
                    <button 
                        className="btn btn-danger-sm" 
                        onClick={() => onApprove(review.id)}
                        title="신고를 승인하고 리뷰를 삭제합니다"
                    >
                        승인(삭제)
                    </button>
                    
                    {/* 거부 버튼 -> 사유 입력 */}
                    <button 
                        className="btn btn-outline" 
                        style={{fontSize:'0.8rem', padding:'4px 10px'}}
                        onClick={() => onReject(review.id)}
                        title="신고를 반려합니다"
                    >
                        거부(반려)
                    </button>
                </div>
              </td>
            </tr>
          )) : (
             <tr><td colSpan="5" style={{textAlign:'center', padding:'20px'}}>신고된 리뷰가 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviewTable;