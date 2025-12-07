import { NavLink } from "react-router-dom";

const BusinessSidebar = () => {
  // 백엔드에 구현된 기능만 메뉴에 표시 (설정, 내 정보 제거)
  const menus = [
    { name: "대시보드", path: "/owner/dashboard", icon: "📊" },
    { name: "내 호텔 관리", path: "/owner/my-hotel", icon: "🏨" },
    { name: "예약 현황", path: "/owner/bookings", icon: "📅" },
    { name: "리뷰 관리", path: "/owner/reviews", icon: "⭐" },
    { name: "쿠폰 관리", path: "/owner/coupons", icon: "🎫" },
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
              <NavLink
                to={menu.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span>{menu.icon}</span>
                {menu.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default BusinessSidebar;