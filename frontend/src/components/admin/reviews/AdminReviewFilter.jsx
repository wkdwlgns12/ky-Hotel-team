const AdminReviewFilter = ({ filters, onFilterChange, onSearch }) => {
  return (
    <div className="filter-section card" style={{marginBottom: '20px', padding: '20px'}}>
      <div className="filter-grid" style={{display: 'flex', gap: '10px', alignItems:'center'}}>
        <input
          type="text"
          placeholder="호텔명/작성자로 검색..."
          value={filters.search || ""}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          style={{padding:'8px', border:'1px solid #e2e8f0', borderRadius:'4px'}}
        />
        
        <select
          value={filters.rating || ""}
          onChange={(e) => onFilterChange({ rating: e.target.value })}
          style={{padding:'8px', border:'1px solid #e2e8f0', borderRadius:'4px'}}
        >
          <option value="">전체 별점</option>
          <option value="5">⭐⭐⭐⭐⭐ (5점)</option>
          <option value="4">⭐⭐⭐⭐ (4점)</option>
          <option value="3">⭐⭐⭐ (3점)</option>
          <option value="2">⭐⭐ (2점)</option>
          <option value="1">⭐ (1점)</option>
        </select>

        <select
          value={filters.reported || ""}
          onChange={(e) => onFilterChange({ reported: e.target.value })}
          style={{padding:'8px', border:'1px solid #e2e8f0', borderRadius:'4px'}}
        >
          <option value="">전체 상태</option>
          <option value="true">🚨 신고됨</option>
          <option value="false">정상</option>
        </select>
        
        <button className="btn btn-primary" onClick={onSearch}>검색</button>
      </div>
    </div>
  );
};

export default AdminReviewFilter;