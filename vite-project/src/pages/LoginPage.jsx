// src/pages/LoginPage.jsx (CÓDIGO CORREGIDO para usar el servicio de API)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 🎯 IMPORTAR EL SERVICIO DE API
import { loginUser } from '../api/authService'; 
import { useAuth } from '../context/AuthContext'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [mensaje, setMensaje] = useState(''); 
    const [cargando, setCargando] = useState(false); 
    
    const navigate = useNavigate(); 
    // OBTENER LA FUNCIÓN login DEL CONTEXTO (solo guarda el usuario en localStorage)
    const { login } = useAuth(); 

    const handleSubmit = async (e) => { 
        e.preventDefault();
        
        setMensaje(''); 
        setCargando(true); 

        try {
            // 🎯 PASO 1: Llama al servicio de API para autenticar
            const user = await loginUser(email, password); 

            // PASO 2: Si la API devuelve un usuario, lo guardamos en el contexto/localStorage
            if (user && user.id) { 
                // Usamos la función 'login' del contexto para establecer la sesión local
                login(user); 
                
                setMensaje('✅ ¡Acceso exitoso!');
                navigate('/dashboard'); 
            } else {
                // Esto debería ser capturado por el catch, pero es un buen fallback
                setMensaje('❌ La API no devolvió datos de usuario válidos.'); 
            }
            
        } catch (e) {
            // Manejo de errores de credenciales o de red/servidor
            const errorMsg = e.message || 'Error desconocido durante el login.';
            setMensaje(`❌ ${errorMsg}`);
            
        } finally {
            setCargando(false); 
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#e0f7fa' }}>
            <form onSubmit={handleSubmit} style={{ padding: '30px', border: '1px solid #00bcd4', borderRadius: '10px', background: 'white', minWidth: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                
                <h2 style={{ textAlign: 'center', color: '#00bcd4' }}>Acceso a BrainNote</h2> 

                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Correo Electrónico" required 
                        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc' }} />
                
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Contraseña" required 
                        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc' }} />
                
                <button type="submit" disabled={cargando} 
                        style={{ width: '100%', padding: '12px', backgroundColor: '#00bcd4', color: 'white', border: 'none', borderRadius: '4px', cursor: cargando ? 'not-allowed' : 'pointer' }}>
                    {cargando ? 'Verificando...' : 'INGRESAR A BRAINNOTE'}
                </button>
                
                {/* MENSAJE DE ESTADO */}
                <p style={{ marginTop: '15px', textAlign: 'center', color: mensaje.startsWith('✅') ? 'green' : mensaje.startsWith('❌') ? 'red' : 'orange' }}>
                    {mensaje}
                </p>
                
            </form>
        </div>
    );
};

export default LoginPage;