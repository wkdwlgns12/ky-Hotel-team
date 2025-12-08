import { useState, useEffect } from "react";
import { adminReviewApi } from "../../api/adminReviewApi";
import AdminReviewTable from "../../components/admin/reviews/AdminReviewTable";
import Loader from "../../components/common/Loader";

const AdminReviewListPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 'pending' 상태인 (오너가 이관한) 신고 리뷰만 로드
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await adminReviewApi.getAdminReportedReviews({ status: "pending" });
      setReviews(data.items || []);
    } catch (error) {
      console.error("리뷰 로딩 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 신고 승인 -> 리뷰 삭제됨
  const handleApprove = async (id) => {
    if (confirm("이 신고를 승인하시겠습니까?\n승인 시 해당 리뷰는 영구 삭제됩니다.")) {
      try {
        await adminReviewApi.approveReviewReport(id);
        alert("신고가 승인되어 리뷰가 삭제되었습니다.");
        fetchReviews();
      } catch(e) { 
        alert(e.message || "처리 실패"); 
      }
    }
  };

  // 신고 반려 -> 리뷰 유지됨 (신고 상태만 해제)
  const handleReject = async (id) => {
    if (confirm("이 신고를 반려하시겠습니까?\n반려 시 리뷰는 삭제되지 않고 유지됩니다.")) {
      try {
        await adminReviewApi.rejectReviewReport(id);
        alert("신고가 반려되었습니다.");
        fetchReviews();
      } catch(e) { 
        alert(e.message || "처리 실패"); 
      }
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>⚖️ 리뷰 신고 심사</h1>
      </div>
      
      <div className="info-box" style={{marginBottom: '20px', padding: '15px', background: '#e0f2fe', borderRadius: '8px', color: '#075985'}}>
        💡 사업자가 부적절하다고 판단하여 관리자에게 신고(이관)한 리뷰 목록입니다. 내용을 확인 후 삭제 여부를 결정해주세요.
      </div>

      <AdminReviewTable 
        reviews={reviews} 
        onApprove={handleApprove} 
        onReject={handleReject} 
      />
    </div>
  );
};

export default AdminReviewListPage;