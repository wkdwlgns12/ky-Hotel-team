import { Link } from "react-router-dom";

const AdminUserTable = ({ users, onUpdateUser }) => {
  // 권한 변경 핸들러
  const handleRoleChange = (userId, newRole) => {
    if (window.confirm(`사용자 권한을 '${newRole}'(으)로 변경하시겠습니까?`)) {
      onUpdateUser(userId, { role: newRole });
    }
  };

  // 차단/해제 핸들러
  const handleBlockToggle = (user) => {
    const action = user.isBlocked ? "차단 해제" : "차단";
    if (window.confirm(`정말 이 사용자를 ${action} 하시겠습니까?`)) {
      onUpdateUser(user._id, { isBlocked: !user.isBlocked });
    }
  };

  return (
    <div className="table-wrapper card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>권한</th>
            <th>상태</th>
            <th>가입일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? users.map((user) => (
            <tr key={user._id}>
              <td style={{ fontWeight: "bold" }}>
                <Link to={`/admin/users/${user._id}`}>{user.name}</Link>
              </td>
              <td>{user.email}</td>
              <td>
                <select 
                  value={user.role} 
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  style={{ padding: "4px", borderRadius: "4px", border: "1px solid #ddd" }}
                >
                  <option value="user">일반 회원 (User)</option>
                  <option value="owner">사업자 (Owner)</option>
                  <option value="admin">관리자 (Admin)</option>
                </select>
              </td>
              <td>
                {user.isBlocked ? (
                  <span className="badge badge-danger">차단됨</span>
                ) : (
                  <span className="badge badge-success">활성</span>
                )}
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button 
                  className={`btn ${user.isBlocked ? "btn-success-sm" : "btn-danger-sm"}`}
                  onClick={() => handleBlockToggle(user)}
                  style={{ fontSize: "0.8rem", padding: "4px 8px" }}
                >
                  {user.isBlocked ? "해제" : "차단"}
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" style={{textAlign:"center", padding:"30px", color:"#888"}}>
                회원이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserTable;