// src/components/Aside.jsx (MODIFICADO)
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Asumo que usas react-icons para los íconos (FaGraduationCap)
import { FaHome, FaGraduationCap, FaBook, FaUser } from 'react-icons/fa'; 

const Aside = () => {
    const location = useLocation();
    
    // Función para verificar si un enlace está activo
    const isActive = (path) => {
        // Verifica si la ruta actual comienza con la ruta del enlace
        // Esto sirve para /dashboard y /dashboard#students
        return location.pathname === path || (location.pathname === '/dashboard' && location.hash === path);
    };
    
    return (
        <aside className="aside-menu">
            <ul className="aside-list">
                
                {/* Home/Dashboard Principal */}
                <li>
                    <Link 
                        to="/dashboard" 
                        className={`aside-button ${isActive('/dashboard') && !location.hash ? 'active-aside' : ''}`}
                    >
                        <FaHome className="aside-icon" /> Home
                    </Link>
                </li>
                
                {/* 1. Estudiantes (El enlace que quieres enfocar) */}
                <li>
                    <Link 
                        // Navega al dashboard con un hash #students
                        to="/dashboard#students" 
                        className={`aside-button ${isActive('#students') ? 'active-aside' : ''}`}
                    >
                        <FaGraduationCap className="aside-icon" /> Estudiantes
                    </Link>
                </li>
                
                {/* 2. Mis Materias (Ejemplo) */}
                <li>
                    <Link 
                        to="/materias" // Asume que tienes esta ruta
                        className={`aside-button ${isActive('/materias') ? 'active-aside' : ''}`}
                    >
                        <FaBook className="aside-icon" /> Mis Materias
                    </Link>
                </li>
                
                {/* 3. Perfil (Ejemplo) */}
                <li>
                    <Link 
                        to="/perfil" // Asume que tienes esta ruta
                        className={`aside-button ${isActive('/perfil') ? 'active-aside' : ''}`}
                    >
                        <FaUser className="aside-icon" /> Perfil
                    </Link>
                </li>
            </ul>
            {/* Opcional: El botón de cerrar sesión que está en el Navbar lo puedes duplicar aquí 
            <div style={{ marginTop: 'auto', padding: '20px 0 20px 20px' }}>
                <button className="menu-item logout-button" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>
            */}
        </aside>
    );
};

export default Aside;