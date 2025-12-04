import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminCouponForm from "../../components/admin/coupons/AdminCouponForm";
import { adminCouponApi } from "../../api/adminCouponApi";
import Loader from "../../components/common/Loader";

const BusinessCouponDetailPage = () => {
  const { couponId } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        setLoading(true);
        const data = await adminCouponApi.getCouponById(couponId);
        setCoupon(data);
      } catch (err) {
        alert("쿠폰 정보를 불러올 수 없습니다.");
        navigate("/owner/coupons");
      } finally {
        setLoading(false);
      }
    };
    fetchCoupon();
  }, [couponId, navigate]);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="business-coupon-detail">
      <div className="page-header">
        <h1>🎫 쿠폰 상세 정보</h1>
      </div>
      {/* readOnly 모드로 폼 재사용 */}
      <AdminCouponForm 
        coupon={coupon} 
        readOnly={true} 
        onCancel={() => navigate("/owner/coupons")} 
      />
    </div>
  );
};

export default BusinessCouponDetailPage;