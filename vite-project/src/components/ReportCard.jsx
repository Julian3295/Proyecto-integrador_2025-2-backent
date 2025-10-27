// src/components/ReportCard.jsx

import React from 'react';

// Estilos simples (asume que usarás CSS o alguna librería)
const cardStyle = {
  border: '1px solid #ddd',
  padding: '15px',
  borderRadius: '8px',
  textAlign: 'center',
  margin: '10px',
  width: '200px',
  boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
};

const ReportCard = ({ title, value, icon = '📊' }) => {
  return (
    <div style={cardStyle}>
      <div style={{ fontSize: '2em' }}>{icon}</div>
      <h3>{title}</h3>
      <p style={{ fontSize: '1.8em', fontWeight: 'bold' }}>{value}</p>
    </div>
  );
};

export default ReportCard;