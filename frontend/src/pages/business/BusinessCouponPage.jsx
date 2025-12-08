import { useState, useEffect } from "react";
import AdminCouponTable from "../../components/admin/coupons/AdminCouponTable";
import { ownerApi } from "../../api/ownerApi";
import Loader from "../../components/common/Loader";

const BusinessCouponPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const data = await ownerApi.getCoupons();
        // 백엔드 응답 구조: { items: [], ... }
        setCoupons(data.items || []); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🎫 보유 쿠폰 목록</h1>
      </div>
      <div className="card" style={{padding:'15px', background:'#f1f5f9', marginBottom:'20px'}}>
        <p>ℹ️ 쿠폰은 관리자만 발행할 수 있습니다. 여기서는 발급된 쿠폰 현황만 확인 가능합니다.</p>
      </div>
      {/* readOnly={true}를 전달하여 삭제/수정 버튼 숨김 */}
      <AdminCouponTable coupons={coupons} readOnly={true} />
    </div>
  );
};

export default BusinessCouponPage;