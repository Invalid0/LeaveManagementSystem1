import React from 'react';

const cards = [
  { label: "Leave(s) Allowed", value: 20, color: '#007bff' },
  { label: "Available Leave", value: 14.5, color: '#28a745' },
  { label: "Leave(s) Taken", value: 6.5, color: '#dc3545' },
  { label: "Balance Leave(s)", value: 8, color: '#17a2b8' },
];

const LeaveSummaryCards = () => (
  <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
    {cards.map((card, idx) => (
      <div key={idx} style={{
        background: card.color, color: '#fff',
        padding: '15px', borderRadius: '8px', minWidth: '160px',
        textAlign: 'center', fontWeight: 'bold'
      }}>
        <div style={{ fontSize: '20px' }}>{card.value.toFixed(2)}</div>
        <div style={{ fontSize: '14px' }}>{card.label}</div>
      </div>
    ))}
  </div>
);

export default LeaveSummaryCards;
