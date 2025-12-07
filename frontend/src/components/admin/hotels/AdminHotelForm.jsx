import { useState, useEffect } from "react";
import ImageUpload from "../../common/ImageUpload";

const AdminHotelForm = ({ hotel, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "", address: "", region: "서울", description: "",
    images: [] // 이미지 파일 배열
  });
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (hotel) {
      setFormData(prev => ({
        ...prev,
        name: hotel.name || "",
        address: hotel.address || "",
        region: hotel.city || "서울",
        description: hotel.description || "",
      }));
      setExistingImages(hotel.images || []);
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (files) => {
    setFormData(prev => ({ ...prev, images: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 이미지 파일이 있으면 FormData로 변환해서 전송해야 함 (API 수정 필요)
    // 여기서는 일단 객체로 넘기지만, 실제 연동 시엔 API 호출부에서 FormData 처리가 필요합니다.
    onSubmit({ ...formData, city: formData.region, existingImages }); 
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="form-group">
        <label>호텔명</label>
        <input name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>지역 (City)</label>
        <select name="region" value={formData.region} onChange={handleChange}>
          <option value="서울">서울</option>
          <option value="부산">부산</option>
          <option value="제주">제주</option>
          {/* 기타 지역... */}
        </select>
      </div>
      <div className="form-group">
        <label>주소</label>
        <input name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>설명</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
      </div>
      
      {/* 이미지 업로드 컴포넌트 추가 */}
      <ImageUpload 
        label="호텔 대표 이미지 (최대 5장)" 
        images={existingImages} 
        onChange={handleImageChange} 
      />

      <div className="form-actions" style={{marginTop: '20px', textAlign:'right'}}>
        <button type="button" onClick={onCancel} className="btn btn-outline" style={{marginRight:'10px'}}>취소</button>
        <button type="submit" className="btn btn-primary">저장</button>
      </div>
    </form>
  );
};

export default AdminHotelForm;