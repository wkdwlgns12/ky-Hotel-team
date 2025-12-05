import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { adminAuthApi } from "../../api/adminAuthApi";
import "../../styles/admin.scss"; // 스타일 재사용

const BusinessSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 백엔드: POST /api/auth/owner/register
      // 필요한 필드: name, email, password
      await adminAuthApi.businessSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      alert("가입이 완료되었습니다. 로그인해주세요.");
      navigate("/auth/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
      alert("가입 실패: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>파트너 입점 신청</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>이름 (대표자명)</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="홍길동"
            />
          </div>
          <div className="form-group">
            <label>이메일</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="partner@example.com"
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
          <div className="form-group">
            <label>비밀번호 확인</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{width:'100%', marginTop:'10px'}}>
            가입하기
          </button>
        </form>
        <div style={{textAlign:'center', marginTop:'15px'}}>
          <Link to="/auth/login" style={{textDecoration:'none', color:'#3b82f6'}}>
            이미 계정이 있으신가요? 로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignupPage;