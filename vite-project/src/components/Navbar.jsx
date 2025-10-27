// src/components/Navbar.jsx (VERSIÓN SIMPLE Y FUNCIONAL)

import React from 'react';
// Importamos useNavigate para la redirección después del logout
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
    // Usar useNavigate para redirigir al login
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Cerrando sesión y redirigiendo...");
        
        // 1. Eliminar la información del usuario de localStorage
        localStorage.removeItem('currentUser'); 
        
        // 2. Redirigir a la página de login (la ruta raíz '/')
        navigate('/');
    };

    return (
        // ✅ CLASE CORREGIDA: Usamos "app-navbar" para el estilo de la barra
        <nav className="app-navbar">
            
            {/* ✅ CLASE CORREGIDA: Usamos "navbar-logo" para el título */}
            <div className="navbar-logo">
                Sistema de Gestión de Notas
            </div>
            
            {/* Botón de Cerrar Sesión */}
            <button 
                onClick={handleLogout} 
                // ✅ CLASE CORREGIDA: Usamos "navbar-button" para el botón
                className="navbar-button"
            >
                Cerrar Sesión
            </button>
        </nav>
    );
};
export default Navbar;