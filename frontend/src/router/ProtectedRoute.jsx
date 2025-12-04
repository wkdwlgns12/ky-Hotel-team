import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../hooks/useAdminAuth";
import Loader from "../components/common/Loader";

const ProtectedRoute = () => {
  const { adminInfo, loading } = useAdminAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!adminInfo) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;