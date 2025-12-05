import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(formData);
      // 역할에 따라 페이지 이동 분기
      if (user.role === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/business/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>통합 로그인</h2>
        <p style={{color:'#666', marginBottom:'20px', textAlign:'center'}}>관리자 및 파트너(사업자)</p>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div style={{marginTop:'20px', textAlign:'center', borderTop:'1px solid #eee', paddingTop:'20px'}}>
          <p style={{marginBottom:'10px'}}>파트너로 입점하고 싶으신가요?</p>
          <Link to="/business/signup" className="btn btn-outline" style={{display:'inline-block', width:'100%', textAlign:'center'}}>
            파트너 입점 신청하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;