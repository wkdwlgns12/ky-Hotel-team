// 팝업 혹은 상세 페이지용 컴포넌트
const AdminBookingDetail = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{maxWidth: '600px'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}>
          <h3>예약 상세 정보</h3>
          <button onClick={onClose} style={{border:'none', background:'none', fontSize:'1.5rem', cursor:'pointer'}}>×</button>
        </div>

        <div className="detail-section">
          <div className="detail-row"><div className="label">예약 ID</div><div className="value">{booking._id || booking.id}</div></div>
          <div className="detail-row"><div className="label">호텔명</div><div className="value">{booking.hotelId?.name}</div></div>
          <div className="detail-row"><div className="label">객실</div><div className="value">{booking.roomId?.name}</div></div>
          <div className="detail-row"><div className="label">예약자</div><div className="value">{booking.userId?.name} ({booking.userId?.email})</div></div>
          <div className="detail-row"><div className="label">체크인</div><div className="value">{new Date(booking.checkIn).toLocaleDateString()}</div></div>
          <div className="detail-row"><div className="label">체크아웃</div><div className="value">{new Date(booking.checkOut).toLocaleDateString()}</div></div>
          <div className="detail-row"><div className="label">인원</div><div className="value">{booking.guests}명</div></div>
        </div>

        <h4 style={{marginTop: '20px', marginBottom: '10px', borderBottom: '1px solid #eee'}}>💳 결제 정보</h4>
        <div className="detail-section" style={{background: '#f8fafc', padding: '10px', borderRadius: '8px'}}>
          {booking.paymentId ? (
            <>
              <div className="detail-row" style={{border: 'none'}}><div className="label">결제 상태</div><div className="value" style={{fontWeight:'bold'}}>{booking.paymentId.status || "완료"}</div></div>
              <div className="detail-row" style={{border: 'none'}}><div className="label">결제 금액</div><div className="value" style={{color:'#2563eb'}}>₩{(booking.paymentId.amount || booking.totalPrice).toLocaleString()}</div></div>
              <div className="detail-row" style={{border: 'none'}}><div className="label">결제 키</div><div className="value" style={{fontSize:'0.8rem'}}>{booking.paymentId.paymentKey || "-"}</div></div>
              <div className="detail-row" style={{border: 'none'}}><div className="label">주문 ID</div><div className="value" style={{fontSize:'0.8rem'}}>{booking.paymentId.orderId || "-"}</div></div>
            </>
          ) : (
            <div style={{color: '#888', fontStyle: 'italic'}}>결제 내역이 없거나 현장 결제입니다.</div>
          )}
        </div>

        <div style={{textAlign: 'right', marginTop: '20px'}}>
          <button className="btn btn-primary" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDetail;