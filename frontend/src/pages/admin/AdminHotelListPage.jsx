import { useEffect, useState } from "react";
import { adminHotelApi } from "../../api/adminHotelApi";
import Loader from "../../components/common/Loader";

const AdminHotelListPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingHotels = async () => {
    setLoading(true);
    try {
      // 백엔드: GET /api/hotel/admin/pending
      const data = await adminHotelApi.getPendingHotels();
      // 백엔드는 { success: true, data: [...] } 형식이므로 axiosClient는 배열을 반환
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
    if (!window.confirm("이 호텔의 입점을 승인하시겠습니까?")) return;
    try {
      await adminHotelApi.approveHotel(id);
      alert("승인되었습니다.");
      fetchPendingHotels();
    } catch (error) {
      alert("처리 실패: " + error.message);
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("반려 사유를 입력하세요:");
    if (reason === null) return; // 취소
    try {
      await adminHotelApi.rejectHotel(id, reason || "관리자 거부");
      alert("반려되었습니다.");
      fetchPendingHotels();
    } catch (error) {
      alert("처리 실패: " + error.message);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🏨 입점 승인 대기</h1>
      </div>
      
      <div className="table-wrapper card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>호텔명</th>
              <th>지역</th>
              <th>사업자 ID</th>
              <th>신청일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {hotels.length > 0 ? hotels.map((hotel) => (
              <tr key={hotel._id}>
                <td style={{fontWeight:'bold'}}>{hotel.name}</td>
                <td>{hotel.city}</td>
                <td>{hotel.owner}</td>
                <td>{new Date(hotel.createdAt).toLocaleDateString()}</td>
                <td>
                  <div style={{display:'flex', gap:'5px'}}>
                    <button className="btn btn-success-sm" onClick={() => handleApprove(hotel._id)}>승인</button>
                    <button className="btn btn-danger-sm" onClick={() => handleReject(hotel._id)}>반려</button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" style={{textAlign:'center', padding:'30px', color:'#666'}}>승인 대기 중인 호텔이 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHotelListPage;