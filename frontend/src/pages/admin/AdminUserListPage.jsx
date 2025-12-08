import { useState, useEffect } from "react";
import { adminUserApi } from "../../api/adminUserApi";
import AdminUserTable from "../../components/admin/users/AdminUserTable";
import AdminUserFilter from "../../components/admin/users/AdminUserFilter";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ role: "", search: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 회원 목록 불러오기
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10, ...filters };
      const res = await adminUserApi.getUsers(params);
      
      // 백엔드 응답 구조에 따라 데이터 세팅
      setUsers(res.items || res.data?.items || []);
      setTotalPages(res.totalPages || res.data?.totalPages || 1);
    } catch (error) {
      console.error(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // 페이지나 필터가 바뀔 때 데이터 다시 로드
  useEffect(() => {
    fetchUsers();
  }, [page]);

  // 검색 버튼 클릭 시 (페이지를 1로 초기화하고 재검색)
  const handleSearch = () => {
    setPage(1);
    fetchUsers();
  };

  // 회원 정보 수정 (권한 변경, 차단 등)
  const handleUpdateUser = async (userId, data) => {
    try {
      await adminUserApi.updateUser(userId, data);
      alert("회원 정보가 수정되었습니다.");
      fetchUsers(); // 목록 갱신
    } catch (e) {
      alert(e.message || "수정에 실패했습니다.");
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👥 회원 관리</h1>
      </div>
      
      <AdminUserFilter 
        filters={filters} 
        onFilterChange={(newFilters) => setFilters(prev => ({...prev, ...newFilters}))}
        onSearch={handleSearch}
      />
      
      <AdminUserTable users={users} onUpdateUser={handleUpdateUser} />
      
      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        onPageChange={setPage} 
      />
    </div>
  );
};

export default AdminUserListPage;