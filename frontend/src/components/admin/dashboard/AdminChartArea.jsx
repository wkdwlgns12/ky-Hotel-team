import React from "react";

const AdminChartArea = ({ data }) => {
  // 1. 백엔드 데이터가 차트용 배열이 아니라 '합계 객체'로 들어오는 경우 처리
  // 백엔드 응답 예시: { last30DaysTotal: 150000, last30DaysCount: 5 }
  const isAggregatedData = data && typeof data.last30DaysTotal === 'number';
  
  if (isAggregatedData) {
    return (
      <div className="chart-section card" style={{ 
        padding: "20px", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "300px",
        textAlign: "center" 
      }}>
        <h3 style={{ color: "#64748b", marginBottom: "15px", fontSize: "1.1rem" }}>
          최근 30일 매출 현황
        </h3>
        <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#2563eb", marginBottom: "10px" }}>
          ₩ {data.last30DaysTotal.toLocaleString()}
        </div>
        <div style={{ fontSize: "1rem", color: "#475569" }}>
          총 <span style={{ fontWeight: "bold", color: "#0f172a" }}>{data.last30DaysCount}</span>건의 결제 완료
        </div>
        <p style={{ marginTop: "25px", fontSize: "0.8rem", color: "#94a3b8", background: "#f1f5f9", padding: "8px 12px", borderRadius: "20px" }}>
          ℹ️ 일별 상세 추이는 추후 업데이트될 예정입니다.
        </p>
      </div>
    );
  }

  // 2. 백엔드가 차트용 배열 데이터를 정상적으로 보내주는 경우 (기존 로직 유지)
  const revenue = Array.isArray(data?.revenue) ? data.revenue : [];
  const labels = Array.isArray(data?.labels) ? data.labels : [];

  if (revenue.length === 0) {
    return (
      <div className="chart-section" style={{ 
        height: '300px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#aaa',
        background: '#f8fafc',
        borderRadius: '8px'
      }}>
        데이터가 충분하지 않습니다.
      </div>
    );
  }

  const maxRevenue = Math.max(...revenue) || 100;

  return (
    <div className="chart-section">
      <div style={{ 
        width: '100%', 
        display: 'flex', 
        alignItems: 'flex-end', 
        justifyContent: 'space-between', 
        height: '250px', 
        gap: '10px',
        paddingTop: '20px'
      }}>
        {labels.map((label, idx) => {
          constHZ = revenue[idx] || 0;
          const heightPercentage = (val / maxRevenue) * 100;
          
          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%' }}>
              <div style={{
                marginTop: 'auto', 
                marginBottom: '6px', 
                fontSize: '11px',
                fontWeight: 'bold', 
                color: '#475569'
              }}>
                {val.toLocaleString()}
              </div>
              <div style={{
                width: '100%', 
                height: `${heightPercentage}%`, 
                background: '#3b82f6', 
                borderRadius: '4px 4px 0 0', 
                opacity: 0.8,
                transition: 'height 0.3s ease'
              }}></div>
              <div style={{ marginTop: '10px', fontSize: '11px', color: '#64748b' }}>
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminChartArea;