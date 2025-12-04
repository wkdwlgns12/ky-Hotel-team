import { useState, useEffect } from "react";
import { adminHotelApi } from "../../api/adminHotelApi";
import { useNavigate } from "react-router-dom";

const AdminHotelListPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", status: "", region: "" });
  const navigate = useNavigate();

  useEffect(() => { loadHotels(); }, [filters]);

  const loadHotels = async () => {
    try {
      setLoading(true);
      const data = await adminHotelApi.getPendingHotels(filters);
      // 데이터가 배열인지 확인하고 설정 (안전장치)
      const hotelList = Array.isArray(data.data?.hotels) ? data.data.hotels : (Array.isArray(data.hotels) ? data.hotels : (Array.isArray(data) ? data : []));
      setHotels(hotelList);
    } catch (error) { 
      console.error("로드 실패", error);
      setHotels([]); // 에러 시 빈 배열로 설정하여 렌더링 오류 방지
    } 
    finally { setLoading(false); }
  };

  const handleStatusChange = async (hotelId, newStatus) => {
    if(!confirm(`정말 ${newStatus === 'approved' ? '승인' : '거부'} 하시겠습니까?`)) return;
    try {
      if (newStatus === "approved") await adminHotelApi.approveHotel(hotelId);
      else if (newStatus === "rejected") await adminHotelApi.rejectHotel(hotelId, "관리자 거부");
      loadHotels();
    } catch (error) { alert("처리 실패"); }
  };

  const getStatusBadge = (status) => {
    const map = { approved: { l: "운영중", c: "success" }, pending: { l: "승인대기", c: "warning" }, rejected: { l: "승인거부", c: "danger" } };
    const conf = map[status] || { l: status, c: "secondary" };
    return <span className={`badge badge-${conf.c}`}>{conf.l}</span>;
  };

  return (
    <div className="admin-hotel-page">
      <div className="page-header">
        <h1>🏨 승인 대기 호텔 관리</h1>
      </div>

      <div className="filter-section card" style={{padding:'20px'}}>
        <div className="filter-grid" style={{display:'flex', gap:'15px', alignItems:'center'}}>
          <div style={{position:'relative', flex:1}}>
            <span style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', fontSize:'1.2rem'}}>🔍</span>
            <input 
              type="text" 
              placeholder="호텔명으로 검색하세요..." 
              value={filters.search} 
              onChange={(e) => setFilters({...filters, search: e.target.value})} 
              style={{width:'100%', padding:'12px 12px 12px 40px', border:'2px solid #e2e8f0', borderRadius:'30px', fontSize:'1rem', outline:'none'}}
            />
          </div>
          
          <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} style={{padding:'10px', borderRadius:'8px', border:'1px solid #ddd'}}>
            <option value="">전체 상태</option>
            <option value="approved">운영중</option>
            <option value="pending">승인대기</option>
            <option value="rejected">승인거부</option>
          </select>
          <select value={filters.region} onChange={(e) => setFilters({...filters, region: e.target.value})} style={{padding:'10px', borderRadius:'8px', border:'1px solid #ddd'}}>
            <option value="">전체 지역</option>
            <option value="서울">서울</option>
            <option value="부산">부산</option>
            <option value="제주">제주</option>
            <option value="경기">경기</option>
          </select>
        </div>
      </div>

      {loading ? <div className="loading">로딩 중...</div> : (
        <div className="hotels-grid">
          {hotels.length > 0 ? (
            hotels.map(hotel => (
              <div key={hotel.id} className="hotel-card">
                <div className="hotel-image">
                  {/* ★ 수정된 부분: 이미지가 배열이고 비어있지 않은지 확인 후 접근 ★ */}
                  <img 
                    src={(hotel.images && hotel.images.length > 0) ? hotel.images[0] : "/api/placeholder/hotel.jpg"} 
                    alt={hotel.name || "호텔"} 
                  />
                  <div className="hotel-status">{getStatusBadge(hotel.status)}</div>
                </div>
                <div className="hotel-content">
                  <h3 className="hotel-name">{hotel.name}</h3>
                  <p className="hotel-address">📍 {hotel.address}</p>
                  <div className="hotel-info">
                    <span>{hotel.category}</span>
                    <span>⭐ {hotel.rating}</span>
                    <span>🛏️ {hotel.rooms}실</span>
                  </div>
                  <div className="hotel-actions">
                    <button className="btn btn-outline-sm" onClick={() => navigate(`/admin/hotels/${hotel.id}/edit`)}>📋 상세보기</button>
                    {hotel.status === "pending" && (
                      <>
                        <button className="btn btn-success-sm" onClick={() => handleStatusChange(hotel.id, "approved")}>승인</button>
                        <button className="btn btn-danger-sm" onClick={() => handleStatusChange(hotel.id, "rejected")}>거부</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state" style={{gridColumn: "1 / -1", textAlign: "center", padding: "40px"}}>
              <p>등록된 호텔이 없습니다.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminHotelListPage;