import React, { useState } from 'react';
import axios from 'axios';

const LeaveForm = ({ token, onLeaveSubmitted }) => {
  const [leaveType, setLeaveType] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:4040/api/leave', {
      type: leaveType,
      from,
      to,
      reason
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setLeaveType('');
    setFrom('');
    setTo('');
    setReason('');
    alert('Leave applied successfully!');

    if (onLeaveSubmitted) onLeaveSubmitted(); // trigger list refresh
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Apply for Leave</h2>

      <select
        value={leaveType}
        onChange={(e) => setLeaveType(e.target.value)}
        required
        style={inputStyle}
      >
        <option value="">Select leave type...</option>
        <option value="Casual Leave">Casual Leave</option>
        <option value="Medical Leave">Medical Leave</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Marriage Leave">Marriage Leave</option>
        <option value="Emergency Leave">Emergency Leave</option>
      </select>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Description"
        required
        style={{ ...inputStyle, height: '60px' }}
      />

      <button type="submit" style={buttonStyle}>Apply</button>
    </form>
  );
};

const formStyle = {
  maxWidth: '400px',
  margin: '40px auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '30px',
  boxShadow: '0 0 10px #ccc',
  borderRadius: '8px'
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '100%',
};

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#3f51b5',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default LeaveForm;
