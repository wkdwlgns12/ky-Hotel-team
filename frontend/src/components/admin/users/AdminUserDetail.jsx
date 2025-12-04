import StatusBadge from "../../common/StatusBadge";

const AdminUserDetail = ({ user }) => {
  if (!user) return null;

  return (
    <div className="user-detail">
      <div className="card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '20px' }}>
        <img 
          src={user.avatar || "/api/placeholder/avatar.jpg"} 
          alt={user.name} 
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', background:'#eee' }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>{user.name}</h2>
            <StatusBadge status={user.status} type="user" />
          </div>
          <p style={{ color: '#666' }}>{user.email}</p>
          <div style={{ marginTop: '10px' }}>
            <span className={`badge ${user.type === 'business' ? 'badge-info' : 'badge-secondary'}`}>
              {user.type === 'business' ? '🏢 사업자 회원' : '👤 일반 회원'}
            </span>
            <span className="badge badge-warning" style={{ marginLeft: '8px' }}>{user.grade} 등급</span>
          </div>
        </div>
      </div>

      <div className="grid-2-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card">
          <h3>상세 정보</h3>
          <div className="detail-section">
            <div className="detail-row">
              <div className="label">연락처</div>
              <div className="value">{user.phone}</div>
            </div>
            <div className="detail-row">
              <div className="label">성별</div>
              <div className="value">{user.gender === 'male' ? '남성' : '여성'}</div>
            </div>
            <div className="detail-row">
              <div className="label">가입일</div>
              <div className="value">{user.joinDate}</div>
            </div>
            <div className="detail-row">
              <div className="label">최근 접속</div>
              <div className="value">{new Date(user.lastLogin).toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>활동 요약</h3>
          <div className="detail-section">
            <div className="detail-row">
              <div className="label">총 예약 횟수</div>
              <div className="value">{user.totalBookings}회</div>
            </div>
            <div className="detail-row">
              <div className="label">총 결제 금액</div>
              <div className="value" style={{color: '#2563eb', fontWeight:'bold'}}>₩{user.totalSpent?.toLocaleString()}</div>
            </div>
            {user.type === 'business' && user.businessInfo && (
              <>
                <div className="detail-row" style={{ marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                  <div className="label">회사명</div>
                  <div className="value">{user.businessInfo.companyName}</div>
                </div>
                <div className="detail-row">
                  <div className="label">사업자번호</div>
                  <div className="value">{user.businessInfo.businessNumber}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetail;