import { useState, useEffect } from "react";

const AdminHotelForm = ({ hotel, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    region: "서울",
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
        region: hotel.city || "서울", // DB: city
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
    
    // 백엔드 스키마 맞춤 (city, price 객체)
    const payload = {
      name: formData.name,
      address: formData.address,
      city: formData.region, 
      category: formData.category,
      rooms: parseInt(formData.rooms),
      price: { 
        min: parseInt(formData.priceMin), 
        max: parseInt(formData.priceMax) 
      },
      description: formData.description,
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
          <option value="인천">인천</option>
        </select>
      </div>
      <div className="form-group">
        <label>카테고리</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="호텔">호텔</option>
          <option value="리조트">리조트</option>
          <option value="펜션">펜션</option>
          <option value="모텔">모텔</option>
        </select>
      </div>
      <div className="form-group">
        <label>객실 수</label>
        <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} />
      </div>
      <div className="form-group" style={{display:'flex', gap:'10px'}}>
        <div style={{flex:1}}>
            <label>최저가</label>
            <input type="number" name="priceMin" value={formData.priceMin} onChange={handleChange} />
        </div>
        <div style={{flex:1}}>
            <label>최고가</label>
            <input type="number" name="priceMax" value={formData.priceMax} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>설명</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
      </div>
      
      <div className="form-actions" style={{marginTop: '20px', display: 'flex', gap: '10px', justifyContent:'flex-end'}}>
        <button type="button" onClick={onCancel} className="btn btn-outline">취소</button>
        <button type="submit" className="btn btn-primary">저장</button>
      </div>
    </form>
  );
};

export default AdminHotelForm;