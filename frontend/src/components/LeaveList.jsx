import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyLeaves } from '../features/leaves/leaveSlice';

const LeaveList = ({ token }) => {
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.leaves.list);

  useEffect(() => {
    dispatch(fetchMyLeaves(token));
  }, [dispatch, token]);

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>My Leaves</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>From</th>
            <th style={styles.th}>To</th>
            <th style={styles.th}>Reason</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={index}>
              <td style={styles.td}>{leave.type || '-'}</td>
              <td style={styles.td}>{new Date(leave.from).toLocaleDateString()}</td>
              <td style={styles.td}>{new Date(leave.to).toLocaleDateString()}</td>
              <td style={styles.td}>{leave.reason}</td>
              <td style={styles.td}>
                <span style={{ 
                  ...styles.status, 
                  backgroundColor: getStatusColor(leave.status) 
                }}>
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Approved':
      return '#4caf50'; // green
    case 'Rejected':
      return '#f44336'; // red
    case 'Pending':
    default:
      return '#ff9800'; // orange
  }
};

const styles = {
  container: {
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  table: {
    margin: '0 auto',
    width: '100%',
    maxWidth: '800px',
    borderCollapse: 'collapse',
    background: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  th: {
    padding: '12px',
    background: '#f5f5f5',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee',
    textAlign: 'left',
  },
  status: {
    padding: '5px 12px',
    color: '#fff',
    borderRadius: '20px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    display: 'inline-block',
    fontSize: '0.85rem',
  },
};

export default LeaveList;
