import { useState, useRef, useEffect } from "react";

const ImageUpload = ({ label, images = [], onChange, maxImages = 5 }) => {
  const fileInputRef = useRef();
  // 초기값 설정
  const [previews, setPreviews] = useState(images);

  // ★ [중요 수정] 부모 컴포넌트에서 images(기존 이미지)가 변경되면 미리보기도 갱신
  useEffect(() => {
    setPreviews(images);
  }, [images]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (previews.length + files.length > maxImages) {
      alert(`최대 ${maxImages}장까지만 업로드 가능합니다.`);
      return;
    }

    // 미리보기 URL 생성 (새로 추가된 파일)
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    
    // 기존 미리보기에 새 미리보기 추가
    setPreviews((prev) => [...prev, ...newPreviews]);
    
    // 상위 컴포넌트로 "새로 선택된 파일 객체들" 전달
    // (주의: 여기서는 새로 추가된 파일만 전달하고 있음)
    onChange(files);
  };

  const handleRemove = (index) => {
    // 미리보기에서 삭제
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    
    // TODO: 만약 '기존 서버 이미지'를 삭제하는 기능을 완벽히 구현하려면
    // 상위 컴포넌트에 "어떤 이미지가 삭제되었는지" 알려주는 추가 로직이 필요합니다.
    // 현재 코드는 "새로 추가하는 파일"을 취소하는 것에는 문제없지만,
    // "기존에 있던 이미지"를 삭제해도 백엔드에는 삭제 요청이 가지 않을 수 있습니다.
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