import { useEffect, useState } from "react";
import AdminStatsCards from "../../components/admin/dashboard/AdminStatsCards";
import AdminChartArea from "../../components/admin/dashboard/AdminChartArea";
import AdminRecentTable from "../../components/admin/dashboard/AdminRecentTable";
import { adminStatsApi } from "../../api/adminStatsApi";
import { adminBookingApi } from "../../api/adminBookingApi"; // 최근 예약
import Loader from "../../components/common/Loader";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 병렬 요청으로 데이터 로드
        const [statsData, bookingsData] = await Promise.all([
          adminStatsApi.getAdminStats(), // ★ 수정됨: getDashboardStats -> getAdminStats
          adminBookingApi.getBookings({ page: 1, limit: 5 })
        ]);

        setStats(statsData);
        setRecentBookings(Array.isArray(bookingsData) ? bookingsData : bookingsData.items || []);
      } catch (error) {
        console.error("Dashboard Load Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (!stats) return <div className="p-4">데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="dashboard-page">
      <h2>관리자 대시보드</h2>
      <AdminStatsCards stats={stats} />
      
      <div className="dashboard-grid">
        <div className="chart-section">
          <h3>월별 매출 추이</h3>
          {/* stats.monthlyRevenue가 배열이라고 가정 */}
          <AdminChartArea data={stats.monthlyRevenue || []} />
        </div>
        <div className="recent-section">
          <h3>최근 예약</h3>
          <AdminRecentTable bookings={recentBookings} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;