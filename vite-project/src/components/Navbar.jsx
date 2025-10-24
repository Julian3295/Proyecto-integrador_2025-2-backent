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
        </nav>
    );
};
export default Navbar;