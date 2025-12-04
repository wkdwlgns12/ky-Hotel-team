import { useState, useEffect } from "react";
import { ownerApi } from "../../api/ownerApi";

const BusinessDashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await ownerApi.getDashboardStats();
      const dashboard = res.data || res;
      setData(dashboard);
    } catch (error) {
      console.error(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  
  if (!data) {
    return (
      <div className="admin-dashboard-page">
        <div className="page-header">
          <h1>📊 파트너 대시보드</h1>
        </div>
        <div className="card" style={{padding: '40px', textAlign: 'center'}}>
          <p>데이터를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  // 통계 카드 데이터 (backend 응답 형식에 맞게 수정)
  const statsCards = [
    { title: "확정 예약", value: `${data.reservations?.confirmed || 0}건`, change: `대기: ${data.reservations?.pending || 0}건`, positive: true, icon: "📅", color: "#2563eb" },
    { title: "이번 달 매출", value: `₩${(data.revenue?.last30DaysTotal || 0).toLocaleString()}`, change: `예약: ${data.revenue?.last30DaysCount || 0}건`, positive: true, icon: "💰", color: "#10b981" },
    { title: "운영중인 호텔", value: `${data.hotels?.approved || 0}개`, change: `대기: ${data.hotels?.pending || 0}개`, positive: true, icon: "🏨", color: "#f59e0b" },
    { title: "전체 객실", value: `${data.rooms?.total || 0}개`, change: `활성: ${data.rooms?.active || 0}개`, positive: true, icon: "🛏️", color: "#06b6d4" },
  ];

  return (
    <div className="admin-dashboard-page">
      <div className="page-header">
        <h1>📊 파트너 대시보드</h1>
        <p style={{color:'#64748b'}}>내 호텔: 서울 그랜드 호텔</p>
      </div>
      
      <div className="stats-grid">
        {statsCards.map((card, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-header">
                <span className="stat-title">{card.title}</span>
                <div className="stat-icon" style={{backgroundColor:`${card.color}20`, color:card.color}}>{card.icon}</div>
            </div>
            <div className="stat-value">{card.value}</div>
          </div>
        ))}
      </div>

      {/* 예약 현황 */}
      <div className="card" style={{marginBottom:'30px'}}>
        <div style={{marginBottom:'20px'}}>
          <h3 style={{marginBottom:0, borderLeft:'4px solid #3b82f6', paddingLeft:'10px'}}>📊 예약 현황</h3>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'15px'}}>
          <div style={{padding:'15px', background:'#f8fafc', borderRadius:'8px'}}>
            <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>전체</div>
            <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#1e293b'}}>{data.reservations?.total || 0}</div>
          </div>
          <div style={{padding:'15px', background:'#fef3c7', borderRadius:'8px'}}>
            <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>대기</div>
            <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#92400e'}}>{data.reservations?.pending || 0}</div>
          </div>
          <div style={{padding:'15px', background:'#d1fae5', borderRadius:'8px'}}>
            <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>확정</div>
            <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#065f46'}}>{data.reservations?.confirmed || 0}</div>
          </div>
          <div style={{padding:'15px', background:'#dbeafe', borderRadius:'8px'}}>
            <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>완료</div>
            <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#1e40af'}}>{data.reservations?.completed || 0}</div>
          </div>
        </div>
      </div>

      {/* 호텔 현황 */}
      <div className="card">
        <div style={{marginBottom:'20px'}}>
          <h3 style={{marginBottom:0, borderLeft:'4px solid #3b82f6', paddingLeft:'10px'}}>🏨 호텔 현황</h3>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'15px'}}>
          <div style={{padding:'15px', background:'#f8fafc', borderRadius:'8px', textAlign:'center'}}>
            <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>전체</div>
            <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#1e293b'}}>{data.hotels?.total || 0}</div>
          </div>
          <div style={{padding:'15px', background:'#fef3c7', borderRadius:'8px', textAlign:'center'}}>
            <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>승인 대기</div>
            <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#92400e'}}>{data.hotels?.pending || 0}</div>
          </div>
          <div style={{padding:'15px', background:'#d1fae5', borderRadius:'8px', textAlign:'center'}}>
            <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>운영중</div>
            <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#065f46'}}>{data.hotels?.approved || 0}</div>
          </div>
          <div style={{padding:'15px', background:'#fee2e2', borderRadius:'8px', textAlign:'center'}}>
            <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>거부</div>
            <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#991b1b'}}>{data.hotels?.rejected || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboardPage;