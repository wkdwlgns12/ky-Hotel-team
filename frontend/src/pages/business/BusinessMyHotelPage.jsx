import { useEffect, useState } from "react";
import { adminHotelApi } from "../../api/adminHotelApi";
import { adminRoomApi } from "../../api/adminRoomApi";
import AdminHotelForm from "../../components/admin/hotels/AdminHotelForm";
import Loader from "../../components/common/Loader";
import StatusBadge from "../../components/common/StatusBadge";
import ImageUpload from "../../components/common/ImageUpload"; // 새로 추가된 컴포넌트 임포트

const BusinessMyHotelPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list"); // list, create, edit, rooms
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Room 관련 State
  const [rooms, setRooms] = useState([]);
  const [roomForm, setRoomForm] = useState({
    name: "",
    type: "standard",
    price: 0,
    capacity: 2,
    inventory: 1,
    amenities: "", // 문자열로 입력받아 배열로 변환 예정
    status: "active",
    images: [], // 새 이미지 파일들
    existingImages: [] // 기존 이미지 URL들 (수정 시)
  });
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
    } catch (e) {
      console.error(e);
    }
  };

  const handleManageRooms = (hotel) => {
    setSelectedHotel(hotel);
    fetchRooms(hotel._id);
    setViewMode("rooms");
    // 폼 초기화
    setRoomForm({
      name: "", type: "standard", price: 0, capacity: 2, inventory: 1,
      amenities: "", status: "active", images: [], existingImages: []
    });
    setIsRoomEditing(false);
  };

  const handleEditRoomClick = (room) => {
    setIsRoomEditing(true);
    setSelectedRoomId(room._id);
    setRoomForm({
      ...room,
      amenities: room.amenities ? room.amenities.join(", ") : "", // 배열 -> 문자열 변환
      existingImages: room.images || [],
      images: [] // 새 파일은 초기화
    });
  };

  const handleSaveRoom = async (e) => {
    e.preventDefault();
    try {
      // 콤마로 구분된 편의시설을 배열로 변환
      const amenitiesArray = roomForm.amenities.split(",").map(s => s.trim()).filter(Boolean);
      
      const payload = {
        ...roomForm,
        amenities: amenitiesArray
      };

      // 참고: 실제 Room API도 FormData를 지원하도록 backend/room/controller.js 등이 수정되어야 완벽하게 동작합니다.
      // 여기서는 프론트엔드에서 데이터를 준비해서 넘기는 로직까지 구현합니다.
      
      if (isRoomEditing) {
        await adminRoomApi.updateRoom(selectedRoomId, payload);
      } else {
        await adminRoomApi.createRoom(selectedHotel._id, payload);
      }

      // 폼 초기화 및 리로드
      setRoomForm({
        name: "", type: "standard", price: 0, capacity: 2, inventory: 1,
        amenities: "", status: "active", images: [], existingImages: []
      });
      setIsRoomEditing(false);
      fetchRooms(selectedHotel._id);
      alert(isRoomEditing ? "객실이 수정되었습니다." : "객실이 추가되었습니다.");
    } catch (e) {
      alert(e.message || "저장에 실패했습니다.");
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await adminRoomApi.deleteRoom(roomId);
      fetchRooms(selectedHotel._id);
    } catch (e) {
      alert(e.message);
    }
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3>[{selectedHotel.name}] 객실 관리</h3>
          <button className="btn btn-outline" onClick={() => setViewMode("list")}>돌아가기</button>
        </div>

        {/* 객실 등록/수정 폼 */}
        <div className="card" style={{ background: '#f8fafc', marginBottom: 30, padding: '20px' }}>
          <h4 style={{ marginBottom: '15px' }}>{isRoomEditing ? "객실 수정" : "새 객실 등록"}</h4>
          
          <form onSubmit={handleSaveRoom}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label>객실명 <span style={{color:'red'}}>*</span></label>
                <input
                  value={roomForm.name}
                  onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                  required
                  placeholder="예: 디럭스 더블룸"
                />
              </div>
              <div className="form-group">
                <label>객실 타입</label>
                <select
                  value={roomForm.type}
                  onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value })}
                >
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                  <option value="family">Family</option>
                </select>
              </div>
              <div className="form-group">
                <label>판매 상태</label>
                <select
                  value={roomForm.status}
                  onChange={(e) => setRoomForm({ ...roomForm, status: e.target.value })}
                >
                  <option value="active">판매 중 (Active)</option>
                  <option value="inactive">판매 중지 (Inactive)</option>
                </select>
              </div>

              <div className="form-group">
                <label>1박 가격 (원) <span style={{color:'red'}}>*</span></label>
                <input
                  type="number"
                  value={roomForm.price}
                  onChange={(e) => setRoomForm({ ...roomForm, price: Number(e.target.value) })}
                  required
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>수용 인원 (명) <span style={{color:'red'}}>*</span></label>
                <input
                  type="number"
                  value={roomForm.capacity}
                  onChange={(e) => setRoomForm({ ...roomForm, capacity: Number(e.target.value) })}
                  required
                  min="1"
                />
              </div>
              <div className="form-group">
                <label>보유 재고 (개) <span style={{color:'red'}}>*</span></label>
                <input
                  type="number"
                  value={roomForm.inventory}
                  onChange={(e) => setRoomForm({ ...roomForm, inventory: Number(e.target.value) })}
                  required
                  min="0"
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>편의시설 (쉼표로 구분)</label>
                <input
                  value={roomForm.amenities}
                  onChange={(e) => setRoomForm({ ...roomForm, amenities: e.target.value })}
                  placeholder="예: 와이파이, 욕조, TV, 넷플릭스"
                />
              </div>

              {/* 이미지 업로드 컴포넌트 적용 */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <ImageUpload 
                  label="객실 이미지 (최대 5장)" 
                  images={roomForm.existingImages || []} // 기존 이미지 URL (수정 시)
                  onChange={(files) => setRoomForm({ ...roomForm, images: files })} 
                />
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              {isRoomEditing && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setIsRoomEditing(false);
                    setRoomForm({ name: "", type: "standard", price: 0, capacity: 2, inventory: 1, amenities: "", status: "active", images: [], existingImages: [] });
                  }}
                  style={{ marginRight: '10px' }}
                >
                  취소
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {isRoomEditing ? "수정 저장" : "객실 추가"}
              </button>
            </div>
          </form>
        </div>

        {/* 객실 목록 */}
        <div className="table-wrapper card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>이미지</th>
                <th>객실명</th>
                <th>타입</th>
                <th>가격</th>
                <th>인원/재고</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td style={{width:'80px'}}>
                    {room.images && room.images.length > 0 ? (
                      <img src={room.images[0]} alt="room" style={{width:'60px', height:'40px', objectFit:'cover', borderRadius:'4px'}} />
                    ) : (
                      <div style={{width:'60px', height:'40px', background:'#eee', borderRadius:'4px'}}></div>
                    )}
                  </td>
                  <td>
                    <div style={{fontWeight:'bold'}}>{room.name}</div>
                    <div style={{fontSize:'0.8rem', color:'#666'}}>
                      {room.amenities?.slice(0,2).join(', ')}{room.amenities?.length > 2 && '...'}
                    </div>
                  </td>
                  <td>{room.type}</td>
                  <td>{room.price.toLocaleString()}원</td>
                  <td>{room.capacity}명 / {room.inventory}개</td>
                  <td>
                    <StatusBadge status={room.status} type="hotel" /> {/* active/inactive */}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '4px 8px', marginRight: 5, fontSize: '0.8rem' }}
                      onClick={() => handleEditRoomClick(room)}
                    >
                      수정
                    </button>
                    <button
                      className="btn btn-danger-sm"
                      style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                      onClick={() => handleDeleteRoom(room._id)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
              {rooms.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: 20 }}>
                    등록된 객실이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 기본 리스트 뷰
  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>내 호텔 관리</h2>
        <button className="btn btn-primary" onClick={() => { setViewMode("create"); setSelectedHotel(null); }}>
          + 호텔 추가
        </button>
      </div>

      <div className="hotels-grid">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card">
            <div className="hotel-image">
              <div className="hotel-status">
                <StatusBadge status={hotel.status} type="hotel" />
              </div>
              <img
                src={hotel.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={hotel.name}
              />
            </div>
            <div className="hotel-content">
              <div className="hotel-name">{hotel.name}</div>
              <div className="hotel-address">
                📍 {hotel.city} {hotel.address}
              </div>
              <div className="hotel-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSelectedHotel(hotel);
                    setViewMode("edit");
                  }}
                >
                  정보 수정
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleManageRooms(hotel)}
                  // 호텔이 승인된 상태에서만 객실 관리가 가능하게 하려면 조건을 추가할 수 있음
                  // disabled={hotel.status !== 'approved'}
                >
                  객실 관리
                </button>
              </div>
            </div>
          </div>
        ))}
        {hotels.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 40, color: '#666' }}>
            등록된 호텔이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessMyHotelPage;