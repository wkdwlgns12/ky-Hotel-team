import { useState, useEffect } from "react";
import { ownerApi } from "../../api/ownerApi";
import Loader from "../../components/common/Loader";

const BusinessReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await ownerApi.getReportedReviews();
      const reviewsData = data.data?.reviews || data.reviews || [];
      setReviews(reviewsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReport = async (id) => {
    try {
      await ownerApi.escalateReview(id);
      alert("신고가 접수되었습니다. 관리자가 검토 후 처리합니다.");
      await loadReviews();
    } catch (error) {
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      <div className="page-header"><h1>⭐ 리뷰 관리 (내 호텔)</h1></div>
      <div className="card table-wrapper">
        <table className="admin-table">
          <thead><tr><th>작성자</th><th>내용</th><th>별점</th><th>상태 / 관리</th></tr></thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r.id}>
                <td>{r.guestName}</td>
                <td>
                    <div style={{fontWeight:'bold', color:'#334155'}}>{r.title}</div>
                    <div style={{fontSize:'0.9rem', color:'#64748b'}}>{r.comment}</div>
                    
                    {/* ★ 거부 사유 표시 ★ */}
                    {r.status === 'rejected' && r.adminResponse && (
                        <div style={{marginTop:'8px', padding:'8px', background:'#f3f4f6', borderRadius:'4px', fontSize:'0.85rem'}}>
                            <span style={{fontWeight:'bold', color:'#d97706'}}>✋ 신고 거부됨:</span> {r.adminResponse}
                        </div>
                    )}
                </td>
                <td style={{color:'#f59e0b'}}>{"⭐".repeat(r.rating)}</td>
                <td>
                  {/* 상태에 따른 버튼 표시 */}
                  {!r.reported && r.status !== 'rejected' && (
                    <button className="btn btn-warning-sm" onClick={() => handleReport(r.id)}>🚨 신고하기</button>
                  )}
                  
                  {r.reported && r.status === 'pending' && (
                    <span className="badge badge-warning">관리자 검토중</span>
                  )}

                  {r.status === 'rejected' && (
                    <span className="badge badge-secondary">신고 반려됨</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessReviewPage;