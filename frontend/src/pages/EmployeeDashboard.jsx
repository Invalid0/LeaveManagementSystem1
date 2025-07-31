import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeaveForm from '../components/LeaveForm';
import LeaveList from '../components/LeaveList';

const EmployeeDashboard = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleLeaveSubmitted = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.headerSection}>
          <h2 style={styles.header}>Employee Dashboard</h2>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>

        <div style={styles.card}>
          <LeaveForm token={token} onLeaveSubmitted={handleLeaveSubmitted} />
        </div>

        <div style={styles.card}>
          <LeaveList key={refreshKey} token={token} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  background: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '40px',
  },
  container: {
    width: '90%',
    maxWidth: '900px',
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    marginBottom: '20px',
  },
  header: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff5252',
    border: 'none',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  card: {
    background: '#fff',
    borderRadius: '10px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
};

export default EmployeeDashboard;
