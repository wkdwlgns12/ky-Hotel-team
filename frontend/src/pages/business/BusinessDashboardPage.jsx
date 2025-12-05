import { useEffect, useState } from "react";
import AdminStatsCards from "../../components/admin/dashboard/AdminStatsCards";
import AdminChartArea from "../../components/admin/dashboard/AdminChartArea";
import { adminStatsApi } from "../../api/adminStatsApi";
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
  
  if (!stats) return <div style={{padding:'20px'}}>등록된 호텔이 없거나 데이터가 부족합니다.</div>;

  return (
    <div className="dashboard-page">
      <h2>비즈니스 현황</h2>
      <AdminStatsCards stats={stats} />
      <div className="charts-section" style={{marginTop:'20px'}}>
        <h3>월별 수익</h3>
        <AdminChartArea data={stats.monthlyRevenue || []} />
      </div>
    </div>
  );
};

export default BusinessDashboardPage;