import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHotelDetail from "../../components/admin/hotels/AdminHotelDetail";
import { adminHotelApi } from "../../api/adminHotelApi";
import Loader from "../../components/common/Loader";

const AdminHotelEditPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        // pending hotels 목록에서 해당 hotelId 찾기
        const data = await adminHotelApi.getPendingHotels();
        const hotels = data.data?.hotels || data.hotels || [];
        const foundHotel = hotels.find(h => h.id === hotelId || h._id === hotelId);
        if (foundHotel) {
          setHotel(foundHotel);
        } else {
          alert("호텔 정보를 찾을 수 없습니다.");
          navigate("/admin/hotels");
        }
      } catch(e) { 
        alert("정보 로드 실패"); 
        navigate("/admin/hotels");
      } finally { 
        setLoading(false); 
      }
    };
    fetch();
  }, [hotelId, navigate]);

  // ★ 승인/거부 처리 함수 추가 ★
  const handleStatusChange = async (newStatus) => {
    if (!confirm(`정말 이 호텔을 ${newStatus === 'approved' ? '승인' : '거부'} 하시겠습니까?`)) return;
    
    try {
      if (newStatus === "approved") {
        await adminHotelApi.approveHotel(hotelId);
      } else {
        await adminHotelApi.rejectHotel(hotelId, "관리자 검토 결과 거부됨");
      }
      
      alert("상태가 변경되었습니다.");
      navigate("/admin/hotels"); // 처리 후 목록으로 이동
    } catch (e) {
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="admin-hotel-view-page">
      <div className="page-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>호텔 상세 정보</h1>
        <div style={{display:'flex', gap:'10px'}}>
            <button onClick={() => navigate("/admin/hotels")} className="btn btn-outline">
                목록으로
            </button>
            
            {/* ★ 대기 상태일 때만 승인/거부 버튼 표시 ★ */}
            {hotel?.status === 'pending' && (
                <>
                    <button 
                        className="btn btn-success-sm" 
                        style={{fontSize:'1rem', padding:'8px 16px'}}
                        onClick={() => handleStatusChange('approved')}
                    >
                        ✅ 승인하기
                    </button>
                    <button 
                        className="btn btn-danger-sm" 
                        style={{fontSize:'1rem', padding:'8px 16px'}}
                        onClick={() => handleStatusChange('rejected')}
                    >
                        ❌ 거부하기
                    </button>
                </>
            )}
        </div>
      </div>
      
      {/* 상세 내용 표시 컴포넌트 */}
      <AdminHotelDetail hotel={hotel} />
    </div>
  );
};

export default AdminHotelEditPage;