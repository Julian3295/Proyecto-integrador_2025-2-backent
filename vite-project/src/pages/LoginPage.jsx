// src/pages/LoginPage.jsx (VERSION FINAL LIMPIA - Sin Bypass)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authService'; // <-- Asumo que esta API funciona o es simulada
import { FaLock, FaEnvelope } from 'react-icons/fa'; 

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Llama a tu servicio de API real/simulada
            const user = await loginUser(credentials); 
            
            if (user && user.token) { 
                localStorage.setItem('currentUser', JSON.stringify(user));
                navigate('/dashboard'); 
            } else {
                alert("Credenciales inválidas. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Fallo de inicio de sesión:", error);
            alert("Error al intentar iniciar sesión. Verifica la conexión o el backend.");
        }
    };

    return (
        <div className="login-container">
            <div className="card">
                <h1>Log In!</h1>

                <form onSubmit={handleLogin}>
                    {/* INPUT EMAIL */}
                    <div className="field">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            className="input-field"
                            autoComplete="username" 
                            required
                        />
                    </div>

                    {/* INPUT PASSWORD */}
                    <div className="field" style={{ marginTop: '15px' }}>
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="input-field"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {/* BOTÓN LOGIN */}
                    <button type="submit" className="btn-login">
                        LOGIN
                    </button>
                    
                    {/* ENLACE DE RECUPERACIÓN */}
                    <a href="/reset-password" className="forgot-password">
                        Forgot your password?
                    </a>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;