import React from 'react';

const AdminUserFilter = ({ filters, onFilterChange, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="filter-section card" style={{ padding: "20px", marginBottom: "20px" }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* 권한 필터 */}
        <select
          value={filters.role || ""}
          onChange={(e) => onFilterChange({ role: e.target.value })}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0", minWidth: "150px" }}
        >
          <option value="">전체 권한</option>
          <option value="user">일반 회원</option>
          <option value="owner">사업자</option>
          <option value="admin">관리자</option>
        </select>
        
        {/* 검색어 입력 */}
        <input 
          type="text" 
          placeholder="이름 또는 이메일 검색"
          value={filters.search || ""}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          onKeyDown={handleKeyDown}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0", flex: 1 }}
        />
        
        {/* 검색 버튼 */}
        <button onClick={onSearch} className="btn btn-primary" style={{ padding: "10px 20px" }}>
          검색
        </button>
      </div>
    </div>
  );
};

export default AdminUserFilter;