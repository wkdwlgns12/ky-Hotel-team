import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminCouponTable from "../../components/admin/coupons/AdminCouponTable";
import { ownerApi } from "../../api/ownerApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const BusinessCouponPage = () => {
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
      const data = await ownerApi.getCoupons();
      
      // ✅ 수정된 부분: 백엔드가 보내주는 'items' 배열을 찾도록 변경
      const couponsData = data.items || data.data?.items || [];
      
      setCoupons(couponsData);
    } catch (err) {
      console.error(err);
      setError("쿠폰 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCoupons} />;

  return (
    <div className="admin-coupon-list-page">
      <div className="page-header">
        <h1>🎫 내 쿠폰 관리</h1>
      </div>

      {/* 사업자는 삭제 권한 없이 조회(readOnly)만 가능하도록 설정됨 (필요시 false로 변경) */}
      <AdminCouponTable coupons={coupons} readOnly={true} />
    </div>
  );
};

export default BusinessCouponPage;