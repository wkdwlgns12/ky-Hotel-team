import { useState, useEffect } from "react";
import { adminUserApi } from "../../api/adminUserApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({ search: "", status: "", grade: "" });
  const navigate = useNavigate();

  useEffect(() => { loadUsers(); }, [filters, activeTab]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const typeFilter = activeTab === 'all' ? '' : activeTab;
      const response = await adminUserApi.getUsers({ ...filters, role: typeFilter });
      const responseData = response.data || response;
      // Backend는 items 배열을 반환함
      const usersData = Array.isArray(responseData?.items) ? responseData.items : (Array.isArray(responseData) ? responseData : []);
      setUsers(usersData);
    } catch (error) { 
      console.error(error);
      setUsers([]); // 에러 시 빈 배열로 설정
    } 
    finally { setLoading(false); }
  };

  const getStatusBadge = (status) => {
    if (status === 'active') return <span className="badge badge-active">활성</span>;
    return <span className="badge badge-inactive">비활성</span>;
  };

  return (
    <div className="admin-user-page">
      <div className="page-header"><h1>👥 회원 관리</h1></div>
      
      <div className="tabs" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab("all")} className={`btn ${activeTab === "all" ? "btn-primary" : "btn-outline"}`}>전체</button>
        <button onClick={() => setActiveTab("regular")} className={`btn ${activeTab === "regular" ? "btn-primary" : "btn-outline"}`}>일반 회원</button>
        <button onClick={() => setActiveTab("business")} className={`btn ${activeTab === "business" ? "btn-primary" : "btn-outline"}`}>사업자 회원</button>
      </div>

      <div className="card" style={{padding:'15px', marginBottom:'20px'}}>
        <div className="filter-grid" style={{display:'flex', gap:'10px'}}>
          <input type="text" placeholder="이름/이메일 검색" value={filters.search} onChange={(e) => setFilters({...filters, search: e.target.value})} style={{padding:'8px', border:'1px solid #ddd', borderRadius:'4px'}} />
          <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} style={{padding:'8px', border:'1px solid #ddd', borderRadius:'4px'}}>
            <option value="">전체 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
          </select>
        </div>
      </div>

      {loading ? <Loader /> : (
        <div className="table-wrapper card">
          <table className="admin-table">
            <thead><tr><th>회원명</th><th>연락처</th><th>유형</th><th>가입일</th><th>상태</th><th>관리</th></tr></thead>
            <tbody>
              {users.length > 0 ? users.map(user => (
                <tr key={user._id || user.id}>
                  <td><div style={{fontWeight:'bold'}}>{user.name}</div><div style={{fontSize:'12px', color:'#64748b'}}>{user.email}</div></td>
                  <td>{user.phone || '-'}</td>
                  <td><span className="badge badge-secondary">{user.role === "owner" ? "사업자" : user.role === "admin" ? "관리자" : "일반"}</span></td>
                  <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
                  <td>{getStatusBadge(user.isBlocked ? 'inactive' : 'active')}</td>
                  <td>
                    <button className="btn btn-outline-sm" onClick={() => navigate(`/admin/users/${user._id || user.id}`)}>상세보기</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" style={{textAlign:'center', padding:'20px'}}>등록된 회원이 없습니다.</td>
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