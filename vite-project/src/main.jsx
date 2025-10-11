import React from 'react';
import ReactDOM from 'react-dom/client';
// Ya no necesitas 'import App from './App.jsx';'

import { RouterProvider } from 'react-router-dom'; 
import { router } from './router/index.jsx'; // Asegúrate de que esta ruta sea correcta
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ¡Esto es lo único que debe estar aquí! */}
    <RouterProvider router={router} /> 
  </React.StrictMode>,
);