import { Navigate } from "react-router-dom";
import BusinessLayout from "../components/layout/BusinessLayout";
import BusinessLoginPage from "../pages/auth/BusinessLoginPage";
import BusinessSignupPage from "../pages/auth/BusinessSignupPage";
import BusinessDashboardPage from "../pages/business/BusinessDashboardPage";
import BusinessMyHotelPage from "../pages/business/BusinessMyHotelPage";
import BusinessBookingPage from "../pages/business/BusinessBookingPage";
import BusinessReviewPage from "../pages/business/BusinessReviewPage";
import BusinessCouponPage from "../pages/business/BusinessCouponPage";
import BusinessCouponDetailPage from "../pages/business/BusinessCouponDetailPage"; // ★ 추가
import AdminSettingsPage from "../pages/admin/AdminSettingsPage";
import AdminMyProfilePage from "../pages/admin/AdminMyProfilePage";

const businessRoutes = [
  { path: "/owner/login", element: <BusinessLoginPage /> },
  { path: "/owner/signup", element: <BusinessSignupPage /> },
  {
    path: "/owner",
    element: <BusinessLayout />,
    children: [
      { index: true, element: <Navigate to="/owner/dashboard" replace /> },
      { path: "dashboard", element: <BusinessDashboardPage /> },
      { path: "my-hotel", element: <BusinessMyHotelPage /> },
      { path: "bookings", element: <BusinessBookingPage /> },
      { path: "reviews", element: <BusinessReviewPage /> },
      { path: "coupons", element: <BusinessCouponPage /> },
      { path: "coupons/:couponId", element: <BusinessCouponDetailPage /> }, // 라우트 추가
      { path: "settings", element: <AdminSettingsPage /> },
      { path: "me", element: <AdminMyProfilePage /> },
    ],
  },
];

export default businessRoutes;