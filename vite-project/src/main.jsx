import React from 'react';
import ReactDOM from 'react-dom/client';
// Importamos el AuthProvider directamente aquí
import { AuthProvider } from './context/AuthContext'; 
import { RouterProvider } from 'react-router-dom'; 
import { router } from './router/index.jsx'; 
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ¡ESTO ES LO CRUCIAL! Envolvemos el RouterProvider con AuthProvider. */}
    <AuthProvider>
        <RouterProvider router={router} /> 
    </AuthProvider>
  </React.StrictMode>,
);
