import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importar Componentes de Layouts y Páginas
import ProtectedLayout from '../components/ProtectedLayout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import StudentDetailPage from '../pages/StudentDetailPage'; 
// IMPORTACIONES DE LAS PÁGINAS QUE CREASTE
import SubjectsPage from '../pages/SubjectsPage';
import ProfilePage from '../pages/ProfilePage';


// 🎯 Exportamos 'router' por nombre para que main.jsx pueda importarlo
export const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        // RUTA PROTEGIDA PRINCIPAL
        path: '/dashboard',
        element: <ProtectedLayout />,
        // RUTAS HIJAS DENTRO DEL LAYOUT PROTEGIDO
        children: [
            {
                // Ruta por defecto: /dashboard
                index: true,
                element: <DashboardPage />,
            },
            {
                // Ruta: /dashboard/estudiantes/:id
                path: 'estudiantes/:id',
                element: <StudentDetailPage />,
            },
            // RUTAS DEL ASIDE (SOLO EL SEGMENTO FINAL: 'mis-materias' -> /dashboard/mis-materias)
            {
                path: 'mis-materias',
                element: <SubjectsPage />,
            },
            {
                path: 'perfil',
                element: <ProfilePage />,
            },
            // Agregamos una ruta de captura de errores 404 para URLs dentro de /dashboard/
            {
                path: '*',
                element: <h1>404 | ¡Ruta no encontrada dentro del Dashboard!</h1>
            }
        ],
    },
    // Agregamos una ruta 404 para cualquier otra URL
    {
        path: '*',
        element: <h1>404 | Página no encontrada</h1>
    }
]);

// Componente Wrapper para usar en main.jsx/App.jsx
const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;