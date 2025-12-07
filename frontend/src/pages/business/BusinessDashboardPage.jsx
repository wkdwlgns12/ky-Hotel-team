import { useEffect, useState } from "react";
import AdminStatsCards from "../../components/admin/dashboard/AdminStatsCards";
import AdminChartArea from "../../components/admin/dashboard/AdminChartArea";
import adminStatsApi from "../../api/adminStatsApi";
import Loader from "../../components/common/Loader";

const BusinessDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await adminStatsApi.getOwnerStats();
        setStats(data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (!stats) return <div style={{padding:'20px'}}>데이터를 불러올 수 없습니다.</div>;

  // 백엔드에서 monthlyRevenue가 오면 쓰고, 없으면 기본값
  const chartData = stats.monthlyRevenue || { 
    labels: ["최근 30일"], 
    revenue: [stats.revenue?.last30DaysTotal || 0] 
  };

  return (
    <div className="dashboard-page">
      <h2>비즈니스 현황</h2>
      <AdminStatsCards stats={stats} />
      <div className="charts-section" style={{marginTop:'20px'}}>
        <h3>매출 현황</h3>
        <AdminChartArea data={chartData} />
      </div>
    </div>
  );
};

export default BusinessDashboardPage;