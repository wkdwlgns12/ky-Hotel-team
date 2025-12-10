import { useEffect, useState } from "react";
import dashboardApi from "../../api/dashboardApi";
import Loader from "../../components/common/Loader";
import "./AdminDashboardPage.scss";

const AdminDashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await dashboardApi.getAdminDashboard();
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "대시보드 데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div className="admin-dashboard-page">
      <h1>관리자 대시보드</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>전체 호텔</h3>
          <p className="stat-value">{data.hotels?.total || 0}</p>
          <div className="stat-details">
            <span>승인 대기: {data.hotels?.pending || 0}</span>
            <span>승인됨: {data.hotels?.approved || 0}</span>
            <span>거절됨: {data.hotels?.rejected || 0}</span>
          </div>
        </div>

        <div className="stat-card">
          <h3>전체 예약</h3>
          <p className="stat-value">{data.reservations?.total || 0}</p>
          <div className="stat-details">
            <span>대기: {data.reservations?.pending || 0}</span>
            <span>확정: {data.reservations?.confirmed || 0}</span>
            <span>완료: {data.reservations?.completed || 0}</span>
          </div>
        </div>

        <div className="stat-card">
          <h3>전체 회원</h3>
          <p className="stat-value">{data.users?.total || 0}</p>
          <div className="stat-details">
            <span>관리자: {data.users?.admin || 0}</span>
            <span>사업자: {data.users?.owner || 0}</span>
            <span>일반: {data.users?.user || 0}</span>
          </div>
        </div>

        <div className="stat-card">
          <h3>최근 30일 매출</h3>
          <p className="stat-value">
            {data.revenue?.last30DaysTotal?.toLocaleString() || 0}원
          </p>
          <div className="stat-details">
            <span>예약 건수: {data.revenue?.last30DaysCount || 0}건</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
