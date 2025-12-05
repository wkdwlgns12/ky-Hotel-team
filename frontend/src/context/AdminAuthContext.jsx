import { createContext, useState, useEffect } from "react";
import { adminAuthApi } from "../api/adminAuthApi";
import { useNavigate, useLocation } from "react-router-dom";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // 초기 로딩 시 토큰 체크
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // 백엔드에 내 정보 요청
        const userData = await adminAuthApi.getMyInfo();
        setUser(userData.user || userData); // 구조에 따라 처리
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // 로그인 함수
  const login = async (credentials) => {
    try {
      const data = await adminAuthApi.login(credentials);
      // 백엔드 응답: { user, token }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await adminAuthApi.logout();
    } catch (e) {
      // API 실패해도 클라이언트 로그아웃은 진행
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/auth/login");
    }
  };

  // 내 정보 수정 함수 (context 업데이트용)
  const updateMyInfo = async (updateData) => {
    // 실제 API 호출은 컴포넌트에서 하고, 여기선 상태만 갱신하거나 
    // 필요하면 여기서 API 호출까지 통합 가능.
    // 여기서는 상태 갱신만 처리
    setUser(prev => ({ ...prev, ...updateData }));
  };

  return (
    <AdminAuthContext.Provider value={{ user, login, logout, loading, updateMyInfo }}>
      {children}
    </AdminAuthContext.Provider>
  );
};