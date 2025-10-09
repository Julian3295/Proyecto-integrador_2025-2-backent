
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Mantenemos la importación de estilos

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Aquí es donde renderizamos nuestro componente limpio */}
  </React.StrictMode>,
);