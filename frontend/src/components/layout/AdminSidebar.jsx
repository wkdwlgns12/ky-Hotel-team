import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const menus = [
    { name: "대시보드", path: "/admin/dashboard", icon: "📊" },
    { name: "호텔 승인 관리", path: "/admin/hotels", icon: "🏨" },
    { name: "회원 관리", path: "/admin/users", icon: "👥" },
    { name: "리뷰 관리", path: "/admin/reviews", icon: "⭐" },
    { name: "쿠폰 관리", path: "/admin/coupons", icon: "🎫" },
    { name: "시스템 설정", path: "/admin/settings", icon: "⚙️" },
    { name: "내 정보", path: "/admin/me", icon: "👤" },
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