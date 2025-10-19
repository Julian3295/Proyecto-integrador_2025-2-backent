// src/router/index.jsx

import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage'; 
// 🎯 1. IMPORTA EL NUEVO COMPONENTE DE DETALLE
import StudentDetailPage from '../pages/StudentDetailPage'; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />, 
  },
  {
    // 🎯 2. AÑADE LA RUTA DINÁMICA
    path: "/estudiantes/:id", // :id es el parámetro que capturaremos
    element: <StudentDetailPage />, 
  },
  // ...
]);