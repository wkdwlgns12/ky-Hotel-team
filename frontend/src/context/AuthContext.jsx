import { createContext, useState, useEffect } from "react";
import authApi from "../api/authApi";
import userApi from "../api/userApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      
      const response = await authApi.getMe();
      // 백엔드 응답: { success: true, message: "...", data: { user: {...} } }
      if (response?.success && response?.data) {
        // data.user가 있으면 user 사용, 없으면 data 자체가 user 객체일 수 있음
        setUser(response.data.user || response.data);
      }
    } catch (error) {
      // 401 에러는 정상적인 경우(토큰 없음/만료)이므로 조용히 처리
      // 에러를 콘솔에 표시하지 않음
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    // 백엔드 응답: { success: true, message: "...", data: { user: {...}, token: "..." } }
    if (response?.success && response?.data) {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      setUser(response.data.user || response.data);
      return response.data;
    }
    throw new Error(response?.message || "로그인에 실패했습니다.");
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const response = await userApi.getMe();
      setUser(response.data);
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        checkAuth,
        refreshUser,
        isAdmin: user?.role === "admin",
        isOwner: user?.role === "owner",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

