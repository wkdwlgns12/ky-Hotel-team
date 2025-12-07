import { createContext, useState, useEffect } from "react";
import { adminAuthApi } from "../api/adminAuthApi";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await adminAuthApi.getMyInfo();
          // 백엔드 응답이 { user: {...} } 형태임
          setUser(res.user || res);
        } catch (error) {
          console.error("Auth verify failed", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    const res = await adminAuthApi.login(credentials);
    // res 구조: { token: "...", user: {...} }
    const { token, user: userData } = res;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/auth/login";
  };

  return (
    <AdminAuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};