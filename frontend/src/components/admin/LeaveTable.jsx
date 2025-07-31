import React from 'react';

const mockLeaves = [
  { type: 'Sick Leave', mode: 'Full Day', days: 1, reason: 'Cold', status: 'Pending' },
  { type: 'Medical Leave', mode: 'Multi-Day', days: 2, reason: 'Checkup', status: 'Approved' },
];

const statusColors = {
  Pending: 'orange',
  Approved: 'green',
  Cancelled: 'red'
};

const LeaveTable = () => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr style={{ background: '#f8f9fa' }}>
        <th>Type</th><th>Mode</th><th>No. of days</th><th>Reason</th><th>Status</th>
      </tr>
    </thead>
    <tbody>
      {mockLeaves.map((leave, idx) => (
        <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
          <td>{leave.type}</td>
          <td>{leave.mode}</td>
          <td>{leave.days}</td>
          <td>{leave.reason}</td>
          <td style={{ color: statusColors[leave.status] }}>{leave.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default LeaveTable;
