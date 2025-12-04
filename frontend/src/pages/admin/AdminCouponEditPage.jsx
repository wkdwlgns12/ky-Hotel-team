import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminCouponForm from "../../components/admin/coupons/AdminCouponForm";
import { adminCouponApi } from "../../api/adminCouponApi"; // API 임포트
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const AdminCouponEditPage = () => {
  const { couponId } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCoupon();
  }, [couponId]);

  const fetchCoupon = async () => {
    try {
      setLoading(true);
      // 목록에서 해당 쿠폰 찾기
      const data = await adminCouponApi.getCoupons();
      const coupons = data.data?.coupons || data.coupons || [];
      const foundCoupon = coupons.find(c => c.id === couponId || c._id === couponId);
      if (foundCoupon) {
        setCoupon(foundCoupon);
      } else {
        setError("쿠폰을 찾을 수 없습니다.");
      }
    } catch (err) {
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    alert("쿠폰 수정 기능은 현재 지원되지 않습니다. 쿠폰을 비활성화하고 새로 생성해주세요.");
    navigate("/admin/coupons");
  };

  const handleCancel = () => {
    navigate("/admin/coupons");
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCoupon} />;

  return (
    <div className="admin-coupon-edit-page">
      <div className="page-header">
        <h1>쿠폰 수정</h1>
      </div>
      <AdminCouponForm
        coupon={coupon}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AdminCouponEditPage;