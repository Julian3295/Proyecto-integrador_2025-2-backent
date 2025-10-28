import React from 'react';
import { useAuth } from '../context/AuthContext'; 
import { FaSignOutAlt } from 'react-icons/fa'; // Icono para Cerrar Sesión

const Navbar = () => {
    // Obtenemos el objeto 'currentUser' (que contiene el nombre) y la función de logout
    const { currentUser, logout } = useAuth();
    
    // Extraemos el nombre. Si no hay usuario, mostramos un valor por defecto.
    const userName = currentUser?.nombre || 'Usuario'; 

    return (
        // El nav ahora es la barra superior completa
        <nav className="app-navbar">
            
            {/* Título de la Aplicación */}
            <div className="navbar-logo">
                BrainNote
            </div>
            
            {/* Contenedor del Usuario y Cerrar Sesión */}
            <div className="navbar-user-info">
                {/* Nombre del Usuario */}
                <span className="user-name-display">
                    Bienvenido, {userName}
                </span>

                {/* Botón de Cerrar Sesión */}
                <button 
                    onClick={logout} // Usamos la función logout del contexto
                    className="logout-button"
                >
                    <FaSignOutAlt style={{ marginRight: '5px' }} />
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
};
export default Navbar;