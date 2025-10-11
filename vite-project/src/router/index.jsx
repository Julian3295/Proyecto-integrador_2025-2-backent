// src/router/index.jsx (Ejemplo)
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx'; // Asegúrate de que exista y esté importada

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />, // Debe ser el Login
    // ... otras rutas
  },
]);