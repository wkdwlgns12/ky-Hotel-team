import { Link } from "react-router-dom";

const AdminCouponTable = ({ coupons, onDelete, readOnly = false }) => {
  // 날짜 포맷팅 함수 (YYYY-MM-DD)
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  return (
    <div className="table-wrapper card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>쿠폰명</th>
            <th>코드</th>
            <th>할인 혜택</th>
            <th>대상 사업자</th>
            <th>기간</th>
            <th>상태</th>
            {!readOnly && <th>관리</th>}
          </tr>
        </thead>
        <tbody>
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <tr key={coupon._id || coupon.id}>
                <td style={{ fontWeight: "bold" }}>{coupon.name}</td>
                <td>
                  <code
                    style={{
                      background: "#f1f5f9",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontFamily: "monospace",
                      fontWeight: "bold"
                    }}
                  >
                    {coupon.code}
                  </code>
                </td>
                <td style={{ color: "#2563eb", fontWeight: "600" }}>
                  ₩{coupon.discountAmount?.toLocaleString()} 할인
                </td>
                <td>
                  {coupon.owner?.name || "정보 없음"} 
                  <span style={{fontSize:'0.8rem', color:'#888', display:'block'}}>
                    ({coupon.owner?.email})
                  </span>
                </td>
                <td style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {formatDate(coupon.validFrom)} ~ {formatDate(coupon.validTo)}
                </td>
                <td>
                  <span
                    className={`badge badge-${
                      coupon.isActive ? "success" : "secondary"
                    }`}
                  >
                    {coupon.isActive ? "활성" : "종료됨"}
                  </span>
                </td>
                {!readOnly && (
                  <td>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        onClick={() => onDelete(coupon._id || coupon.id)}
                        className="btn btn-danger-sm"
                        disabled={!coupon.isActive} // 이미 비활성화된 쿠폰은 버튼 비활성
                      >
                        중단
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={readOnly ? "6" : "7"} style={{ textAlign: "center", padding: "30px", color: "#888" }}>
                등록된 쿠폰이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCouponTable;