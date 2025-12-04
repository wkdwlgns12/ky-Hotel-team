import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAuthApi } from "../../api/adminAuthApi"; // 위에서 수정한 API import

const BusinessSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "", // 백엔드 모델에 있다면 전송, 없다면 제외
    businessNumber: "" // 백엔드 모델에 있다면 전송
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 백엔드: POST /api/auth/owner/register
      // 필요한 필드만 골라서 전송
      await adminAuthApi.businessSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        // phone: formData.phone // 백엔드 User 모델에 phone 필드가 있다면 주석 해제
      });
      
      alert("가입이 완료되었습니다. 로그인해주세요.");
      navigate("/auth/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
      alert("가입 실패: " + (error.message || "알 수 없는 오류"));
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>파트너 입점 신청</h2>
        <form onSubmit={handleSubmit}>
          {/* ... 입력 필드들 (이름, 이메일, 비번, 비번확인) ... */}
          {/* 기존 JSX 코드 유지하되 name 속성이 state와 일치하는지 확인 */}
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
          
          <button type="submit" className="btn btn-primary" style={{width:'100%', marginTop:'10px'}}>
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessSignupPage;