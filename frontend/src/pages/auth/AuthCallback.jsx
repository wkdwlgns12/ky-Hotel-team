import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // URL 파라미터에서 토큰 추출
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const error = params.get("error");
    const role = params.get("role");

    if (token) {
      // 토큰 저장
      localStorage.setItem("token", token);
      // 유저 정보 간략 저장 (필요 시 API로 다시 조회)
      localStorage.setItem("user", JSON.stringify({ role }));

      // 역할에 따라 이동
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "owner") navigate("/business/dashboard");
      else navigate("/"); // 일반 유저
    } else {
      alert("로그인 실패: " + (error || "인증 정보가 없습니다."));
      navigate("/auth/login");
    }
  }, [location, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h2>로그인 처리 중입니다...</h2>
    </div>
  );
};

export default AuthCallback;