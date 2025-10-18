// src/router/index.jsx (o donde definiste tus rutas)
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage'; // 👈 Asegúrate de importar

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    // 🎯 AÑADE ESTA RUTA FALTANTE
    path: "/dashboard",
    element: <DashboardPage />, 
  },
  // ...
]);