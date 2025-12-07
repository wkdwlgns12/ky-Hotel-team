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
      { path: "coupons/:couponId", element: <BusinessCouponDetailPage /> },
      // Settings, Profile 라우트 제거
    ],
  },
];

export default businessRoutes;