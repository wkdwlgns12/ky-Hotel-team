import { createContext, useState, useEffect } from "react";
import { adminAuthApi } from "../api/adminAuthApi";
import { useNavigate } from "react-router-dom";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 앱 시작 시 토큰 검증
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await adminAuthApi.getMyInfo();
        setUser(userData.user || userData);
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await adminAuthApi.login(credentials);
      // 백엔드 응답: { token: "...", user: { ... } }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await adminAuthApi.logout();
    } catch (e) {
      console.log("Logout API call failed, local logout only");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/auth/login");
    }
  };

  const updateMyInfo = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
  };

  return (
    <AdminAuthContext.Provider value={{ user, login, logout, loading, updateMyInfo }}>
      {children}
    </AdminAuthContext.Provider>
  );
};