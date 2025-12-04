import { Link } from "react-router-dom";

const AdminCouponTable = ({ coupons, onDelete, readOnly = false }) => {
  return (
    <div className="table-wrapper card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>쿠폰명</th>
            <th>코드</th>
            <th>할인 혜택</th>
            <th>수량 / 조건</th> {/* ★ 변경됨 */}
            <th>기간</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {coupons.length > 0 ? coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td style={{fontWeight:'bold'}}>{coupon.name}</td>
              <td><code style={{background:'#f1f5f9', padding:'2px 6px', borderRadius:'4px'}}>{coupon.code}</code></td>
              <td style={{color:'#2563eb'}}>
                {coupon.type === 'percent' ? `${coupon.discount}%` : `₩${coupon.discount.toLocaleString()}`} 할인
              </td>
              <td>
                {/* ★ 수량 및 최소금액 표시 ★ */}
                <div style={{fontSize:'0.9rem', fontWeight:'bold'}}>
                    {coupon.quantity ? `${coupon.quantity.toLocaleString()}장` : '무제한'}
                </div>
                <div style={{fontSize:'0.8rem', color:'#64748b'}}>
                  {coupon.minOrderAmount > 0 ? `₩${coupon.minOrderAmount.toLocaleString()} 이상` : "조건 없음"}
                </div>
              </td>
              <td style={{fontSize:'0.9rem', color:'#64748b'}}>
                {coupon.startDate} ~ {coupon.endDate}
              </td>
              <td>
                <span className={`badge badge-${coupon.status === 'active' ? 'success' : 'secondary'}`}>
                  {coupon.status === 'active' ? '진행중' : '종료됨'}
                </span>
              </td>
              <td>
                <div style={{display:'flex', gap:'5px'}}>
                  {readOnly ? (
                    /* ★ 사업자용 상세보기 버튼 ★ */
                    <Link to={`/owner/coupons/${coupon.id}`} className="btn btn-outline" style={{padding:'4px 8px', fontSize:'0.8rem'}}>
                        상세보기
                    </Link>
                  ) : (
                    /* 관리자용 수정/삭제 버튼 */
                    <>
                      <Link to={`/admin/coupons/${coupon.id}/edit`} className="btn btn-outline" style={{padding:'4px 8px', fontSize:'0.8rem'}}>수정</Link>
                      <button onClick={() => onDelete(coupon.id)} className="btn btn-danger-sm">삭제</button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="7" style={{textAlign:'center', padding:'20px'}}>등록된 쿠폰이 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCouponTable;