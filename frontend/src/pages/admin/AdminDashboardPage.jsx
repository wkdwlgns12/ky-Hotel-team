import { useEffect, useState } from "react";
import AdminStatsCards from "../../components/admin/dashboard/AdminStatsCards";
import AdminChartArea from "../../components/admin/dashboard/AdminChartArea";
import adminStatsApi from "../../api/adminStatsApi";
import Loader from "../../components/common/Loader";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await adminStatsApi.getAdminStats();
        setStats(data);
      } catch (error) {
        console.error("Dashboard Load Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;
  
  const safeStats = stats || {};
  const chartData = safeStats.monthlyRevenue || { 
    labels: ["최근 30일"], 
    revenue: [safeStats.revenue?.last30DaysTotal || 0] 
  };

  return (
    <div className="dashboard-page">
      <h2>관리자 대시보드</h2>
      <AdminStatsCards stats={safeStats} />
      <div className="charts-section" style={{marginTop:'20px'}}>
        <AdminChartArea data={chartData} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;