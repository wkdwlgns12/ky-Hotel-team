import { Navigate } from "react-router-dom";
import BusinessLayout from "../components/layout/BusinessLayout";
import BusinessLoginPage from "../pages/auth/BusinessLoginPage";
import BusinessSignupPage from "../pages/auth/BusinessSignupPage";
import BusinessDashboardPage from "../pages/business/BusinessDashboardPage";
import BusinessMyHotelPage from "../pages/business/BusinessMyHotelPage";
import BusinessBookingPage from "../pages/business/BusinessBookingPage";
import BusinessReviewPage from "../pages/business/BusinessReviewPage";
import BusinessCouponPage from "../pages/business/BusinessCouponPage";
import BusinessCouponDetailPage from "../pages/business/BusinessCouponDetailPage";
import BusinessMyProfilePage from "../pages/business/BusinessMyProfilePage";
import BusinessSettingsPage from "../pages/business/BusinessSettingsPage";
import ProtectedRoute from "./ProtectedRoute";

const businessRoutes = [
  { path: "/owner/login", element: <BusinessLoginPage /> },
  { path: "/owner/signup", element: <BusinessSignupPage /> },
  {
    path: "/owner",
    // 사업자도 로그인이 필요하므로 ProtectedRoute로 감쌉니다.
    element: <ProtectedRoute />, 
    children: [
      {
        element: <BusinessLayout />,
        children: [
          { index: true, element: <Navigate to="/owner/dashboard" replace /> },
          { path: "dashboard", element: <BusinessDashboardPage /> },
          
          // 내 호텔 관리 (객실 관리 포함)
          { path: "my-hotel", element: <BusinessMyHotelPage /> },
          
          // 예약 관리
          { path: "bookings", element: <BusinessBookingPage /> },
          
          // 리뷰 관리 (신고 기능)
          { path: "reviews", element: <BusinessReviewPage /> },
          
          // 쿠폰 관리 (조회 전용)
          { path: "coupons", element: <BusinessCouponPage /> },
          { path: "coupons/:couponId", element: <BusinessCouponDetailPage /> },

          // 설정 및 내 정보
          { path: "settings", element: <BusinessSettingsPage /> },
          { path: "me", element: <BusinessMyProfilePage /> },
        ],
      },
    ],
  },
];

export default businessRoutes;