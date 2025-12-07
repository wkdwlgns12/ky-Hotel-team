const AdminChartArea = ({ data }) => {
  // 데이터가 없거나 배열이 아닐 경우 빈 배열로 처리 (에러 방지)
  const revenue = Array.isArray(data?.revenue) ? data.revenue : [];
  const labels = Array.isArray(data?.labels) ? data.labels : [];
  
  // 데이터가 하나도 없으면 안내 문구 표시
  if (revenue.length === 0) {
    return (
      <div className="chart-section" style={{height:'200px', display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa'}}>
        데이터가 충분하지 않습니다.
      </div>
    );
  }

  const maxRevenue = Math.max(...revenue) || 100;

  return (
    <div className="chart-section">
      <div style={{width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', gap: '10px'}}>
        {labels.map((label, idx) => {
          const val = revenue[idx] || 0;
          const heightPercentage = (val / maxRevenue) * 100;
          
          return (
            <div key={idx} style={{display:'flex', flexDirection:'column', alignItems:'center', flex:1, height:'100%'}}>
              <div style={{
                marginTop: 'auto', marginBottom: '6px', fontSize: '11px',
                fontWeight: 'bold', color: '#475569'
              }}>
                {val.toLocaleString()}
              </div>
              <div style={{
                width: '100%', height: `${heightPercentage}%`, 
                background: '#3b82f6', borderRadius: '4px 4px 0 0', opacity: 0.8
              }}></div>
              <div style={{marginTop:'10px', fontSize:'12px', color:'#64748b'}}>{label}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default AdminChartArea;