import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { adminAuthApi } from "../../api/adminAuthApi";

const BusinessSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    businessNumber: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await adminAuthApi.businessSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        businessNumber: formData.businessNumber
      });
      alert("파트너 가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      setError(err.message || "가입 처리에 실패했습니다.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container" style={{maxWidth:'500px'}}>
        <h2 style={{textAlign:'center', marginBottom:'20px'}}>파트너 입점 신청</h2>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message" style={{color:'red', marginBottom:'15px', textAlign:'center'}}>{error}</div>}

          <div className="form-group">
            <label>이름 (대표자명)</label>
            <input name="name" value={formData.name} onChange={handleChange} required placeholder="홍길동" />
          </div>

          <div className="form-group">
            <label>이메일</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="example@business.com" />
          </div>

          <div className="form-group">
            <label>연락처</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required placeholder="010-1234-5678" />
          </div>

          <div className="form-group">
            <label>사업자 등록번호</label>
            <input type="text" name="businessNumber" value={formData.businessNumber} onChange={handleChange} required placeholder="000-00-00000" />
          </div>

          <div className="form-group">
            <label>비밀번호</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>비밀번호 확인</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary" style={{width:'100%', marginTop:'10px'}}>
            가입하기
          </button>
        </form>

        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <Link to="/auth/login" style={{color:'#666'}}>이미 계정이 있으신가요? 로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignupPage;