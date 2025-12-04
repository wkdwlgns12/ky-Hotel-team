import { useState } from "react";

const AdminSystemConfigForm = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState({ ...config });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
      <div className="grid-2-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card">
          <div className="section-title">🌍 일반 설정</div>
          <div className="form-group">
            <label>사이트 이름</label>
            <input type="text" name="siteName" value={formData.siteName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>관리자 대표 이메일</label>
            <input type="email" name="siteEmail" value={formData.siteEmail} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>시간대 (Timezone)</label>
            <select>
              <option>Asia/Seoul</option>
              <option>UTC</option>
            </select>
          </div>
        </div>

        <div className="card">
          <div className="section-title">🔒 시스템 제어</div>
          <div className="detail-section">
            <div className="detail-row" style={{justifyContent:'space-between'}}>
              <label>예약 시스템 활성화</label>
              <input type="checkbox" name="bookingEnabled" checked={formData.bookingEnabled} onChange={handleChange} />
            </div>
            <div className="detail-row" style={{justifyContent:'space-between'}}>
              <label>리뷰 작성 허용</label>
              <input type="checkbox" name="reviewEnabled" checked={formData.reviewEnabled} onChange={handleChange} />
            </div>
            <div className="detail-row" style={{justifyContent:'space-between', background:'#fff1f2'}}>
              <label style={{color:'#ef4444', fontWeight:'bold'}}>유지보수 모드 (전체 차단)</label>
              <input type="checkbox" name="maintenanceMode" checked={formData.maintenanceMode} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px' }}>설정 저장</button>
      </div>
    </form>
  );
};

export default AdminSystemConfigForm;