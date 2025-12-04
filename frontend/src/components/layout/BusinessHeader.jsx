import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const BusinessHeader = () => {
  const navigate = useNavigate();
  // ★ adminInfo를 가져옵니다 (여기에 로그인한 사용자 정보가 들어있습니다)
  const { adminInfo, logout } = useAdminAuth(); 

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="admin-header">
      <div className="admin-header-inner">
        <div className="header-left">
          <h2>사업자 페이지</h2>
        </div>
        <div className="header-right">
          {/* ★ 고정된 이름 대신 로그인 정보를 표시합니다 ★ */}
          {/* 정보가 있으면 '이름 사장님', 없으면 '사장님'으로 표시 */}
          <span>{adminInfo?.name ? `${adminInfo.name} 사장님` : "사장님"}</span>
          
          <button onClick={handleLogout} className="btn btn-outline">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};

export default BusinessHeader;