import { Link } from "react-router-dom";

const AdminUserTable = ({ users, onUpdateUser }) => {
  const handleRoleChange = (userId, newRole) => {
    if (confirm(`권한을 ${newRole}(으)로 변경하시겠습니까?`)) {
      onUpdateUser(userId, { role: newRole });
    }
  };

  const handleBlockToggle = (user) => {
    const action = user.isBlocked ? "차단 해제" : "차단";
    if (confirm(`정말 이 회원을 ${action} 하시겠습니까?`)) {
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
              <td style={{fontWeight:'bold'}}>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select 
                  value={user.role} 
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  style={{padding:'4px', borderRadius:'4px', border:'1px solid #ddd'}}
                >
                  <option value="user">일반 회원</option>
                  <option value="owner">사업자</option>
                  <option value="admin">관리자</option>
                </select>
              </td>
              <td>
                {user.isBlocked ? 
                  <span className="badge badge-danger">차단됨</span> : 
                  <span className="badge badge-success">활동중</span>
                }
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button 
                  className={`btn ${user.isBlocked ? 'btn-success-sm' : 'btn-danger-sm'}`}
                  onClick={() => handleBlockToggle(user)}
                >
                  {user.isBlocked ? "해제" : "차단"}
                </button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="6" style={{textAlign:'center', padding:20}}>회원이 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserTable;