import { NavLink } from "react-router-dom";

const BusinessSidebar = () => {
  const menus = [
    { name: "대시보드", path: "/owner/dashboard", icon: "📊" },
    { name: "내 호텔 관리", path: "/owner/my-hotel", icon: "🏨" }, // 객실 관리는 이 페이지 내부에서 처리
    { name: "예약 현황", path: "/owner/bookings", icon: "📅" },
    { name: "리뷰 관리 (신고)", path: "/owner/reviews", icon: "🚨" },
    { name: "쿠폰 조회", path: "/owner/coupons", icon: "🎫" },
    { name: "설정", path: "/owner/settings", icon: "⚙️" },
    { name: "내 정보", path: "/owner/me", icon: "👤" },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <h2>Partner Center</h2>
      </div>
      <nav>
        <ul className="sidebar-menu">
          {menus.map((menu) => (
            <li key={menu.path}>
              <NavLink to={menu.path} className={({ isActive }) => (isActive ? "active" : "")}>
                <span>{menu.icon}</span> {menu.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default BusinessSidebar;