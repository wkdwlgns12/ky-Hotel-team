import { useState, useEffect } from "react";
import { adminStatsApi } from "../../api/adminStatsApi";
import { useNavigate } from "react-router-dom";
import AdminChartArea from "../../components/admin/dashboard/AdminChartArea";

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await adminStatsApi.getDashboardStats();
        const dashboard = data.data || data;
        setDashboardData(dashboard);
      } catch (error) {
        console.error("대시보드 데이터 로드 실패:", error);
        setDashboardData(null);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (loading) return <div className="loading">대시보드 로딩 중...</div>;
  
  if (!dashboardData) {
    return (
      <div className="admin-dashboard-page">
        <div className="page-header">
          <h1>📊 관리자 대시보드</h1>
        </div>
        <div className="card" style={{padding: '40px', textAlign: 'center'}}>
          <p>데이터를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  // 통계 카드 데이터 (backend 응답 형식에 맞게 수정)
  const statsCards = [
    { title: "운영중인 호텔", value: `${dashboardData.hotels?.approved || 0}개`, change: `대기: ${dashboardData.hotels?.pending || 0}개`, positive: true, icon: "🏨", color: "#f59e0b" },
    { title: "이번 달 총 매출", value: `₩${(dashboardData.revenue?.last30DaysTotal || 0).toLocaleString()}`, change: `예약: ${dashboardData.revenue?.last30DaysCount || 0}건`, positive: true, icon: "💰", color: "#10b981" },
    { title: "전체 회원", value: `${dashboardData.users?.total || 0}명`, change: `사업자: ${dashboardData.users?.owner || 0}명`, positive: true, icon: "👥", color: "#06b6d4" }
  ];

  return (
    <div className="admin-dashboard-page">
      <div className="page-header">
        <h1>📊 관리자 대시보드</h1>
      </div>

      {/* 통계 카드 (3열로 변경) */}
      <div className="stats-grid" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
        {statsCards.map((card, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-title">{card.title}</div>
              <div className="stat-icon" style={{ backgroundColor: `${card.color}20`, color: card.color }}>{card.icon}</div>
            </div>
            <div className="stat-value">{card.value}</div>
            <div className={`stat-change ${card.positive ? "positive" : "negative"}`}>
              {card.change} 전일 대비
            </div>
          </div>
        ))}
      </div>

      {/* 예약 통계 */}
      <div className="card" style={{marginBottom:'30px'}}>
        <div style={{marginBottom:'20px'}}>
          <h3 style={{marginBottom:0, borderLeft:'4px solid #3b82f6', paddingLeft:'10px'}}>📊 예약 현황</h3>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'15px'}}>
          <div style={{padding:'15px', background:'#f8fafc', borderRadius:'8px'}}>
            <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>전체</div>
            <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#1e293b'}}>{dashboardData.reservations?.total || 0}</div>
          </div>
          <div style={{padding:'15px', background:'#fef3c7', borderRadius:'8px'}}>
            <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>대기</div>
            <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#92400e'}}>{dashboardData.reservations?.pending || 0}</div>
          </div>
          <div style={{padding:'15px', background:'#d1fae5', borderRadius:'8px'}}>
            <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>확정</div>
            <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#065f46'}}>{dashboardData.reservations?.confirmed || 0}</div>
          </div>
          <div style={{padding:'15px', background:'#fee2e2', borderRadius:'8px'}}>
            <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>취소</div>
            <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#991b1b'}}>{dashboardData.reservations?.cancelled || 0}</div>
          </div>
        </div>
      </div>

      {/* 호텔 통계 */}
      <div className="dashboard-sections">
        <div className="card">
          <div style={{marginBottom:'15px', paddingBottom:'10px', borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>🏨 호텔 현황</h3>
            <button className="btn btn-outline-sm" onClick={() => navigate('/admin/hotels')}>더보기</button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'15px'}}>
            <div style={{padding:'15px', background:'#f8fafc', borderRadius:'8px', textAlign:'center'}}>
              <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>전체</div>
              <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#1e293b'}}>{dashboardData.hotels?.total || 0}</div>
            </div>
            <div style={{padding:'15px', background:'#fef3c7', borderRadius:'8px', textAlign:'center'}}>
              <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>승인 대기</div>
              <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#92400e'}}>{dashboardData.hotels?.pending || 0}</div>
            </div>
            <div style={{padding:'15px', background:'#d1fae5', borderRadius:'8px', textAlign:'center'}}>
              <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>운영중</div>
              <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#065f46'}}>{dashboardData.hotels?.approved || 0}</div>
            </div>
            <div style={{padding:'15px', background:'#fee2e2', borderRadius:'8px', textAlign:'center'}}>
              <div style={{fontSize:'0.9rem', color:'#64748b', marginBottom:'5px'}}>거부</div>
              <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#991b1b'}}>{dashboardData.hotels?.rejected || 0}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;