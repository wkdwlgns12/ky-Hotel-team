import { useState, useEffect } from "react";
import AdminCouponTable from "../../components/admin/coupons/AdminCouponTable";
import { ownerApi } from "../../api/ownerApi"; // 사업자용 API 사용
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const BusinessCouponPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      // 백엔드: GET /api/coupons/owner
      const res = await ownerApi.getCoupons();
      setCoupons(res.items || res.data?.items || []);
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
    <div className="page-container">
      <div className="page-header">
        <h1>🎫 보유 쿠폰 현황</h1>
      </div>
      
      <div className="info-box" style={{marginBottom: '20px', padding: '15px', background: '#e0f2fe', borderRadius: '8px', color: '#0369a1', fontSize: '0.9rem'}}>
        ℹ️ 쿠폰 발행 및 관리는 관리자(Admin) 권한입니다. 여기서는 내 호텔에 적용된 쿠폰 목록을 확인할 수 있습니다.
      </div>

      {/* readOnly={true}를 전달하여 수정/삭제 버튼을 숨김 */}
      <AdminCouponTable coupons={coupons} readOnly={true} />
    </div>
  );
};

export default BusinessCouponPage;