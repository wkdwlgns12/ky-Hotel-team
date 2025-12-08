import { useAdminAuth } from "../../hooks/useAdminAuth";
import AdminProfileForm from "../../components/admin/settings/AdminProfileForm";
import { adminUserApi } from "../../api/adminUserApi";

const AdminMyProfilePage = () => {
  const { adminInfo } = useAdminAuth();

  const handleSubmit = async (formData) => {
    try {
      // 1. 기본 정보 수정
      await adminUserApi.updateMyInfo({
        name: formData.name,
        phone: formData.phone,
      });

      // 2. 비밀번호 변경 (입력된 경우에만)
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
          return;
        }
        await adminUserApi.changePassword({
          currentPassword: formData.password, // 현재 비밀번호 (검증용)
          newPassword: formData.newPassword
        });
      }

      alert("정보가 성공적으로 수정되었습니다.");
      window.location.reload(); // 변경된 정보 반영을 위해 새로고침
    } catch (err) {
      alert(err.message || "정보 수정에 실패했습니다.");
    }
  };

  return (
    <div className="admin-my-profile-page">
      <div className="page-header">
        <h1>👤 내 정보 관리</h1>
      </div>
      <AdminProfileForm profile={adminInfo} onSubmit={handleSubmit} />
    </div>
  );
};

export default AdminMyProfilePage;