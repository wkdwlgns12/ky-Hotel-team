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
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/business/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "이메일 또는 비밀번호를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 style={{textAlign:'center', marginBottom:'10px'}}>통합 로그인</h2>
        <p style={{textAlign:'center', color:'#666', marginBottom:'2rem'}}>관리자 및 파트너(사업자)</p>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message" style={{color:'red', marginBottom:'10px', textAlign:'center'}}>{error}</div>}

          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@hotel.com"
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

          <button type="submit" className="btn btn-primary" disabled={loading} style={{width:'100%', padding:'10px', marginTop:'10px'}}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div style={{marginTop:'30px', paddingTop:'20px', borderTop:'1px solid #eee', textAlign:'center'}}>
          <p style={{marginBottom:'10px', color:'#555'}}>아직 파트너 계정이 없으신가요?</p>
          <Link to="/business/signup" className="btn btn-outline" style={{display:'inline-block', width:'100%', textDecoration:'none', padding:'10px', boxSizing:'border-box'}}>
            파트너 입점 신청하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;