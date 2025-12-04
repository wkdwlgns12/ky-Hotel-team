import { useState, useEffect } from "react";
import AdminHotelForm from "../../components/admin/hotels/AdminHotelForm";
import AdminHotelDetail from "../../components/admin/hotels/AdminHotelDetail";
import { ownerApi } from "../../api/ownerApi";
import Loader from "../../components/common/Loader";

const BusinessMyHotelPage = () => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadMyHotel();
  }, []);

  const loadMyHotel = async () => {
    try {
      setLoading(true);
      const response = await ownerApi.getMyHotels();
      const hotels = response.data?.hotels || response.hotels || [];
      const myHotel = hotels.length > 0 ? hotels[0] : null;
      setHotel(myHotel);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (hotel) {
         // 수정 로직
         await ownerApi.updateHotel(hotel.id, formData);
         await loadMyHotel(); // 서버에서 최신 데이터 다시 가져오기
         alert("호텔 정보가 수정되었습니다.");
      } else {
         // 생성(신청) 로직
         await ownerApi.createHotel(formData);
         await loadMyHotel(); // 서버에서 최신 데이터 다시 가져오기
         alert("입점 신청이 완료되었습니다. 관리자 승인을 기다려주세요.");
      }
      setIsEditing(false);
    } catch (err) {
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <Loader fullScreen />;

  // 1. 호텔 정보가 없는 경우 -> 신청 화면
  if (!hotel && !isEditing) {
    return (
      <div className="business-hotel-page">
        <div className="page-header">
          <h1>🏨 내 호텔 관리</h1>
          <p style={{color:'#64748b'}}>호텔 서비스를 시작하려면 입점 신청을 진행해주세요.</p>
        </div>
        <div className="card" style={{padding:'60px 20px', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'20px'}}>
            <div style={{fontSize:'4rem'}}>🏨</div>
            <div>
              <h3 style={{marginBottom:'10px', color:'#1e293b'}}>등록된 호텔이 없습니다.</h3>
              <p style={{color:'#64748b'}}>지금 바로 호텔 정보를 등록하고 파트너가 되어보세요.</p>
            </div>
            <button className="btn btn-primary" style={{padding:'12px 24px', fontSize:'1rem'}} onClick={() => setIsEditing(true)}>
                + 호텔 입점 신청하기
            </button>
        </div>
      </div>
    );
  }

  // 2. 신청/수정 폼 화면
  if (isEditing) {
    return (
      <div className="business-hotel-page">
        <div className="page-header">
          <h1>{hotel ? "호텔 정보 수정" : "호텔 입점 신청"}</h1>
        </div>
        <AdminHotelForm 
            hotel={hotel} 
            onSubmit={handleSubmit} 
            onCancel={() => setIsEditing(false)} 
        />
      </div>
    );
  }

  // 3. 상세 보기 화면 (승인 상태 확인 가능)
  return (
    <div className="business-hotel-page">
      <div className="page-header">
        <h1>🏨 내 호텔 정보</h1>
        <button className="btn btn-outline" onClick={() => setIsEditing(true)}>
            ✏️ 정보 수정
        </button>
      </div>
      
      {/* ★ 승인 대기 상태 알림 ★ */}
      {hotel.status === 'pending' && (
        <div style={{background:'#fffbeb', border:'1px solid #fcd34d', padding:'16px', borderRadius:'8px', marginBottom:'20px', color:'#b45309', display:'flex', alignItems:'center', gap:'10px'}}>
            <span style={{fontSize:'1.2rem'}}>⏳</span>
            <div>
                <strong style={{display:'block', marginBottom:'2px'}}>승인 대기 중입니다.</strong>
                <span style={{fontSize:'0.9rem'}}>관리자가 입점 신청을 검토하고 있습니다. 승인 후 서비스가 시작됩니다.</span>
            </div>
        </div>
      )}

      {/* 호텔 상세 정보 컴포넌트 재사용 */}
      <AdminHotelDetail hotel={hotel} />
    </div>
  );
};

export default BusinessMyHotelPage;