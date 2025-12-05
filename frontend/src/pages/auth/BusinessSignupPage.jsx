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
    businessNumber: "",
    phone: ""
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
      // role: owner 는 API 내부에서 처리하거나 명시
      await adminAuthApi.businessSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        businessNumber: formData.businessNumber
      });
      alert("파트너 가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/auth/login");
    } catch (error) {
      const msg = error.response?.data?.message || "가입 중 오류가 발생했습니다.";
      alert("가입 실패: " + msg);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container" style={{maxWidth:'500px'}}>
        <h2 style={{textAlign:'center'}}>파트너 입점 신청</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>이름 (대표자명)</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>이메일</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>비밀번호 확인</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>연락처</label>
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="010-0000-0000" />
          </div>
          <div className="form-group">
            <label>사업자 등록번호</label>
            <input name="businessNumber" value={formData.businessNumber} onChange={handleChange} placeholder="000-00-00000" />
          </div>
          <button type="submit" className="btn btn-primary" style={{width:'100%', marginTop:'15px'}}>가입하기</button>
        </form>
        <div style={{textAlign:'center', marginTop:'15px'}}>
          <Link to="/auth/login">이미 계정이 있으신가요? 로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignupPage;