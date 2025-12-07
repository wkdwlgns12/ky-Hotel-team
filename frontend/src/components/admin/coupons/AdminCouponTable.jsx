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
            <th>수량 / 조건</th>
            <th>기간</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <tr key={coupon._id || coupon.id}> {/* id 또는 _id 모두 대응 */}
                <td style={{ fontWeight: "bold" }}>{coupon.name}</td>
                <td>
                  <code
                    style={{
                      background: "#f1f5f9",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    {coupon.code}
                  </code>
                </td>
                <td style={{ color: "#2563eb" }}>
                  {/* ✅ 수정됨: discount -> discountAmount 사용 */}
                  {/* type 필드가 없다면 기본적으로 금액으로 표시하거나, 상황에 맞춰 수정 필요 */}
                  {coupon.type === "percent"
                    ? `${coupon.discountAmount}%`
                    : `₩${(coupon.discountAmount || 0).toLocaleString()}`}{" "}
                  할인
                </td>
                <td>
                  <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                    {coupon.quantity
                      ? `${coupon.quantity.toLocaleString()}장`
                      : "무제한"}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {coupon.minOrderAmount > 0
                      ? `₩${coupon.minOrderAmount.toLocaleString()} 이상`
                      : "조건 없음"}
                  </div>
                </td>
                <td style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {/* ✅ 수정됨: startDate/endDate -> validFrom/validTo 사용 */}
                  {formatDate(coupon.validFrom)} ~ {formatDate(coupon.validTo)}
                </td>
                <td>
                  {/* isActive 필드 대응 (status가 없을 경우 대비) */}
                  <span
                    className={`badge badge-${
                      coupon.status === "active" || coupon.isActive
                        ? "success"
                        : "secondary"
                    }`}
                  >
                    {coupon.status === "active" || coupon.isActive
                      ? "진행중"
                      : "종료됨"}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "5px" }}>
                    {readOnly ? (
                      <Link
                        to={`/owner/coupons/${coupon._id || coupon.id}`}
                        className="btn btn-outline"
                        style={{ padding: "4px 8px", fontSize: "0.8rem" }}
                      >
                        상세보기
                      </Link>
                    ) : (
                      <>
                        <Link
                          to={`/admin/coupons/${coupon._id || coupon.id}/edit`}
                          className="btn btn-outline"
                          style={{ padding: "4px 8px", fontSize: "0.8rem" }}
                        >
                          수정
                        </Link>
                        <button
                          onClick={() => onDelete(coupon._id || coupon.id)}
                          className="btn btn-danger-sm"
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
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