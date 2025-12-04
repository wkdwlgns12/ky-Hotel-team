import { useState, useEffect } from "react";

const AdminHotelForm = ({ hotel, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    region: "서울", // UI에서는 '지역(Region)'으로 표시
    category: "호텔",
    rooms: 100,
    priceMin: 0,
    priceMax: 0,
    description: "",
  });

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || "",
        address: hotel.address || "",
        region: hotel.city || "서울", // 백엔드의 city 값을 region 상태에 반영
        category: hotel.category || "호텔",
        rooms: hotel.rooms || 0,
        priceMin: hotel.price?.min || 0,
        priceMax: hotel.price?.max || 0,
        description: hotel.description || "",
      });
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ★ 백엔드 스키마에 맞게 데이터 변환
    const payload = {
      name: formData.name,
      address: formData.address,
      city: formData.region, // 'region' 값을 'city' 필드로 전송
      category: formData.category,
      rooms: parseInt(formData.rooms),
      price: { 
        min: parseInt(formData.priceMin), 
        max: parseInt(formData.priceMax) 
      },
      description: formData.description,
      // 필요한 경우 images, amenities 추가
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="form-group">
        <label>호텔명</label>
        <input name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>주소</label>
        <input name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>지역</label>
        <select name="region" value={formData.region} onChange={handleChange}>
          <option value="서울">서울</option>
          <option value="부산">부산</option>
          <option value="제주">제주</option>
          <option value="경기">경기</option>
          <option value="강원">강원</option>
        </select>
      </div>
      {/* ... 나머지 필드 (객실 수, 가격, 설명 등) 기존 코드 유지 ... */}
      <div className="form-actions" style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
        <button type="submit" className="btn btn-primary">저장</button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">취소</button>
      </div>
    </form>
  );
};

export default AdminHotelForm;