import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../components/layout/AdminLayout";
import AdminLoginPage from "../pages/auth/AdminLoginPage";
import AdminForgotPasswordPage from "../pages/auth/AdminForgotPasswordPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminHotelListPage from "../pages/admin/AdminHotelListPage";
import AdminHotelCreatePage from "../pages/admin/AdminHotelCreatePage";
import AdminHotelEditPage from "../pages/admin/AdminHotelEditPage";
import AdminReviewListPage from "../pages/admin/AdminReviewListPage";
import AdminReviewDetailPage from "../pages/admin/AdminReviewDetailPage";
import AdminCouponListPage from "../pages/admin/AdminCouponListPage";
import AdminCouponCreatePage from "../pages/admin/AdminCouponCreatePage";
import AdminCouponEditPage from "../pages/admin/AdminCouponEditPage";

const adminRoutes = [
  {
    path: "/auth/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin/login",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/admin/forgot-password",
    element: <AdminForgotPasswordPage />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboardPage /> },
          { path: "hotels", element: <AdminHotelListPage /> },
          { path: "hotels/new", element: <AdminHotelCreatePage /> },
          { path: "hotels/:hotelId/edit", element: <AdminHotelEditPage /> },
          { path: "reviews", element: <AdminReviewListPage /> },
          { path: "reviews/:reviewId", element: <AdminReviewDetailPage /> },
          { path: "coupons", element: <AdminCouponListPage /> },
          { path: "coupons/new", element: <AdminCouponCreatePage /> },
          { path: "coupons/:couponId/edit", element: <AdminCouponEditPage /> },
        ],
      },
    ],
  },
];

export default adminRoutes;