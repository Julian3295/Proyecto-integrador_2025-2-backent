// src/components/Header.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    // Función que simula el cierre de sesión
    const handleLogout = () => {
        // ⚠️ En una aplicación real, aquí:
        // 1. Eliminarías el token de autenticación (localStorage.removeItem('token')).
        // 2. Limpiarías el estado de usuario global.
        
        // Por ahora, simplemente navegamos al login:
        navigate('/'); 
        alert("Sesión cerrada con éxito.");
    };

    return (
        <header style={headerStyle}>
            {/* Título o Logo de la aplicación (funciona como link al dashboard) */}
            <Link to="/dashboard" style={logoStyle}>
                Sistema de Gestión de Notas
            </Link>
            
            <nav>
                <button 
                    onClick={handleLogout} 
                    style={buttonStyle}
                >
                    Cerrar Sesión
                </button>
            </nav>
        </header>
    );
};

// --- Estilos básicos para el ejemplo ---
const headerStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px', // Espacio debajo del header
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const logoStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold'
};

const buttonStyle = {
    backgroundColor: '#ff6347', // Un color naranja/rojo llamativo
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
};

export default Header;