import { useEffect, useState } from "react";
import { adminHotelApi } from "../../api/adminHotelApi";
import Loader from "../../components/common/Loader";

const AdminHotelListPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingHotels = async () => {
    setLoading(true);
    try {
      // [백엔드] GET /api/hotel/admin/pending
      const data = await adminHotelApi.getPendingHotels();
      setHotels(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingHotels();
  }, []);

  const handleApprove = async (id) => {
    if (!window.confirm("이 호텔을 승인하시겠습니까?")) return;
    try {
      await adminHotelApi.approveHotel(id);
      fetchPendingHotels();
    } catch (error) {
      alert("승인 처리 실패");
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("반려 사유를 입력하세요:");
    if (!reason) return;
    try {
      await adminHotelApi.rejectHotel(id, reason);
      fetchPendingHotels();
    } catch (error) {
      alert("반려 처리 실패");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-container">
      <h2>입점 승인 대기 목록</h2>
      <table className="table">
        <thead>
          <tr>
            <th>호텔명</th>
            <th>지역</th>
            <th>신청자</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel._id}>
              <td>{hotel.name}</td>
              <td>{hotel.city}</td>
              <td>{hotel.owner?.name || hotel.owner}</td>
              <td>
                <button className="btn btn-sm btn-success" onClick={() => handleApprove(hotel._id)}>승인</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleReject(hotel._id)} style={{ marginLeft: '5px' }}>반려</button>
              </td>
            </tr>
          ))}
          {hotels.length === 0 && <tr><td colSpan="4" style={{textAlign:'center'}}>대기 중인 호텔이 없습니다.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHotelListPage;