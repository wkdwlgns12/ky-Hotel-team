import { useState, useEffect } from "react";
import { adminReviewApi } from "../../api/adminReviewApi";
import Loader from "../../components/common/Loader";

const AdminReviewListPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 'pending' 상태인 (오너가 이관한) 리뷰만 로드
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await adminReviewApi.getAdminReportedReviews({ status: "pending" });
      setReviews(data.items || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id) => {
    if (confirm("신고를 승인하시겠습니까? 리뷰는 영구 삭제됩니다.")) {
      try {
        await adminReviewApi.approveReviewReport(id);
        alert("리뷰가 삭제되었습니다.");
        fetchReviews();
      } catch(e) { alert(e.message); }
    }
  };

  const handleReject = async (id) => {
    if (confirm("신고를 반려하시겠습니까? 리뷰는 유지됩니다.")) {
      try {
        await adminReviewApi.rejectReviewReport(id);
        alert("신고가 반려되었습니다.");
        fetchReviews();
      } catch(e) { alert(e.message); }
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="page-container">
      <div className="page-header"><h1>⚖️ 리뷰 신고 심사</h1></div>
      
      <div className="table-wrapper card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>호텔명</th>
              <th>리뷰 내용</th>
              <th>오너 신고 사유</th>
              <th>작성자</th>
              <th>처리</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.hotelId?.name}</td>
                <td style={{maxWidth:'300px'}}>
                  <div style={{fontSize:'0.9rem'}}>{review.comment}</div>
                  <div style={{fontSize:'0.8rem', color:'#f59e0b'}}>{"⭐".repeat(review.rating)}</div>
                </td>
                <td style={{color:'#ef4444', fontWeight:'bold'}}>{review.ownerReportReason}</td>
                <td>{review.userId?.email}</td>
                <td>
                  <div style={{display:'flex', gap:'5px', flexDirection:'column'}}>
                    <button className="btn btn-danger-sm" onClick={() => handleApprove(review._id)}>삭제 승인</button>
                    <button className="btn btn-outline" style={{fontSize:'0.8rem'}} onClick={() => handleReject(review._id)}>신고 반려</button>
                  </div>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && <tr><td colSpan="5" style={{textAlign:'center', padding:20}}>심사 대기중인 리뷰가 없습니다.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviewListPage;