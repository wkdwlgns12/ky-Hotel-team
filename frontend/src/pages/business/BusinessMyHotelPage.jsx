import { useEffect, useState } from "react";
import { adminHotelApi } from "../../api/adminHotelApi";
import AdminHotelTable from "../../components/admin/hotels/AdminHotelTable";
import AdminHotelForm from "../../components/admin/hotels/AdminHotelForm";
import Loader from "../../components/common/Loader";

const BusinessMyHotelPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      // [백엔드] GET /api/hotel/owner
      const response = await adminHotelApi.getHotels();
      // 백엔드가 리스트를 items 또는 바로 배열로 줄 수 있음 (response.js 구조에 따름)
      setHotels(Array.isArray(response) ? response : response.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleCreate = async (data) => {
    try {
      await adminHotelApi.createHotel(data);
      setIsCreating(false);
      fetchHotels();
    } catch (error) {
      alert("호텔 생성 실패: " + error.message);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await adminHotelApi.updateHotel(editingHotel._id, data);
      setEditingHotel(null);
      fetchHotels();
    } catch (error) {
      alert("수정 실패: " + error.message);
    }
  };

  if (loading) return <Loader />;

  if (isCreating) {
    return (
      <div className="page-container">
        <h3>새 호텔 등록</h3>
        <AdminHotelForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} />
      </div>
    );
  }

  if (editingHotel) {
    return (
      <div className="page-container">
        <h3>호텔 정보 수정</h3>
        <AdminHotelForm 
          hotel={editingHotel} 
          onSubmit={handleUpdate} 
          onCancel={() => setEditingHotel(null)} 
        />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header" style={{display:'flex', justifyContent:'space-between'}}>
        <h2>내 호텔 관리</h2>
        <button className="btn btn-primary" onClick={() => setIsCreating(true)}>
          + 호텔 추가
        </button>
      </div>
      
      {/* 테이블 컴포넌트에 호텔 데이터 전달 */}
      <AdminHotelTable 
        hotels={hotels} 
        onEdit={(hotel) => setEditingHotel(hotel)}
        onDelete={async (id) => {
           if(window.confirm("삭제하시겠습니까?")) {
             // 백엔드에 삭제 API가 있다면 호출, 없다면 알림
             try { await adminHotelApi.deleteHotel(id); fetchHotels(); }
             catch(e) { alert("삭제 실패"); }
           }
        }}
      />
    </div>
  );
};

export default BusinessMyHotelPage;