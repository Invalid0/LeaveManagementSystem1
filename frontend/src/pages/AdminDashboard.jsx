import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ for redirect

const statusColors = {
  Pending: '#ffc107',
  Approved: '#28a745',
  Rejected: '#dc3545',
};

const AdminDashboard = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4040/api/leave/all', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setLeaves(res.data));
  }, [token]);

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:4040/api/leave/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      axios.get('http://localhost:4040/api/leave/all', {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => setLeaves(res.data));
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>📋 Admin Leave Dashboard</h2>
        <button onClick={handleLogout} style={logoutStyle}>🚪 Logout</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 10px #ccc' }}>
        <thead style={{ background: '#343a40', color: 'white' }}>
          <tr>
            <th style={thStyle}>Employee</th>
            <th style={thStyle}>From</th>
            <th style={thStyle}>To</th>
            <th style={thStyle}>Days</th>
            <th style={thStyle}>Reason</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} style={{ textAlign: 'center' }}>
              <td style={tdStyle}>{leave.user.username}</td>
              <td style={tdStyle}>{leave.from?.slice(0, 10)}</td>
              <td style={tdStyle}>{leave.to?.slice(0, 10)}</td>
              <td style={tdStyle}>{calculateDays(leave.from, leave.to)}</td>
              <td style={tdStyle}>{leave.reason}</td>
              <td style={tdStyle}>
                <span
                  style={{
                    padding: '5px 10px',
                    borderRadius: '12px',
                    backgroundColor: statusColors[leave.status] || '#ccc',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {leave.status}
                </span>
              </td>
              <td style={tdStyle}>
                {leave.status === 'Pending' && (
                  <>
                    <button onClick={() => updateStatus(leave._id, 'Approved')} style={btnStyle('#28a745')}>
                      Approve
                    </button>
                    <button onClick={() => updateStatus(leave._id, 'Rejected')} style={btnStyle('#dc3545')}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const thStyle = {
  padding: '10px',
  border: '1px solid #dee2e6',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #dee2e6',
};

const btnStyle = (bg) => ({
  background: bg,
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  margin: '0 5px',
  cursor: 'pointer',
});

const logoutStyle = {
  background: '#343a40',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

function calculateDays(from, to) {
  const start = new Date(from);
  const end = new Date(to);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  return days;
}

export default AdminDashboard;
