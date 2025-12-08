import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminCouponForm from "../../components/admin/coupons/AdminCouponForm";
import { adminCouponApi } from "../../api/adminCouponApi";
import { adminUserApi } from "../../api/adminUserApi";

const AdminCouponCreatePage = () => {
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 사업자 목록 조회 (쿠폰 발급 대상 선택용)
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        setLoading(true);
        // role='owner'인 유저만 가져옴
        const res = await adminUserApi.getUsers({ role: "owner", limit: 100 });
        setOwners(res.items || []);
      } catch (err) {
        console.error("사업자 목록 로드 실패:", err);
        alert("사업자 목록을 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchOwners();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      // 폼 데이터 전송 (필드명: name, code, discountAmount, minOrderAmount, validFrom, validTo, ownerId)
      await adminCouponApi.createCoupon(formData);
      alert("쿠폰이 성공적으로 생성되었습니다.");
      navigate("/admin/coupons");
    } catch (err) {
      alert(err.message || "생성에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/coupons");
  };

  return (
    <div className="admin-coupon-create-page">
      <div className="page-header">
        <h1>쿠폰 생성</h1>
      </div>
      
      {/* 조회한 owners 리스트를 폼 컴포넌트에 전달 */}
      <AdminCouponForm
        owners={owners}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AdminCouponCreatePage;