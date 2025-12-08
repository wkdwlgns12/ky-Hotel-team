import { useState } from "react";
import { adminUserApi } from "../../api/adminUserApi";

const BusinessSettingsPage = () => {
  const [passForm, setPassForm] = useState({ 
    current: "", 
    new: "", 
    confirm: "" 
  });

  const handlePassChange = async (e) => {
    e.preventDefault();
    
    if (passForm.new.length < 4) {
      return alert("비밀번호는 4자 이상이어야 합니다.");
    }
    if (passForm.new !== passForm.confirm) {
      return alert("새 비밀번호가 일치하지 않습니다.");
    }
    
    try {
      // 백엔드: PUT /api/user/me/password
      await adminUserApi.changePassword({
        currentPassword: passForm.current,
        newPassword: passForm.new
      });
      
      alert("비밀번호가 성공적으로 변경되었습니다. 보안을 위해 다시 로그인해주세요.");
      // 폼 초기화
      setPassForm({ current: "", new: "", confirm: "" });
    } catch (err) {
      alert(err.message || "비밀번호 변경 실패 (현재 비밀번호를 확인하세요)");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>⚙️ 설정</h1>
      </div>
      
      <div className="grid-2-cols" style={{ display: 'grid', gridTemplateColumns: '1fr', maxWidth: '600px', gap: '20px' }}>
        {/* 비밀번호 변경 섹션 */}
        <div className="card">
          <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>🔐 비밀번호 변경</h3>
          <form onSubmit={handlePassChange} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div className="form-group">
              <label>현재 비밀번호</label>
              <input 
                type="password" 
                value={passForm.current} 
                onChange={(e) => setPassForm({...passForm, current: e.target.value})} 
                required 
                placeholder="현재 사용중인 비밀번호"
              />
            </div>
            <div className="form-group">
              <label>새 비밀번호</label>
              <input 
                type="password" 
                value={passForm.new} 
                onChange={(e) => setPassForm({...passForm, new: e.target.value})} 
                required 
                placeholder="변경할 비밀번호"
              />
            </div>
            <div className="form-group">
              <label>새 비밀번호 확인</label>
              <input 
                type="password" 
                value={passForm.confirm} 
                onChange={(e) => setPassForm({...passForm, confirm: e.target.value})} 
                required 
                placeholder="한 번 더 입력"
              />
            </div>
            <div style={{ textAlign: 'right', marginTop: '10px' }}>
              <button type="submit" className="btn btn-primary">변경하기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessSettingsPage;