// src/pages/LoginPage.jsx (CÓDIGO CORREGIDO)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authService'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // 🎯 Estados corregidos para los mensajes y la carga
    const [mensaje, setMensaje] = useState(''); // Usaremos 'mensaje' para errores/éxito
    const [cargando, setCargando] = useState(false); // Usaremos 'cargando' para el botón
    
    const navigate = useNavigate(); 

    // 🎯 Función de manejo de Login renombrada a handleSubmit
    // O puedes cambiar en el return a onSubmit={handleLogin}
    const handleSubmit = async (e) => { 
        e.preventDefault();
        
        // 🎯 Usar el estado definido: setMensaje, setCargando
        setMensaje(''); 
        setCargando(true); 

        try {
            // Asumiendo que authService.js usa 'email' y 'password' como entrada
            const user = await loginUser(email, password); 

            if (user) {
                // Login Exitoso
                localStorage.setItem('currentUser', JSON.stringify(user));
                // 🎯 Mensaje para el usuario (opcional, ya que se redirige)
                setMensaje('✅ ¡Acceso exitoso!');
                navigate('/dashboard'); 
            } else {
                // Login Fallido
                setMensaje('❌ Credenciales incorrectas.'); // Usar setMensaje
            }
        } catch (e) {
             // Manejo de errores de conexión (ej: servidor caído)
            setMensaje('⚠️ Error del servidor. No se pudo conectar al servidor de gestión académica.');
        } finally {
             // 🎯 Usar el estado definido: setCargando
            setCargando(false); 
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#e0f7fa' }}>
            {/* 🎯 onSubmit={handleSubmit} ahora es correcto */}
            <form onSubmit={handleSubmit} style={{ padding: '30px', border: '1px solid #00bcd4', borderRadius: '10px', background: 'white', minWidth: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                
                <h2 style={{ textAlign: 'center', color: '#00bcd4' }}>Login</h2>
                
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Correo Electrónico" required 
                        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc' }} />
                
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Contraseña" required 
                        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc' }} />
                
                <button type="submit" disabled={cargando} 
                        style={{ width: '100%', padding: '12px', backgroundColor: '#00bcd4', color: 'white', border: 'none', borderRadius: '4px', cursor: cargando ? 'not-allowed' : 'pointer' }}>
                    {cargando ? 'Verificando...' : 'INICIAR SESIÓN'}
                </button>
                
                {/* 🎯 MENSAJE DE ESTADO */}
                <p style={{ marginTop: '15px', textAlign: 'center', color: mensaje.startsWith('✅') ? 'green' : mensaje.startsWith('❌') ? 'red' : 'orange' }}>
                    {mensaje}
                </p>
                
            </form>
        </div>
    );
};

export default LoginPage;