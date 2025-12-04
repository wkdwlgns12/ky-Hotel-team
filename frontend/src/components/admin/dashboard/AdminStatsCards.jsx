const AdminStatsCards = ({ stats }) => {
  const cards = [
    {
      title: "오늘 예약",
      value: stats?.todayBookings || 0,
      change: "+12%",
      positive: true,
      icon: "📅",
      color: "#2563eb",
    },
    {
      title: "총 매출",
      value: `${stats?.totalRevenue?.toLocaleString() || 0}원`,
      change: "+8%",
      positive: true,
      icon: "💰",
      color: "#10b981",
    },
    {
      title: "활성 호텔",
      value: stats?.activeHotels || 0,
      change: "+2",
      positive: true,
      icon: "🏨",
      color: "#f59e0b",
    },
    {
      title: "신규 회원",
      value: stats?.newUsers || 0,
      change: "+15%",
      positive: true,
      icon: "👥",
      color: "#06b6d4",
    },
  ];

  return (
    <div className="stats-cards">
      {cards.map((card, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <div className="stat-title">{card.title}</div>
            <div
              className="stat-icon"
              style={{ backgroundColor: `${card.color}20`, color: card.color }}
            >
              {card.icon}
            </div>
          </div>
          <div className="stat-value">{card.value}</div>
          <div
            className={`stat-change ${card.positive ? "positive" : "negative"}`}
          >
            {card.change} 전일 대비
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCards;
