import { useState, useRef } from "react";

const ImageUpload = ({ label, images = [], onChange, maxImages = 5 }) => {
  const fileInputRef = useRef();
  const [previews, setPreviews] = useState(images);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (previews.length + files.length > maxImages) {
      alert(`최대 ${maxImages}장까지만 업로드 가능합니다.`);
      return;
    }

    // 미리보기 URL 생성 (실제 업로드는 상위 폼 제출 시 처리)
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
    
    // 상위 컴포넌트로 파일 객체 전달
    onChange(files);
  };

  const handleRemove = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    // 삭제 로직은 상위 컴포넌트에서 기존 이미지/새 파일 구분 처리가 필요할 수 있음
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
        {previews.map((src, idx) => (
          <div key={idx} style={{ position: "relative", width: "100px", height: "100px" }}>
            <img 
              src={src} 
              alt={`preview-${idx}`} 
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }} 
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              style={{
                position: "absolute", top: -5, right: -5, background: "red", color: "white",
                border: "none", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px"
              }}
            >
              X
            </button>
          </div>
        ))}
        {previews.length < maxImages && (
          <div 
            onClick={() => fileInputRef.current.click()}
            style={{
              width: "100px", height: "100px", border: "2px dashed #cbd5e1", borderRadius: "4px",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b"
            }}
          >
            + 추가
          </div>
        )}
      </div>
      <input 
        type="file" 
        multiple 
        ref={fileInputRef} 
        style={{ display: "none" }} 
        onChange={handleFileChange} 
        accept="image/*"
      />
    </div>
  );
};

export default ImageUpload;