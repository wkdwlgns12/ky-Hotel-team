import { useState, useEffect } from "react";
import { adminUserApi } from "../../api/adminUserApi";
import AdminUserTable from "../../components/admin/users/AdminUserTable";
import AdminUserFilter from "../../components/admin/users/AdminUserFilter";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination"; //

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ role: "", search: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10, ...filters };
      const res = await adminUserApi.getUsers(params);
      setUsers(res.items || []); // 백엔드 응답 구조에 맞춤
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]); // 페이지 변경 시 자동 호출

  const handleUpdateUser = async (userId, data) => {
    try {
      await adminUserApi.updateUser(userId, data); // 백엔드 PUT /api/user/admin/:userId
      alert("처리되었습니다.");
      fetchUsers();
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="page-container">
      <div className="page-header"><h1>👥 회원 관리</h1></div>
      <AdminUserFilter 
        filters={filters} 
        onFilterChange={(newFilters) => setFilters(prev => ({...prev, ...newFilters}))}
        onSearch={() => { setPage(1); fetchUsers(); }}
      />
      <AdminUserTable users={users} onUpdateUser={handleUpdateUser} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default AdminUserListPage;