import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminCouponForm from "../../components/admin/coupons/AdminCouponForm";
import { adminCouponApi } from "../../api/adminCouponApi";
import { adminUserApi } from "../../api/adminUserApi"; // 유저 API 추가

const AdminCouponCreatePage = () => {
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);

  // 컴포넌트 마운트 시 사업자 목록 조회
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        // role='owner'인 유저만 가져옴 (백엔드 user/service.js 필터링 로직 필요)
        const res = await adminUserApi.getUsers({ role: "owner" });
        setOwners(res.items || []);
      } catch (err) {
        console.error("사업자 목록 로드 실패:", err);
      }
    };
    fetchOwners();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      // 폼 데이터 그대로 전송 (API 내부에서 필드 매핑 처리됨)
      // 주의: 백엔드 coupon/service.js는 'ownerId'라는 키로 받도록 되어있으므로
      // Form에서 name='ownerId'로 관리하는 것이 맞습니다.
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
      {/* 조회한 owners를 폼에 전달 */}
      <AdminCouponForm
        owners={owners}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AdminCouponCreatePage;