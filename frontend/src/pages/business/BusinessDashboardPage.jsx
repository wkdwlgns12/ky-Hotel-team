import { useEffect, useState } from "react";
import AdminStatsCards from "../../components/admin/dashboard/AdminStatsCards";
import AdminChartArea from "../../components/admin/dashboard/AdminChartArea";
import { adminStatsApi } from "../../api/adminStatsApi";
import Loader from "../../components/common/Loader";

const BusinessDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // ★ 사업자 전용 API 호출
        const data = await adminStatsApi.getOwnerStats();
        setStats(data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;
  if (!stats) return <div className="p-4">통계 데이터가 없습니다. (호텔을 먼저 등록해주세요)</div>;

  return (
    <div className="dashboard-page">
      <h2>내 비즈니스 현황</h2>
      <AdminStatsCards stats={stats} />
      <div className="charts-section" style={{ marginTop: "20px" }}>
        <h3>수익 통계</h3>
        <AdminChartArea data={stats.monthlyRevenue || []} />
      </div>
    </div>
  );
};

export default BusinessDashboardPage;