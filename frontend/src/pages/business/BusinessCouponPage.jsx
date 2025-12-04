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
      const couponsData = data.data?.coupons || data.coupons || [];
      setCoupons(couponsData);
    } catch (err) {
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
        <h1>🎫 쿠폰 관리</h1>
      </div>

      <AdminCouponTable coupons={coupons} readOnly={true} />
    </div>
  );
};

export default BusinessCouponPage;