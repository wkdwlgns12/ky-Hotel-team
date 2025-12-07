import { useState, useEffect } from "react";

// owners prop 추가
const AdminCouponForm = ({ coupon, owners = [], onSubmit, onCancel, readOnly = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "fixed",
    discount: 0,
    minOrderAmount: 0,
    quantity: 100,
    startDate: "",
    endDate: "",
    description: "",
    ownerId: "", // ownerId 필드 추가
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        ...coupon,
        quantity: coupon.quantity || 100,
        minOrderAmount: coupon.minOrderAmount || 0,
        ownerId: coupon.owner?._id || coupon.owner || "", // 수정 시 기존 owner 설정
      });
    }
  }, [coupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); !readOnly && onSubmit(formData); }} className="card">
      
      {/* ▼▼▼ 사업자 선택 필드 추가 ▼▼▼ */}
      <div className="form-group">
        <label>쿠폰 적용 사업자 (Owner) <span style={{color:'red'}}>*</span></label>
        <select 
          name="ownerId" 
          value={formData.ownerId} 
          onChange={handleChange} 
          required 
          disabled={readOnly}
          style={{ padding: '8px', width: '100%', border: '1px solid #e2e8f0', borderRadius: '4px' }}
        >
          <option value="">사업자를 선택하세요</option>
          {owners.map(owner => (
            <option key={owner._id} value={owner._id}>
              {owner.name} ({owner.email})
            </option>
          ))}
        </select>
      </div>
      {/* ▲▲▲ 추가된 부분 끝 ▲▲▲ */}

      <div className="form-group">
        <label>쿠폰명</label>
        <input 
          type="text" name="name" value={formData.name} onChange={handleChange} 
          required placeholder="예: 여름 휴가 1만원 할인" 
          disabled={readOnly} 
        />
      </div>

      {/* ... 나머지 코드는 기존과 동일 ... */}
      
      <div className="form-group">
        <label>쿠폰 코드</label>
        <input 
          type="text" name="code" value={formData.code} onChange={handleChange} 
          required placeholder="예: SUMMER2024" 
          disabled={readOnly}
        />
      </div>

      <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>할인 유형</label>
          <select name="type" value={formData.type} onChange={handleChange} disabled={readOnly}>
            <option value="fixed">정액 할인 (원)</option>
            <option value="percent">정률 할인 (%)</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label>할인 값</label>
          <input type="number" name="discount" value={formData.discount} onChange={handleChange} required disabled={readOnly} />
        </div>
      </div>

      <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>발급 수량 (개)</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required disabled={readOnly} />
        </div>
        <div style={{ flex: 1 }}>
          <label>최소 주문 금액 (원)</label>
          <input type="number" name="minOrderAmount" value={formData.minOrderAmount} onChange={handleChange} placeholder="0" disabled={readOnly} />
          {!readOnly && <p style={{fontSize:'0.8rem', color:'#64748b', marginTop:'4px'}}>* 입력한 금액 이상 결제 시 사용 가능</p>}
        </div>
      </div>

      <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>시작일</label>
          <input type="date" name="startDate" value={formData.startDate ? formData.startDate.split('T')[0] : ''} onChange={handleChange} required disabled={readOnly} />
        </div>
        <div style={{ flex: 1 }}>
          <label>종료일</label>
          <input type="date" name="endDate" value={formData.endDate ? formData.endDate.split('T')[0] : ''} onChange={handleChange} required disabled={readOnly} />
        </div>
      </div>

      <div className="form-group">
        <label>설명</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" disabled={readOnly}></textarea>
      </div>

      <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button type="button" onClick={onCancel} className="btn btn-outline">
            {readOnly ? "목록으로" : "취소"}
        </button>
        {!readOnly && (
            <button type="submit" className="btn btn-primary">{coupon ? "수정 저장" : "쿠폰 생성"}</button>
        )}
      </div>
    </form>
  );
};

export default AdminCouponForm;