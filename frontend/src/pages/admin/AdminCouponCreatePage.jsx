import { useEffect, useState } from "react"; // useEffect, useState 추가
import { useNavigate } from "react-router-dom";
import AdminCouponForm from "../../components/admin/coupons/AdminCouponForm";
import { adminCouponApi } from "../../api/adminCouponApi";
import { adminUserApi } from "../../api/adminUserApi"; // 유저 API 추가

const AdminCouponCreatePage = () => {
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]); // 사업자 목록 상태

  // 사업자 목록 불러오기
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        // role이 owner인 유저만 조회
        const res = await adminUserApi.getUsers({ role: 'owner' });
        setOwners(res.items || []);
      } catch (err) {
        console.error("사업자 목록 로드 실패", err);
      }
    };
    fetchOwners();
  }, []);

  const handleSubmit = async (formData) => {
    try {
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
      {/* owners 목록을 폼 컴포넌트에 전달 */}
      <AdminCouponForm 
        owners={owners} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
    </div>
  );
};

export default AdminCouponCreatePage;