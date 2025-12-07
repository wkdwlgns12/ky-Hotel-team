import StatusBadge from "../../common/StatusBadge";

const AdminBookingTable = ({ bookings, onUpdateStatus, onViewDetail }) => {
  return (
    <div className="table-wrapper card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>예약번호</th>
            <th>호텔명 / 객실</th>
            <th>예약자</th>
            <th>일정</th>
            <th>금액</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? bookings.map((b) => (
            <tr key={b._id || b.id}>
              <td>
                <button className="btn-link" onClick={() => onViewDetail(b)} style={{color: "#2563eb", background: "none", border: "none", cursor: "pointer", textDecoration: "underline"}}>
                  {(b._id || b.id).substring(0, 8)}...
                </button>
              </td>
              <td>
                <div style={{fontWeight: "bold"}}>{b.hotelId?.name}</div>
                <div style={{fontSize: "0.85rem", color: "#666"}}>{b.roomId?.name || b.roomName}</div>
              </td>
              <td>
                <div>{b.userId?.name || b.guestName}</div>
                <div style={{fontSize: "0.8rem", color: "#888"}}>{b.userId?.email}</div>
              </td>
              <td>
                {new Date(b.checkIn).toLocaleDateString()} ~ <br/>
                {new Date(b.checkOut).toLocaleDateString()}
              </td>
              <td style={{fontWeight: "bold", color: "#2563eb"}}>
                ₩{b.totalPrice?.toLocaleString() || b.totalAmount?.toLocaleString()}
              </td>
              <td><StatusBadge status={b.status} type="booking" /></td>
              <td>
                {b.status === 'pending' && (
                  <div style={{display: 'flex', gap: '5px', flexDirection: 'column'}}>
                    <button className="btn btn-success-sm" onClick={() => onUpdateStatus(b._id || b.id, 'confirmed')}>승인</button>
                    <button className="btn btn-danger-sm" onClick={() => onUpdateStatus(b._id || b.id, 'cancelled')}>거절</button>
                  </div>
                )}
                {b.status === 'confirmed' && (
                  <button className="btn btn-danger-sm" onClick={() => onUpdateStatus(b._id || b.id, 'cancelled')}>예약 취소</button>
                )}
              </td>
            </tr>
          )) : (
            <tr><td colSpan="7" style={{textAlign: "center", padding: "20px"}}>예약 내역이 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookingTable;