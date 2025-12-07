import { useState, useEffect } from "react";
import { adminUserApi } from "../../api/adminUserApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (activeTab === 'regular') params.role = 'user';
      if (activeTab === 'business') params.role = 'owner';
      
      const response = await adminUserApi.getUsers(params);
      setUsers(response.items || []);
    } catch (error) { 
      console.error(error);
      setUsers([]);
    } 
    finally { setLoading(false); }
  };

  useEffect(() => { loadUsers(); }, [activeTab]);

  return (
    <div className="admin-user-page">
      <div className="page-header"><h1>👥 회원 관리</h1></div>
      
      <div className="tabs" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab("all")} className={`btn ${activeTab === "all" ? "btn-primary" : "btn-outline"}`}>전체</button>
        <button onClick={() => setActiveTab("regular")} className={`btn ${activeTab === "regular" ? "btn-primary" : "btn-outline"}`}>일반 회원</button>
        <button onClick={() => setActiveTab("business")} className={`btn ${activeTab === "business" ? "btn-primary" : "btn-outline"}`}>사업자 회원</button>
      </div>

      {loading ? <Loader /> : (
        <div className="table-wrapper card">
          <table className="admin-table">
            <thead><tr><th>회원명</th><th>이메일</th><th>유형</th><th>가입일</th><th>관리</th></tr></thead>
            <tbody>
              {users.length > 0 ? users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className="badge badge-secondary">{user.role}</span></td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-outline-sm" onClick={() => navigate(`/admin/users/${user._id}`)}>상세보기</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" style={{textAlign:'center', padding:'20px'}}>등록된 회원이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserListPage;