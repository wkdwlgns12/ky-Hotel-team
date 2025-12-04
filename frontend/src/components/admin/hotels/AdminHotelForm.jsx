import { useState, useEffect } from "react";

const AdminHotelForm = ({ hotel, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    region: "서울",
    category: "호텔",
    rating: 5,
    rooms: 100,
    priceMin: 0,
    priceMax: 0,
    description: "",
    amenities: [],
  });

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || "",
        address: hotel.address || "",
        region: hotel.region || "서울",
        category: hotel.category || "호텔",
        rating: hotel.rating || 5,
        rooms: hotel.rooms || 0,
        priceMin: hotel.price?.min || 0,
        priceMax: hotel.price?.max || 0,
        description: hotel.description || "",
        amenities: hotel.amenities || [],
      });
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: { min: parseInt(formData.priceMin), max: parseInt(formData.priceMax) }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="form-group">
        <label>호텔명</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="호텔 이름을 입력하세요"
        />
      </div>

      <div className="form-group">
        <label>주소</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="전체 주소를 입력하세요"
        />
      </div>

      <div className="form-group" style={{display:'flex', gap:'20px'}}>
        <div style={{flex:1}}>
            <label>지역</label>
            <select name="region" value={formData.region} onChange={handleChange}>
            <option value="서울">서울</option>
            <option value="부산">부산</option>
            <option value="제주">제주</option>
            <option value="경기">경기</option>
            <option value="강원">강원</option>
            </select>
        </div>
        <div style={{flex:1}}>
            <label>카테고리</label>
            <select name="category" value={formData.category} onChange={handleChange}>
            <option value="호텔">호텔</option>
            <option value="리조트">리조트</option>
            <option value="펜션">펜션</option>
            <option value="모텔">모텔</option>
            <option value="게스트하우스">게스트하우스</option>
            </select>
        </div>
      </div>

      <div className="form-group">
        <label>객실 수</label>
        <input
          type="number"
          name="rooms"
          value={formData.rooms}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>가격 범위 (최소 ~ 최대)</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="number"
            name="priceMin"
            value={formData.priceMin}
            onChange={handleChange}
            placeholder="최소 가격"
          />
          <input
            type="number"
            name="priceMax"
            value={formData.priceMax}
            onChange={handleChange}
            placeholder="최대 가격"
          />
        </div>
      </div>

      <div className="form-group">
        <label>설명</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          placeholder="호텔 소개글을 입력하세요"
        ></textarea>
      </div>

      <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
        <button type="button" onClick={onCancel} className="btn btn-outline">취소</button>
        <button type="submit" className="btn btn-primary">{hotel ? "수정 저장" : "호텔 등록"}</button>
      </div>
    </form>
  );
};

export default AdminHotelForm;