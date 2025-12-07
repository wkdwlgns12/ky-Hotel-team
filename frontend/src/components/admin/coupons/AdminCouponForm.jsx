import { useState, useEffect } from "react";

// owners prop을 받아 사업자 목록을 표시합니다.
const AdminCouponForm = ({ coupon, owners = [], onSubmit, onCancel, readOnly = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    discountAmount: 0, // 백엔드: discountAmount
    minOrderAmount: 0,
    validFrom: "",     // 백엔드: validFrom
    validTo: "",       // 백엔드: validTo
    ownerId: "",       // 백엔드: owner (ID값 전송)
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        name: coupon.name || "",
        code: coupon.code || "",
        discountAmount: coupon.discountAmount || 0,
        minOrderAmount: coupon.minOrderAmount || 0,
        // 날짜 포맷 (YYYY-MM-DD) 맞추기
        validFrom: coupon.validFrom ? coupon.validFrom.split("T")[0] : "",
        validTo: coupon.validTo ? coupon.validTo.split("T")[0] : "",
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
      // API 전송 시 데이터 구조 맞추기 (ownerId -> owner)
      const payload = {
        ...formData,
        discountAmount: Number(formData.discountAmount),
        minOrderAmount: Number(formData.minOrderAmount),
        owner: formData.ownerId, // 백엔드가 'owner' 필드를 원할 경우 확인 필요 (서비스 로직에선 ownerId로 받기도 함)
        // coupon/service.js를 보면 createCoupon(data, adminId)에서 data의 필드를 꺼내 씁니다.
        // 백엔드 service.js가 'ownerId' 변수를 쓰는지 'owner'를 쓰는지 확인이 필요하지만,
        // 보통 폼데이터 그대로 보내면 service.js에서 처리합니다.
        // 여기서는 안전하게 formData 그대로 보냅니다.
      };
      onSubmit(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      {/* 1. 사업자 선택 (필수) */}
      <div className="form-group">
        <label>쿠폰 적용 사업자 (Owner) <span style={{color:'red'}}>*</span></label>
        <select
          name="ownerId"
          value={formData.ownerId}
          onChange={handleChange}
          required
          disabled={readOnly}
          style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "4px" }}
        >
          <option value="">사업자를 선택하세요</option>
          {owners.map((owner) => (
            <option key={owner._id || owner.id} value={owner._id || owner.id}>
              {owner.name} ({owner.email})
            </option>
          ))}
        </select>
      </div>

      {/* 2. 쿠폰명 */}
      <div className="form-group">
        <label>쿠폰명</label>
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

      {/* 3. 쿠폰 코드 */}
      <div className="form-group">
        <label>쿠폰 코드 (대문자)</label>
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

      {/* 4. 할인 금액 및 최소 주문 금액 */}
      <div className="form-group" style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <label>할인 금액 (원)</label>
          <input
            type="number"
            name="discountAmount"
            value={formData.discountAmount}
            onChange={handleChange}
            required
            disabled={readOnly}
          />
        </div>
        <div style={{ flex: 1 }}>
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
      </div>

      {/* 5. 유효 기간 */}
      <div className="form-group" style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
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
        <div style={{ flex: 1 }}>
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

      <div className="form-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button type="button" onClick={onCancel} className="btn btn-outline">
          {readOnly ? "목록으로" : "취소"}
        </button>
        {!readOnly && (
          <button type="submit" className="btn btn-primary">
            {coupon ? "수정 저장" : "쿠폰 생성"}
          </button>
        )}
      </div>
    </form>
  );
};

export default AdminCouponForm;