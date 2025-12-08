import { useState, useEffect } from "react";

const AdminCouponForm = ({ coupon, owners = [], onSubmit, onCancel, readOnly = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    discountAmount: 0,
    minOrderAmount: 0,
    validFrom: "",
    validTo: "",
    ownerId: "",
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        name: coupon.name || "",
        code: coupon.code || "",
        discountAmount: coupon.discountAmount || 0,
        minOrderAmount: coupon.minOrderAmount || 0,
        validFrom: coupon.validFrom ? new Date(coupon.validFrom).toISOString().split("T")[0] : "",
        validTo: coupon.validTo ? new Date(coupon.validTo).toISOString().split("T")[0] : "",
        ownerId: coupon.owner?._id || coupon.owner || "",
      });
    }
  }, [coupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!readOnly) {
      // 숫자형 변환 및 필드 매핑하여 상위로 전달
      const payload = {
        ...formData,
        discountAmount: Number(formData.discountAmount),
        minOrderAmount: Number(formData.minOrderAmount),
        // 백엔드 service.js는 createCoupon(data, adminId)에서 data.ownerId를 확인합니다.
        ownerId: formData.ownerId 
      };
      onSubmit(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="grid-2-cols" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
        
        {/* 왼쪽 컬럼 */}
        <div>
          <div className="form-group">
            <label>쿠폰명 <span style={{color:'red'}}>*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="예: 여름 휴가 1만원 할인"
              disabled={readOnly}
            />
          </div>

          <div className="form-group">
            <label>쿠폰 코드 (대문자) <span style={{color:'red'}}>*</span></label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              placeholder="예: SUMMER2024"
              disabled={readOnly}
              style={{ textTransform: "uppercase" }}
            />
          </div>

          <div className="form-group">
            <label>적용 사업자 (Owner) <span style={{color:'red'}}>*</span></label>
            <select
              name="ownerId"
              value={formData.ownerId}
              onChange={handleChange}
              required
              disabled={readOnly || (coupon && true)} // 수정 시에는 변경 불가하게 할 수도 있음
              style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "4px" }}
            >
              <option value="">사업자를 선택하세요</option>
              {owners.map((owner) => (
                <option key={owner._id} value={owner._id}>
                  {owner.name} ({owner.email})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 오른쪽 컬럼 */}
        <div>
          <div className="form-group">
            <label>할인 금액 (원) <span style={{color:'red'}}>*</span></label>
            <input
              type="number"
              name="discountAmount"
              value={formData.discountAmount}
              onChange={handleChange}
              required
              disabled={readOnly}
            />
          </div>

          <div className="form-group">
            <label>최소 주문 금액 (원)</label>
            <input
              type="number"
              name="minOrderAmount"
              value={formData.minOrderAmount}
              onChange={handleChange}
              placeholder="0"
              disabled={readOnly}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>시작일</label>
              <input
                type="date"
                name="validFrom"
                value={formData.validFrom}
                onChange={handleChange}
                required
                disabled={readOnly}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>종료일</label>
              <input
                type="date"
                name="validTo"
                value={formData.validTo}
                onChange={handleChange}
                required
                disabled={readOnly}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
        <button type="button" onClick={onCancel} className="btn btn-outline">
          {readOnly ? "목록으로" : "취소"}
        </button>
        {!readOnly && (
          <button type="submit" className="btn btn-primary">
            생성 하기
          </button>
        )}
      </div>
    </form>
  );
};

export default AdminCouponForm;