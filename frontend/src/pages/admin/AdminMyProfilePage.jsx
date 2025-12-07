import { useAdminAuth } from "../../hooks/useAdminAuth";
import AdminProfileForm from "../../components/admin/settings/AdminProfileForm";
import { adminUserApi } from "../../api/adminUserApi"; // API import 추가

const AdminMyProfilePage = () => {
  const { adminInfo } = useAdminAuth();

  const handleSubmit = async (formData) => {
    try {
      // 실제 API 호출 연결
      await adminUserApi.updateMyInfo({
        name: formData.name,
        phone: formData.phone,
        // 비밀번호 변경이 있는 경우 별도 처리 필요 (API가 분리되어 있으므로)
      });

      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          alert("새 비밀번호가 일치하지 않습니다.");
          return;
        }
        await adminUserApi.changePassword({
          currentPassword: formData.password, // 현재 비번 확인 필요
          newPassword: formData.newPassword
        });
      }

      alert("정보가 성공적으로 수정되었습니다.");
      window.location.reload(); // 정보 갱신을 위해 리로드
    } catch (err) {
      alert(err.message || "수정에 실패했습니다.");
    }
  };

  return (
    <div className="admin-my-profile-page">
      <div className="page-header">
        <h1>내 정보</h1>
      </div>
      <AdminProfileForm profile={adminInfo} onSubmit={handleSubmit} />
    </div>
  );
};

export default AdminMyProfilePage;