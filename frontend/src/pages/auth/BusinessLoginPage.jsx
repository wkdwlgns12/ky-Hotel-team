import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { adminAuthApi } from "../../api/adminAuthApi";

const BusinessLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(formData);
      // role에 따라 다른 대시보드로 리다이렉트
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "owner") {
        navigate("/owner/dashboard");
      } else {
        // 기본값은 owner 대시보드
        navigate("/owner/dashboard");
      }
    } catch (err) {
      setError(err.message || "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}>
        <div className="login-container">
            <h2>파트너 센터 로그인</h2>
            <form onSubmit={handleLogin}>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group"><label>이메일</label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
                <div className="form-group"><label>비밀번호</label><input type="password" name="password" value={formData.password} onChange={handleChange} required /></div>
                <button className="btn btn-primary" style={{width:'100%'}} disabled={loading}>{loading ? "로그인 중..." : "로그인"}</button>
            </form>
            <div style={{marginTop:'20px', textAlign:'center'}}>
                <Link to="/owner/signup" style={{color:'#3b82f6', textDecoration:'none', fontWeight:'600'}}>
                    아직 파트너가 아니신가요? 입점 신청하기 &rarr;
                </Link>
            </div>
        </div>
    </div>
  );
};
export default BusinessLoginPage;