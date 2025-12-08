import { Link } from "react-router-dom";

const AdminReviewTable = ({ reviews, onApprove, onReject }) => {
  return (
    <div className="table-wrapper card">
      <table className="admin-table">
        <thead>
          <tr>
            <th style={{ width: '15%' }}>호텔명</th>
            <th style={{ width: '40%' }}>리뷰 및 신고 사유</th>
            <th style={{ width: '15%' }}>작성자</th>
            <th style={{ width: '10%' }}>평점</th>
            <th style={{ width: '20%' }}>관리</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? reviews.map((review) => (
            <tr key={review._id}>
              {/* 호텔 이름 */}
              <td style={{ fontWeight: 'bold', color: '#475569' }}>
                {review.hotelId?.name || "알 수 없음"}
              </td>
              
              {/* 리뷰 내용 및 신고 사유 */}
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '0.95rem', color: '#334155' }}>
                    "{review.comment}"
                  </div>
                  {review.ownerReportReason && (
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: '#b91c1c', 
                      background: '#fef2f2', 
                      padding: '6px 10px', 
                      borderRadius: '6px',
                      borderLeft: '3px solid #ef4444'
                    }}>
                      🚨 <strong>신고 사유:</strong> {review.ownerReportReason}
                    </div>
                  )}
                </div>
              </td>

              {/* 작성자 정보 */}
              <td>
                <div>{review.userId?.name || "익명"}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{review.userId?.email}</div>
              </td>

              {/* 별점 */}
              <td>
                <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>
                  {"⭐".repeat(review.rating)}
                </span>
              </td>

              {/* 관리 버튼 */}
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <button 
                    className="btn btn-danger-sm" 
                    onClick={() => onApprove(review._id)}
                    title="리뷰를 삭제합니다"
                  >
                    삭제 승인 (Delete)
                  </button>
                  <button 
                    className="btn btn-outline" 
                    style={{ fontSize: '0.8rem', padding: '5px' }}
                    onClick={() => onReject(review._id)}
                    title="리뷰를 유지합니다"
                  >
                    신고 반려 (Keep)
                  </button>
                </div>
              </td>
            </tr>
          )) : (
             <tr>
               <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                 현재 심사 대기 중인 신고 리뷰가 없습니다.
               </td>
             </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviewTable;