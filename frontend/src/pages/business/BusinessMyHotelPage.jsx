import { useEffect, useState } from "react";
import { adminHotelApi } from "../../api/adminHotelApi";
import { adminRoomApi } from "../../api/adminRoomApi"; // Room API 추가
import AdminHotelForm from "../../components/admin/hotels/AdminHotelForm";
import Loader from "../../components/common/Loader";
import StatusBadge from "../../components/common/StatusBadge";

const BusinessMyHotelPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list"); // list, create, edit, rooms
  const [selectedHotel, setSelectedHotel] = useState(null);
  
  // Room 관련 State
  const [rooms, setRooms] = useState([]);
  const [roomForm, setRoomForm] = useState({ name: "", type: "standard", price: 0, capacity: 2, inventory: 1 });
  const [isRoomEditing, setIsRoomEditing] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await adminHotelApi.getMyHotels();
      setHotels(res.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // --- 호텔 관련 핸들러 ---
  const handleCreateHotel = async (data) => {
    try {
      // 백엔드는 city 필드를 원함
      const payload = { ...data, city: data.region }; 
      await adminHotelApi.createHotel(payload);
      alert("호텔 등록 신청이 완료되었습니다. 관리자 승인 후 운영 가능합니다.");
      setViewMode("list");
      fetchHotels();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleUpdateHotel = async (data) => {
    try {
      const payload = { ...data, city: data.region };
      await adminHotelApi.updateHotel(selectedHotel._id, payload);
      alert("수정되었습니다.");
      setViewMode("list");
      fetchHotels();
    } catch (e) {
      alert(e.message);
    }
  };

  // --- 객실(Room) 관련 핸들러 ---
  const fetchRooms = async (hotelId) => {
    try {
      const res = await adminRoomApi.getRoomsByHotel(hotelId);
      setRooms(res || []);
    } catch(e) { console.error(e); }
  };

  const handleManageRooms = (hotel) => {
    setSelectedHotel(hotel);
    fetchRooms(hotel._id);
    setViewMode("rooms");
    setRoomForm({ name: "", type: "standard", price: 0, capacity: 2, inventory: 1 });
    setIsRoomEditing(false);
  };

  const handleSaveRoom = async (e) => {
    e.preventDefault();
    try {
      if (isRoomEditing) {
        await adminRoomApi.updateRoom(selectedRoomId, roomForm);
      } else {
        await adminRoomApi.createRoom(selectedHotel._id, roomForm);
      }
      // 폼 초기화 및 리로드
      setRoomForm({ name: "", type: "standard", price: 0, capacity: 2, inventory: 1 });
      setIsRoomEditing(false);
      fetchRooms(selectedHotel._id);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if(!confirm("삭제하시겠습니까?")) return;
    try {
      await adminRoomApi.deleteRoom(roomId);
      fetchRooms(selectedHotel._id);
    } catch(e) { alert(e.message); }
  };

  // 렌더링
  if (loading) return <Loader fullScreen />;

  if (viewMode === "create") {
    return (
      <div className="page-container">
        <h3>새 호텔 등록</h3>
        <AdminHotelForm onSubmit={handleCreateHotel} onCancel={() => setViewMode("list")} />
      </div>
    );
  }

  if (viewMode === "edit" && selectedHotel) {
    return (
      <div className="page-container">
        <h3>호텔 수정</h3>
        <AdminHotelForm hotel={selectedHotel} onSubmit={handleUpdateHotel} onCancel={() => setViewMode("list")} />
      </div>
    );
  }

  if (viewMode === "rooms" && selectedHotel) {
    return (
      <div className="page-container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
          <h3>[{selectedHotel.name}] 객실 관리</h3>
          <button className="btn btn-outline" onClick={() => setViewMode("list")}>돌아가기</button>
        </div>

        {/* 객실 등록/수정 폼 */}
        <div className="card" style={{background:'#f8fafc', marginBottom:30}}>
          <h4>{isRoomEditing ? "객실 수정" : "새 객실 등록"}</h4>
          <form onSubmit={handleSaveRoom} style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:10, alignItems:'end'}}>
            <div className="form-group" style={{marginBottom:0}}>
                <label>객실명</label>
                <input value={roomForm.name} onChange={(e)=>setRoomForm({...roomForm, name:e.target.value})} required placeholder="예: 디럭스룸" />
            </div>
            <div className="form-group" style={{marginBottom:0}}>
                <label>타입</label>
                <input value={roomForm.type} onChange={(e)=>setRoomForm({...roomForm, type:e.target.value})} required placeholder="standard/deluxe" />
            </div>
            <div className="form-group" style={{marginBottom:0}}>
                <label>1박 가격(원)</label>
                <input type="number" value={roomForm.price} onChange={(e)=>setRoomForm({...roomForm, price:Number(e.target.value)})} required />
            </div>
            <div className="form-group" style={{marginBottom:0}}>
                <label>수용인원</label>
                <input type="number" value={roomForm.capacity} onChange={(e)=>setRoomForm({...roomForm, capacity:Number(e.target.value)})} required />
            </div>
            <div className="form-group" style={{marginBottom:0}}>
                <label>재고(개)</label>
                <input type="number" value={roomForm.inventory} onChange={(e)=>setRoomForm({...roomForm, inventory:Number(e.target.value)})} required />
            </div>
            <button type="submit" className="btn btn-primary">{isRoomEditing ? "수정 저장" : "추가"}</button>
            {isRoomEditing && <button type="button" className="btn btn-outline" onClick={()=>{setIsRoomEditing(false); setRoomForm({ name: "", type: "standard", price: 0, capacity: 2, inventory: 1 });}}>취소</button>}
          </form>
        </div>

        {/* 객실 목록 */}
        <div className="table-wrapper card">
          <table className="admin-table">
            <thead>
              <tr><th>객실명</th><th>타입</th><th>가격</th><th>인원</th><th>재고</th><th>상태</th><th>관리</th></tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room._id}>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.price.toLocaleString()}원</td>
                  <td>{room.capacity}명</td>
                  <td>{room.inventory}개</td>
                  <td><span className={`badge ${room.status === 'active' ? 'badge-success' : 'badge-secondary'}`}>{room.status}</span></td>
                  <td>
                    <button className="btn btn-outline" style={{padding:'4px 8px', marginRight:5}} 
                      onClick={()=>{setIsRoomEditing(true); setSelectedRoomId(room._id); setRoomForm(room);}}>수정</button>
                    <button className="btn btn-danger-sm" onClick={()=>handleDeleteRoom(room._id)}>삭제</button>
                  </td>
                </tr>
              ))}
              {rooms.length === 0 && <tr><td colSpan="7" style={{textAlign:'center', padding:20}}>등록된 객실이 없습니다.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 기본 리스트 뷰
  return (
    <div className="page-container">
      <div className="page-header" style={{display:'flex', justifyContent:'space-between'}}>
        <h2>내 호텔 관리</h2>
        <button className="btn btn-primary" onClick={() => { setViewMode("create"); setSelectedHotel(null); }}>+ 호텔 추가</button>
      </div>
      
      <div className="hotels-grid">
        {hotels.map(hotel => (
          <div key={hotel._id} className="hotel-card">
            <div className="hotel-image">
                <div className="hotel-status"><StatusBadge status={hotel.status} type="hotel" /></div>
                {/* 이미지가 없으면 placeholder */}
                <img src={hotel.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"} alt={hotel.name} />
            </div>
            <div className="hotel-content">
                <div className="hotel-name">{hotel.name}</div>
                <div className="hotel-address">📍 {hotel.city} {hotel.address}</div>
                <div className="hotel-actions">
                    <button className="btn btn-outline" onClick={() => { setSelectedHotel(hotel); setViewMode("edit"); }}>정보 수정</button>
                    {/* 승인된 호텔만 객실 관리 가능하도록 할 수도 있음 */}
                    <button className="btn btn-primary" onClick={() => handleManageRooms(hotel)}>객실 관리</button>
                </div>
            </div>
          </div>
        ))}
        {hotels.length === 0 && <div style={{gridColumn:'1/-1', textAlign:'center', padding:40, color:'#666'}}>등록된 호텔이 없습니다.</div>}
      </div>
    </div>
  );
};

export default BusinessMyHotelPage;