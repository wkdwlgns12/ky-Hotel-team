import { useState, useEffect } from "react";

const AdminCouponForm = ({ coupon, onSubmit, onCancel, readOnly = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "fixed",
    discount: 0,
    minOrderAmount: 0,
    quantity: 100, // ★ 수량 추가
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        ...coupon,
        quantity: coupon.quantity || 100,
        minOrderAmount: coupon.minOrderAmount || 0,
      });
    }
  }, [coupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); !readOnly && onSubmit(formData); }} className="card">
      <div className="form-group">
        <label>쿠폰명</label>
        <input 
          type="text" name="name" value={formData.name} onChange={handleChange} 
          required placeholder="예: 여름 휴가 1만원 할인" 
          disabled={readOnly} 
        />
      </div>

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
        {/* ★ 등급 삭제됨 -> 수량 및 조건으로 변경 ★ */}
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
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required disabled={readOnly} />
        </div>
        <div style={{ flex: 1 }}>
          <label>종료일</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required disabled={readOnly} />
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