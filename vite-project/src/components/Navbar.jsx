// src/components/Navbar.jsx (CÓDIGO FINAL CORREGIDO)

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
// Importación de los iconos de Fa (Font Awesome)
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'; 
import { logoutUser } from '../api/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userName, setUserName] = useState('Usuario'); 

    // Lógica para cargar el nombre del usuario desde localStorage
    useEffect(() => {
        const userString = localStorage.getItem('currentUser');
        if (userString) {
            try {
                const user = JSON.parse(userString);
                // Usamos el nombre si existe, si no, 'Usuario'
                setUserName(user.nombre || 'Usuario'); 
            } catch (e) {
                console.error("Error al analizar los datos del usuario:", e);
            }
        }
    }, []); 

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleLogout = () => {
        // Llama a la función de cierre de sesión
        logoutUser(); 
        // Redirige o recarga la página para volver al Login
        window.location.href = '/'; 
        // Si usas useNavigate: navigate('/login');
    };

    return (
        // ...
        // En tu menú desplegable:
        <button onClick={handleLogout} className="dropdown-item">
            Cerrar Sesión
        </button>
        // ...
    );

    return (
        <nav className="navbar">
            <Link to="/" className="system-title" style={{ textDecoration: 'none' }}> 
                Sistema de Gestión de Notas
            </Link>
            
            <div className="user-menu-container">
                <button 
                    onClick={toggleMenu} 
                    className="user-info-button"
                >
                    <FaUserCircle className="user-icon" />
                    <span>{userName}</span>
                    <FaCaretDown style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                </button>
                
                {isMenuOpen && (
                    <div className="dropdown-menu">
                        <Link to="/" onClick={toggleMenu} className="menu-item">
                            Inicio / Panel Principal
                        </Link>
                        {/* Asume que '/profile' es la ruta de perfil general */}
                        <Link to="/profile" onClick={toggleMenu} className="menu-item">
                            Perfil del Usuario
                        </Link>
                        
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