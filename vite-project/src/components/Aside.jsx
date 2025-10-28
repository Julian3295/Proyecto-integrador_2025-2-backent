import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaGraduationCap, FaBook, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Asegúrate de tener estos iconos

const Aside = ({ logout, userName }) => {
    const location = useLocation();

    // Función auxiliar para saber si el enlace está activo
    const isActive = (path) => location.pathname === path;
    
    // --- ESTILOS INLINE PARA REPLICAR EL DISEÑO ---
    const asideStyle = {
        width: '240px', // Ancho fijo para la barra lateral
        minHeight: '100vh', 
        backgroundColor: '#343a40', // Fondo oscuro (gris muy oscuro)
        padding: '20px 0',
        color: '#f8f9fa', // Texto claro
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
        position: 'fixed', // Para que quede fijo a la izquierda
        zIndex: 100
    };

    const linkStyle = (path) => ({
        display: 'flex',
        alignItems: 'center',
        padding: '12px 20px',
        textDecoration: 'none',
        color: isActive(path) ? '#00bcd4' : '#f8f9fa', // Color de texto: azul si activo, blanco si inactivo
        backgroundColor: isActive(path) ? '#495057' : 'transparent', // Fondo: gris oscuro si activo
        borderLeft: isActive(path) ? '5px solid #00bcd4' : '5px solid transparent', // Barra de color activa
        transition: 'background-color 0.3s, border-left 0.3s'
    });
    // ----------------------------------------------


    return (
        <aside style={asideStyle}>
            <nav>
                <Link to="/dashboard" style={linkStyle("/dashboard")}>
                    <FaHome style={{ marginRight: '10px' }} />
                    Home
                </Link>
                <Link to="/estudiantes" style={linkStyle("/estudiantes")}>
                    <FaGraduationCap style={{ marginRight: '10px' }} />
                    Estudiantes
                </Link>
                <Link to="/materias" style={linkStyle("/materias")}>
                    <FaBook style={{ marginRight: '10px' }} />
                    Mis Materias
                </Link>
                <Link to="/perfil" style={linkStyle("/perfil")}>
                    <FaUser style={{ marginRight: '10px' }} />
                    Perfil
                </Link>
            </nav>
            
            {/* Si necesitas un botón de cerrar sesión en el Aside también */}
            <div style={{ position: 'absolute', bottom: '20px', width: '100%', padding: '0 20px' }}>
                <button 
                    // onClick={logout} // Asumo que `logout` vendría de props o contexto si lo usas aquí
                    style={{ 
                        width: '100%', 
                        padding: '10px', 
                        backgroundColor: '#dc3545', // Rojo para salir
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <FaSignOutAlt style={{ marginRight: '8px' }} />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
};

export default Aside;
