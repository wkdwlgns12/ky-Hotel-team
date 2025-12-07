import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  // 백엔드에 구현된 기능(호텔, 리뷰, 쿠폰, 대시보드)만 메뉴에 표시
  const menus = [
    { name: "대시보드", path: "/admin/dashboard", icon: "📊" },
    { name: "호텔 관리", path: "/admin/hotels", icon: "🏨" },
    { name: "리뷰 관리", path: "/admin/reviews", icon: "⭐" },
    { name: "쿠폰 관리", path: "/admin/coupons", icon: "🎫" },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <h2>Admin Panel</h2>
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

export default AdminSidebar;