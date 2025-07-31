import React from 'react';

const FilterSidebar = () => (
  <div style={{
    width: '220px', border: '1px solid #ddd',
    borderRadius: '8px', padding: '10px'
  }}>
    <h4>🔍 Search</h4>
    <div>
      <label>Date From:</label><br />
      <input type="date" style={{ width: '100%' }} /><br />
      <label>Date To:</label><br />
      <input type="date" style={{ width: '100%' }} /><br />
      <label>Leave Type:</label><br />
      <select style={{ width: '100%' }}>
        <option>All</option>
        <option>Sick Leave</option>
        <option>Casual</option>
        <option>Emergency</option>
      </select><br />
      <label>Status:</label><br />
      <select style={{ width: '100%' }}>
        <option>All</option>
        <option>Pending</option>
        <option>Approved</option>
        <option>Cancelled</option>
      </select><br />
      <button style={{ marginTop: '10px', width: '100%' }}>Apply Filter</button>
    </div>
  </div>
);

export default FilterSidebar;
