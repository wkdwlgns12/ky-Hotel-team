import { useAdminAuth } from "../../hooks/useAdminAuth";
import AdminProfileForm from "../../components/admin/settings/AdminProfileForm";
import { adminUserApi } from "../../api/adminUserApi"; // 유저 API 활용

const BusinessMyProfilePage = () => {
  const { adminInfo } = useAdminAuth();

  const handleSubmit = async (formData) => {
    try {
      // 1. 기본 정보(이름, 전화번호) 수정
      // 백엔드: PUT /api/user/me
      await adminUserApi.updateMyInfo({
        name: formData.name,
        phone: formData.phone,
        // 이메일, 사업자번호는 수정 불가 (백엔드 로직에 따름)
      });

      // 2. 비밀번호 변경 (입력된 경우에만 수행)
      // 백엔드: PUT /api/user/me/password
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
          return;
        }
        await adminUserApi.changePassword({
          currentPassword: formData.password, // 현재 비밀번호 (본인 확인용)
          newPassword: formData.newPassword
        });
      }

      alert("정보가 성공적으로 수정되었습니다.");
      window.location.reload(); // 변경된 정보 반영을 위해 새로고침
    } catch (err) {
      console.error(err);
      alert(err.message || "정보 수정에 실패했습니다.");
    }
  };

  return (
    <div className="business-profile-page">
      <div className="page-header">
        <h1>👤 내 정보 관리</h1>
      </div>
      
      {/* 관리자용 폼 컴포넌트 재사용 (구조가 동일함) */}
      <AdminProfileForm profile={adminInfo} onSubmit={handleSubmit} />
    </div>
  );
};

export default BusinessMyProfilePage;