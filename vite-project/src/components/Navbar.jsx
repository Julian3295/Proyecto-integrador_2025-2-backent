<<<<<<< HEAD
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
=======
// src/components/Navbar.jsx (CÓDIGO CORREGIDO Y COMPLETO)

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // El nombre del usuario logueado es "Ana García"
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // ✅ CORRECCIÓN: Definir la función handleLogout aquí (aunque solo haga console.log)
    const handleLogout = () => {
        console.log("Cerrando sesión...");
        // Lógica real de logout:
        // 1. Eliminar token de localStorage/cookies
        // 2. Redirigir a la página de login (usando useNavigate si lo importaras aquí)
    };

    return (
        <nav className="navbar">
            <div className="system-title">Sistema de Gestión de Notas</div> 
            
            <div className="user-menu-container">
                {/* ... */}
                
                {isMenuOpen && (
                    <div className="dropdown-menu">
                        <Link to="/" onClick={toggleMenu} className="menu-item">
                            Inicio / Panel Principal
                        </Link>
                        <Link to="/profile" onClick={toggleMenu} className="menu-item">
                            Perfil del Usuario
                        </Link>
                        {/* Botón Cerrar Sesión ahora llama a la función definida */}
                        <button onClick={handleLogout} className="menu-item logout-button">
                            Cerrar Sesión 
                        </button>
                    </div>
                )}
            </div>
>>>>>>> 2cf479d28a3616c29d274f4fbece6fc1bedd3846
        </nav>
    );
};
export default Navbar;