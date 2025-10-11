// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Asegúrate que la ruta sea correcta: '../api/authService' o '../../../api/authService'
import { loginUser } from '../api/authService'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        setCargando(true);

        try {
            const usuario = await loginUser(email, password);

            if (usuario) {
                // Éxito: Guardar sesión y redirigir
                localStorage.setItem('currentUser', JSON.stringify(usuario));
                setMensaje(`✅ ¡Bienvenido, ${usuario.nombre || 'Usuario'}!`);
                navigate('/dashboard'); 
            } else {
                setMensaje('❌ Credenciales incorrectas.');
            }
        } catch (error) {
            setMensaje(`⚠️ Error del servidor: ${error.message}`);
        } finally {
            setCargando(false);
        }
    };

    // src/pages/LoginPage.jsx - Aquí es donde le das diseño al formulario.

// ... (todo el código de useState y handleSubmit) ...

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#e0f7fa' }}>
            <form onSubmit={handleSubmit} style={{ padding: '30px', border: '1px solid #00bcd4', borderRadius: '10px', background: 'white', minWidth: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                {/* Aquí va el diseño. Si quieres un diseño similar a la imagen 
                   de tu profesor, puedes usar estilos básicos o CSS.
                */}
                <h2 style={{ textAlign: 'center', color: '#00bcd4' }}>Login</h2>
                
                {/* ... (Tus inputs y botón) ... */}
                
            </form>
        </div>
    );
};


// ⚠️ DEBE USAR export default
export default LoginPage;