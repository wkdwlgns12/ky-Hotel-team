import { useEffect, useState } from "react";
import { adminHotelApi } from "../../api/adminHotelApi";
import { adminRoomApi } from "../../api/adminRoomApi";
import AdminHotelForm from "../../components/admin/hotels/AdminHotelForm";
import Loader from "../../components/common/Loader";
import StatusBadge from "../../components/common/StatusBadge";
import ImageUpload from "../../components/common/ImageUpload"; // 이미지 업로드 컴포넌트

const BusinessMyHotelPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list"); // list, create, edit, rooms
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Room 관련 State (필드 추가됨: amenities, status, images)
  const [rooms, setRooms] = useState([]);
  const [roomForm, setRoomForm] = useState({
    name: "",
    type: "standard",
    price: 0,
    capacity: 2,
    inventory: 1,
    amenities: "", // 문자열로 입력받아 배열로 변환
    status: "active",
    images: [], // 새로 업로드할 파일 객체 배열
    existingImages: [] // 수정 시 보여줄 기존 이미지 URL 배열
  });
  const [isRoomEditing, setIsRoomEditing] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  // --- 호텔 목록 불러오기 ---
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

  // --- 호텔 등록/수정 핸들러 ---
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

  // --- 객실(Room) 관리 핸들러 ---
  const fetchRooms = async (hotelId) => {
    try {
      const res = await adminRoomApi.getRoomsByHotel(hotelId);
      setRooms(res || []);
    } catch (e) {
      console.error(e);
    }
  };

  // '객실 관리' 버튼 클릭 시
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

  // 객실 '수정' 버튼 클릭 시
  const handleEditRoomClick = (room) => {
    setIsRoomEditing(true);
    setSelectedRoomId(room._id);
    setRoomForm({
      ...room,
      amenities: room.amenities ? room.amenities.join(", ") : "", // 배열 -> 문자열 변환
      existingImages: room.images || [], // 기존 이미지 세팅
      images: [] // 새 파일은 초기화
    });
  };

  // 객실 저장 (생성/수정)
  const handleSaveRoom = async (e) => {
    e.preventDefault();
    try {
      // 콤마로 구분된 편의시설 문자열을 배열로 변환
      const amenitiesArray = roomForm.amenities.split(",").map(s => s.trim()).filter(Boolean);
      
      const payload = {
        ...roomForm,
        amenities: amenitiesArray
      };

      if (isRoomEditing) {
        await adminRoomApi.updateRoom(selectedRoomId, payload);
      } else {
        await adminRoomApi.createRoom(selectedHotel._id, payload);
      }

      // 저장 후 폼 초기화 및 목록 갱신
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

  // --- 렌더링 ---
  if (loading) return <Loader fullScreen />;

  // 1. 호텔 등록 뷰
  if (viewMode === "create") {
    return (
      <div className="page-container">
        <h3>새 호텔 등록</h3>
        <AdminHotelForm onSubmit={handleCreateHotel} onCancel={() => setViewMode("list")} />
      </div>
    );
  }

  // 2. 호텔 수정 뷰
  if (viewMode === "edit" && selectedHotel) {
    return (
      <div className="page-container">
        <h3>호텔 수정</h3>
        <AdminHotelForm hotel={selectedHotel} onSubmit={handleUpdateHotel} onCancel={() => setViewMode("list")} />
      </div>
    );
  }

  // 3. 객실 관리 뷰 (핵심 수정 부분)
  if (viewMode === "rooms" && selectedHotel) {
    return (
      <div className="page-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3>[{selectedHotel.name}] 객실 관리</h3>
          <button className="btn btn-outline" onClick={() => setViewMode("list")}>목록으로 돌아가기</button>
        </div>

        {/* 객실 등록/수정 폼 */}
        <div className="card" style={{ background: '#f8fafc', marginBottom: 30, padding: '20px' }}>
          <h4 style={{ marginBottom: '15px' }}>{isRoomEditing ? "객실 정보 수정" : "새 객실 등록"}</h4>
          
          <form onSubmit={handleSaveRoom}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              
              {/* 기본 정보 */}
              <div className="form-group">
                <label>객실명 <span style={{color:'red'}}>*</span></label>
                <input
                  value={roomForm.name}
                  onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                  required
                  placeholder="예: 오션뷰 디럭스"
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

              {/* 숫자 정보 */}
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

              {/* 추가 정보 (편의시설) */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>편의시설 (쉼표로 구분)</label>
                <input
                  value={roomForm.amenities}
                  onChange={(e) => setRoomForm({ ...roomForm, amenities: e.target.value })}
                  placeholder="예: 와이파이, 욕조, TV, 넷플릭스, 조식포함"
                />
              </div>

              {/* 이미지 업로드 */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <ImageUpload 
                  label="객실 이미지 (최대 5장)" 
                  images={roomForm.existingImages || []} // 기존 이미지 미리보기
                  onChange={(files) => setRoomForm({ ...roomForm, images: files })} 
                />
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              {isRoomEditing && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setIsRoomEditing(false);
                    // 폼 초기화
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

        {/* 객실 목록 테이블 */}
        <div className="table-wrapper card">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{width: '100px'}}>이미지</th>
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
                  <td>
                    {room.images && room.images.length > 0 ? (
                      <img 
                        src={room.images[0]} 
                        alt="room" 
                        style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }} 
                      />
                    ) : (
                      <div style={{ width: '80px', height: '50px', background: '#f1f5f9', borderRadius: '4px', display:'flex', alignItems:'center', justifyContent:'center', color:'#cbd5e1', fontSize:'0.8rem' }}>No Img</div>
                    )}
                  </td>
                  <td>
                    <div style={{ fontWeight: 'bold' }}>{room.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {room.amenities?.length > 0 ? room.amenities.join(', ') : '-'}
                    </div>
                  </td>
                  <td><span className="badge badge-secondary">{room.type}</span></td>
                  <td>{room.price.toLocaleString()}원</td>
                  <td>{room.capacity}명 / {room.inventory}개</td>
                  <td>
                    {/* 상태에 따른 뱃지 표시 */}
                    <StatusBadge status={room.status} type="hotel" />
                  </td>
                  <td>
                    <div style={{display:'flex', gap:'5px'}}>
                      <button
                        className="btn btn-outline"
                        style={{ padding: '4px 8px', fontSize: '0.8rem' }}
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
                    </div>
                  </td>
                </tr>
              ))}
              {rooms.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                    등록된 객실이 없습니다. 새로운 객실을 등록해주세요.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 4. 기본 리스트 뷰 (호텔 목록)
  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>내 호텔 관리</h2>
        <button className="btn btn-primary" onClick={() => { setViewMode("create"); setSelectedHotel(null); }}>
          + 호텔 등록 신청
        </button>
      </div>

      <div className="hotels-grid">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card">
            <div className="hotel-image">
              <div className="hotel-status">
                <StatusBadge status={hotel.status} type="hotel" />
              </div>
              {/* 이미지 처리: 첫 번째 이미지가 있으면 표시, 없으면 placeholder */}
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
                  // 승인된 호텔만 객실 관리가 가능하다면 아래 주석 해제
                  // disabled={hotel.status !== 'approved'}
                  // title={hotel.status !== 'approved' ? "승인 후 이용 가능합니다" : ""}
                >
                  객실 관리
                </button>
              </div>
            </div>
          </div>
        ))}
        {hotels.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748b', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            등록된 호텔이 없습니다. <br />
            우측 상단의 버튼을 눌러 파트너십을 시작해보세요!
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessMyHotelPage;