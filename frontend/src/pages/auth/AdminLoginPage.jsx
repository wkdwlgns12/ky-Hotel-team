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
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "owner") navigate("/owner/dashboard");
      else navigate("/"); // 일반 유저는 메인으로
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "이메일 또는 비밀번호를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // 백엔드 라우트로 이동 -> 백엔드가 OAuth Provider로 리다이렉트
    window.location.href = `http://localhost:3000/api/auth/${provider}`;
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 style={{textAlign:'center', marginBottom:'10px'}}>통합 로그인</h2>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message" style={{color:'red', textAlign:'center', marginBottom:10}}>{error}</div>}
          <div className="form-group">
            <label>이메일</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="example@hotel.com" />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{width:'100%', padding:'10px'}}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div style={{marginTop:'20px', borderTop:'1px solid #eee', paddingTop:'20px'}}>
          <p style={{textAlign:'center', fontSize:'0.9rem', color:'#666', marginBottom:'10px'}}>소셜 계정으로 로그인</p>
          <div style={{display:'flex', gap:'10px', justifyContent:'center'}}>
            <button onClick={() => handleSocialLogin('kakao')} style={{background:'#FEE500', border:'none', padding:'8px 16px', borderRadius:'4px', cursor:'pointer', fontWeight:'bold'}}>Kakao</button>
            <button onClick={() => handleSocialLogin('naver')} style={{background:'#03C75A', color:'white', border:'none', padding:'8px 16px', borderRadius:'4px', cursor:'pointer', fontWeight:'bold'}}>Naver</button>
            <button onClick={() => handleSocialLogin('google')} style={{background:'#fff', border:'1px solid #ddd', padding:'8px 16px', borderRadius:'4px', cursor:'pointer', fontWeight:'bold'}}>Google</button>
          </div>
        </div>

        <div style={{marginTop:'20px', textAlign:'center'}}>
          <Link to="/owner/signup" className="btn btn-outline" style={{width:'100%'}}>파트너 입점 신청</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;