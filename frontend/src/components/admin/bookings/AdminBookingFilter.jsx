const AdminBookingFilter = ({ filters, onFilterChange, onSearch }) => {
  return (
    <div className="filter-section card" style={{ padding: "15px", marginBottom: "20px" }}>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        <select
          value={filters.status || ""}
          onChange={(e) => onFilterChange({ status: e.target.value })}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #e2e8f0" }}
        >
          <option value="">전체 상태</option>
          <option value="pending">대기 (Pending)</option>
          <option value="confirmed">확정 (Confirmed)</option>
          <option value="cancelled">취소 (Cancelled)</option>
          <option value="completed">완료 (Completed)</option>
        </select>

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ fontSize: "0.9rem" }}>기간:</span>
          <input 
            type="date" 
            value={filters.startDate || ""}
            onChange={(e) => onFilterChange({ startDate: e.target.value })}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #e2e8f0" }}
          />
          <span>~</span>
          <input 
            type="date" 
            value={filters.endDate || ""}
            onChange={(e) => onFilterChange({ endDate: e.target.value })}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #e2e8f0" }}
          />
        </div>

        <button onClick={onSearch} className="btn btn-primary" style={{marginLeft: "auto"}}>조회</button>
      </div>
    </div>
  );
};

export default AdminBookingFilter;