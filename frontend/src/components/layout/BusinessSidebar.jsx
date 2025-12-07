import { NavLink } from "react-router-dom";

const BusinessSidebar = () => {
  // 백엔드 API가 존재하는 메뉴만 표시
  const menus = [
    { name: "대시보드", path: "/owner/dashboard", icon: "📊" },
    { name: "내 호텔 관리", path: "/owner/my-hotel", icon: "🏨" },
    { name: "예약 현황", path: "/owner/bookings", icon: "📅" },
    { name: "리뷰 관리 (신고)", path: "/owner/reviews", icon: "🚨" }, // 신고된 리뷰만 조회 가능
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