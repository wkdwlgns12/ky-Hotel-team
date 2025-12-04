import { useState, useEffect } from "react";

const AdminProfileForm = ({ profile, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", department: "", role: "",
    password: "", newPassword: "", confirmPassword: ""
  });

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        department: "운영팀", // 예시 데이터
        role: "최고 관리자"
      }));
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-settings">
      <div className="grid-2-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* 프로필 요약 */}
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#cbd5e1', margin: '0 auto 20px', overflow: 'hidden' }}>
            <img src={profile?.avatar || "/api/placeholder/avatar.jpg"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h3>{formData.name}</h3>
          <p style={{ color: '#64748b', marginBottom: '10px' }}>{formData.email}</p>
          <span className="badge badge-info">{formData.role}</span>
        </div>

        {/* 상세 정보 폼 */}
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="card">
          <div className="section-title">👤 기본 정보</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div className="form-group">
              <label>이름</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>부서</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>이메일 (변경 불가)</label>
              <input type="email" value={formData.email} disabled style={{ background: '#f1f5f9' }} />
            </div>
            <div className="form-group">
              <label>연락처</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="section-title">🔑 보안 설정</div>
          <div className="form-group">
            <label>새 비밀번호</label>
            <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="변경시에만 입력" />
          </div>
          <div className="form-group">
            <label>비밀번호 확인</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="새 비밀번호 확인" />
          </div>

          <div style={{ textAlign: 'right' }}>
            <button type="submit" className="btn btn-primary">정보 수정 저장</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfileForm;