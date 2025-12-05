import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // URL 파라미터 추출 (?token=...&role=...)
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const role = params.get("role");
    const error = params.get("error");

    if (error) {
      alert(`로그인 실패: ${decodeURIComponent(error)}`);
      navigate("/auth/login");
      return;
    }

    if (token) {
      localStorage.setItem("token", token);
      // 역할 정보 임시 저장 (이후 /auth/me API 호출로 갱신됨)
      if (role) {
        localStorage.setItem("user", JSON.stringify({ role }));
      }

      // 역할별 리다이렉트
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "owner") navigate("/owner/dashboard");
      else navigate("/"); // 일반 유저 메인
    } else {
      navigate("/auth/login");
    }
  }, [location, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#3b82f6'
    }}>
      로그인 처리 중입니다... 잠시만 기다려주세요.
    </div>
  );
};

export default AuthCallback;