import { useState } from "react";

const BusinessSettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotification: true,
    smsNotification: true,
    marketingAgree: false,
    autoReply: false
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 백엔드 연결 시 API 호출 (예: axios.put('/api/owner/settings', settings))
    alert("설정이 저장되었습니다.");
  };

  return (
    <div className="card">
      <h2 style={{fontSize:'1.2rem', borderBottom:'1px solid #eee', paddingBottom:'10px', marginBottom:'20px'}}>⚙️ 사업자 설정</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="detail-section">
          <div className="detail-row" style={{justifyContent:'space-between', alignItems:'center', padding:'15px 0'}}>
            <div>
              <label style={{fontWeight:'bold', display:'block'}}>이메일 알림</label>
              <span style={{fontSize:'0.85rem', color:'#64748b'}}>예약 및 리뷰 관련 중요 알림을 이메일로 받습니다.</span>
            </div>
            <input type="checkbox" name="emailNotification" checked={settings.emailNotification} onChange={handleChange} style={{width:'20px', height:'20px'}} />
          </div>

          <div className="detail-row" style={{justifyContent:'space-between', alignItems:'center', padding:'15px 0'}}>
            <div>
              <label style={{fontWeight:'bold', display:'block'}}>SMS 알림</label>
              <span style={{fontSize:'0.85rem', color:'#64748b'}}>긴급한 예약 건에 대해 문자로 알림을 받습니다.</span>
            </div>
            <input type="checkbox" name="smsNotification" checked={settings.smsNotification} onChange={handleChange} style={{width:'20px', height:'20px'}} />
          </div>

          <div className="detail-row" style={{justifyContent:'space-between', alignItems:'center', padding:'15px 0'}}>
            <div>
              <label style={{fontWeight:'bold', display:'block'}}>자동 응답 설정</label>
              <span style={{fontSize:'0.85rem', color:'#64748b'}}>고객 문의 시 미리 설정된 메시지로 자동 응답합니다.</span>
            </div>
            <input type="checkbox" name="autoReply" checked={settings.autoReply} onChange={handleChange} style={{width:'20px', height:'20px'}} />
          </div>

          <div className="detail-row" style={{justifyContent:'space-between', alignItems:'center', padding:'15px 0', borderBottom:'none'}}>
            <div>
              <label style={{fontWeight:'bold', display:'block'}}>마케팅 정보 수신</label>
              <span style={{fontSize:'0.85rem', color:'#64748b'}}>플랫폼의 프로모션 및 혜택 정보를 받습니다.</span>
            </div>
            <input type="checkbox" name="marketingAgree" checked={settings.marketingAgree} onChange={handleChange} style={{width:'20px', height:'20px'}} />
          </div>
        </div>

        <div style={{marginTop:'20px', textAlign:'right'}}>
          <button type="submit" className="btn btn-primary">설정 저장</button>
        </div>
      </form>
    </div>
  );
};

export default BusinessSettingsPage;