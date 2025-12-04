import StatusBadge from "../../common/StatusBadge";

const AdminHotelDetail = ({ hotel }) => {
  if (!hotel) return null;

  return (
    <div className="hotel-detail-view">
      {/* 헤더 정보 */}
      <div className="card" style={{ borderLeft: '5px solid #3b82f6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', fontWeight: '700' }}>{hotel.name}</h2>
            <p style={{ color: '#64748b' }}>📍 {hotel.address} | {hotel.region}</p>
          </div>
          <StatusBadge status={hotel.status} type="hotel" />
        </div>
      </div>

      <div className="grid-2-cols" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* 상세 정보 */}
        <div className="left-col">
          <div className="card">
            <h3 className="section-title" style={{fontSize:'1.1rem', borderLeft:'none', paddingLeft:0, marginBottom:'1rem'}}>기본 정보</h3>
            <div className="detail-section">
              <div className="detail-row"><div className="label">카테고리</div><div className="value">{hotel.category}</div></div>
              <div className="detail-row"><div className="label">객실 수</div><div className="value">{hotel.rooms}개 객실</div></div>
              <div className="detail-row"><div className="label">가격대</div><div className="value">₩{hotel.price?.min.toLocaleString()} ~ ₩{hotel.price?.max.toLocaleString()}</div></div>
              <div className="detail-row"><div className="label">설명</div><div className="value">{hotel.description}</div></div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="section-title" style={{fontSize:'1.1rem', borderLeft:'none', paddingLeft:0, marginBottom:'1rem'}}>편의 시설</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {hotel.amenities?.map((a, i) => (
                <span key={i} style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', color: '#475569' }}>✨ {a}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 우측 정보 - ★ 사업자 번호 강조 ★ */}
        <div className="right-col">
          <div className="card">
            <h3 className="section-title" style={{fontSize:'1.1rem', borderLeft:'none', paddingLeft:0, marginBottom:'1rem'}}>사업자 정보</h3>
            <div className="detail-section">
              <div className="detail-row" style={{flexDirection:'column', gap:'4px', borderBottom:'none', paddingBottom:'10px'}}>
                <div className="label" style={{width:'100%'}}>대표자/법인명</div>
                <div className="value" style={{fontWeight:'600'}}>{hotel.ownerInfo?.name || "정보 없음"}</div>
              </div>
              <div className="detail-row" style={{flexDirection:'column', gap:'4px', borderBottom:'none', paddingBottom:'10px', background:'#f8fafc', padding:'10px', borderRadius:'8px'}}>
                <div className="label" style={{width:'100%'}}>사업자 등록번호</div>
                <div className="value" style={{fontWeight:'bold', color:'#3b82f6', fontSize:'1.1rem'}}>
                  {hotel.ownerInfo?.businessNumber || "등록 안됨"}
                </div>
              </div>
              <div className="detail-row" style={{flexDirection:'column', gap:'4px', borderBottom:'none', paddingTop:10}}>
                <div className="label" style={{width:'100%'}}>연락처</div>
                <div className="value">{hotel.contact?.phone}</div>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="section-title" style={{fontSize:'1.1rem', borderLeft:'none', paddingLeft:0, marginBottom:'1rem'}}>이미지</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {hotel.images?.map((img, i) => (
                <img key={i} src={img} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHotelDetail;