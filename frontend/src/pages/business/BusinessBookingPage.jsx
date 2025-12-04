import { useState, useEffect } from "react";
import AdminBookingTable from "../../components/admin/bookings/AdminBookingTable"; // 기존 컴포넌트가 없다면 리스트페이지 로직 사용
import { ownerApi } from "../../api/ownerApi";

const BusinessBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await ownerApi.getReservations();
      const bookingsData = res.data?.reservations || res.reservations || [];
      setBookings(bookingsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await ownerApi.updateReservationStatus(id, status);
      alert(`예약을 ${status === 'confirmed' ? '승인' : '거절'} 처리했습니다.`);
      await loadBookings();
    } catch (error) {
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div className="page-header"><h1>📅 예약 관리</h1></div>
      {/* 테이블 UI 직접 구현 (AdminBookingListPage 로직 재사용) */}
      <div className="table-wrapper card">
        <table className="admin-table">
          <thead><tr><th>예약자</th><th>체크인/아웃</th><th>금액</th><th>상태</th><th>관리</th></tr></thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.guestName}</td>
                <td>{b.checkIn} ~ {b.checkOut}</td>
                <td>₩{b.totalAmount.toLocaleString()}</td>
                <td><span className="badge badge-secondary">{b.status}</span></td>
                <td>
                  {b.status === 'pending' && (
                    <div style={{display:'flex', gap:'5px'}}>
                      <button className="btn btn-success-sm" onClick={()=>handleStatus(b.id, 'confirmed')}>승인</button>
                      <button className="btn btn-danger-sm" onClick={()=>handleStatus(b.id, 'cancelled')}>거절</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessBookingPage;