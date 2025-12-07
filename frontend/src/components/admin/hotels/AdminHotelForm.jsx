import { useState, useEffect } from "react";

const AdminHotelForm = ({ hotel, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    region: "서울",
    description: "",
  });

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || "",
        address: hotel.address || "",
        region: hotel.city || "서울", // 백엔드 city 필드 매핑
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
    // 상위 컴포넌트로 데이터 전달
    onSubmit(formData);
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
        <label>지역 (City)</label>
        <select name="region" value={formData.region} onChange={handleChange}>
          <option value="서울">서울</option>
          <option value="부산">부산</option>
          <option value="제주">제주</option>
          <option value="인천">인천</option>
          <option value="강원">강원</option>
          <option value="경기">경기</option>
        </select>
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