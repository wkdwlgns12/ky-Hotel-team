import { NavLink } from "react-router-dom";

const BusinessSidebar = () => {
  const menus = [
    { name: "대시보드", path: "/business/dashboard", icon: "📊" },
    { name: "내 호텔 관리", path: "/business/hotels", icon: "🏨" },
    { name: "예약 현황", path: "/business/bookings", icon: "📅" },
    { name: "리뷰 관리", path: "/business/reviews", icon: "⭐" },
    { name: "쿠폰 관리", path: "/business/coupons", icon: "🎫" },
    { name: "내 정보", path: "/business/profile", icon: "👤" },
  ];

  return (
    <aside className="sidebar business">
      <div className="sidebar-header">
        <h3>Partner Center</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menus.map((menu) => (
            <li key={menu.path}>
              <NavLink
                to={menu.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span className="icon">{menu.icon}</span>
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