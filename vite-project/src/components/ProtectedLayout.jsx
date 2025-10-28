import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar'; 
import Aside from './Aside'; 
import Footer from './Footer'; // Importamos el Footer para mantener el layout completo
// RUTA CRUCIAL: Subimos de components/ (..) y entramos a context/
import { useAuth } from '../context/AuthContext'; 

// Este componente envuelve las rutas que requieren autenticación.
const ProtectedLayout = () => {
    // 1. Obtener el estado de autenticación y carga del Contexto.
    // Asumimos que useAuth() provee currentUser y loading.
    const { currentUser, loading } = useAuth();

    // ... en ProtectedLayout.jsx
    <main className="page-content">
        {/* Renderiza el contenido de la página protegida (e.g., Dashboard, Perfil) */}
        <Outlet />
    </main>
// ...
    // 1.1. Mostrar estado de carga mientras se verifica el usuario.
    if (loading) {
        // Puedes usar un spinner o una pantalla simple
        return (
            <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
                Verificando autenticación...
            </div>
        );
    }
    
    // 2. Lógica de Redirección para protección de rutas.
    // Solo redirigimos si NO está cargando Y NO hay un usuario.
    if (!currentUser) {
        // Si no hay usuario logueado, redirigimos a la página de inicio de sesión.
        return <Navigate to="/" replace />;
    }

    // 3. Si el usuario está logueado, renderizamos el Layout.
    // El componente <Outlet /> renderiza el contenido de la ruta hija actual (e.g., DashboardPage).
    return (
        <div className="app-container">
            {/* Navbar usa useAuth() */}
            <Navbar /> 
            
            <div className="main-content-wrapper">
                {/* Aside usa useAuth() */}
                <Aside />
                
                {/* 🎯 Contenedor principal de la página. */}
                <main className="page-content">
                    {/* Renderiza el contenido de la página protegida (e.g., Dashboard, Perfil) */}
                    <Outlet />
                </main>
            </div>
            
            {/* Agregamos el Footer al layout principal */}
            <Footer />
        </div>
    );
};

export default ProtectedLayout;