import { createContext, useState, useEffect } from "react";
import adminAuthApi from "../api/adminAuthApi";

export const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (token) {
        const data = await adminAuthApi.getMyInfo();
        const response = data.data || data;
        setAdminInfo(response.user || response);
      }
    } catch (error) {
      localStorage.removeItem("adminToken");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const data = await adminAuthApi.login(credentials);
    const response = data.data || data;
    const user = response.user || response.admin;
    localStorage.setItem("adminToken", response.token);
    setAdminInfo(user);
    return user; // user 정보 반환 (role 포함)
  };

  const logout = async () => {
    localStorage.removeItem("adminToken");
    setAdminInfo(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{ adminInfo, loading, login, logout, checkAuth }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthContext;
