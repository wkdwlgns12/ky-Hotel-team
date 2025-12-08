import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminCouponTable from "../../components/admin/coupons/AdminCouponTable";
import { adminCouponApi } from "../../api/adminCouponApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const AdminCouponListPage = ({ readOnly = false }) => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await adminCouponApi.getCoupons();
      // 백엔드 응답에서 items 배열 추출
      const couponsData = res.items || res.data?.items || [];
      setCoupons(couponsData);
    } catch (err) {
      console.error(err);
      setError("쿠폰 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (couponId) => {
    if (!confirm("정말 이 쿠폰을 비활성화(삭제) 하시겠습니까?")) return;
    try {
      await adminCouponApi.deactivateCoupon(couponId);
      alert("쿠폰이 비활성화되었습니다.");
      fetchCoupons(); // 목록 새로고침
    } catch (err) {
      alert(err.message || "삭제에 실패했습니다.");
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCoupons} />;

  return (
    <div className="admin-coupon-list-page">
      <div className="page-header">
        <h1>🎫 쿠폰 관리 {readOnly && "(조회 전용)"}</h1>
        {/* 읽기 전용이 아닐 때만 생성 버튼 표시 */}
        {!readOnly && (
          <button
            onClick={() => navigate("/admin/coupons/new")}
            className="btn btn-primary"
          >
            + 쿠폰 생성
          </button>
        )}
      </div>

      <AdminCouponTable coupons={coupons} onDelete={handleDelete} readOnly={readOnly} />
    </div>
  );
};

export default AdminCouponListPage;