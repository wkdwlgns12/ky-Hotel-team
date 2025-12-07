import { createContext, useState, useEffect } from "react";
import { adminAuthApi } from "../api/adminAuthApi";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  // user 객체를 저장하는 상태 (adminInfo라는 이름으로 사용)
  const [adminInfo, setAdminInfo] = useState(null); 
  const [loading, setLoading] = useState(true);

  // 앱 로드 시 토큰 확인 및 유저 정보 갱신
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // 백엔드: GET /api/auth/me -> 응답: { success: true, data: { ...user } }
          // axiosClient가 data를 반환하므로 res는 user 객체입니다.
          const res = await adminAuthApi.getMyInfo();
          
          // 혹시 모를 구조 차이에 대비 (res.user 또는 res 자체가 user)
          const userData = res.user || res;
          setAdminInfo(userData);
        } catch (error) {
          console.error("Auth verify failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAdminInfo(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  // 로그인 함수
  const login = async (credentials) => {
    // 백엔드: POST /api/auth/login -> 응답: { data: { user: {...}, token: "..." } }
    const res = await adminAuthApi.login(credentials);
    const { token, user } = res;
    
    // 로컬 스토리지 저장
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    
    // 상태 업데이트
    setAdminInfo(user);
    return user;
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAdminInfo(null);
    window.location.href = "/auth/login";
  };

  return (
    <AdminAuthContext.Provider value={{ adminInfo, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;