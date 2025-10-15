// src/api/authService.js

// ⚠️ CAMBIO CRUCIAL: Solo usamos el prefijo del proxy de Vite
const API_USUARIOS_ENDPOINT = '/api/usuarios'; // (Esto es lo que tienes)

export const loginUser = async (email, password) => {
    try {
        // 1. Obtener todos los usuarios de la API
        // 💡 Asegúrate de que esta línea esté correcta
        const response = await fetch(API_USUARIOS_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error en la conexión a /usuarios: ${response.status}`);
        }

        const usuarios = await response.json();

        // 2. Buscar las credenciales (debes conocer un email y password de https://api-sistema-notas.onrender.com/usuarios)
        const usuarioEncontrado = usuarios.find(u => 
            u.email === email && u.password === password 
        );

        return usuarioEncontrado || null; 

    } catch (error) {
        console.error("Fallo la simulación de Login:", error);
        throw new Error("No se pudo conectar al servidor de gestión académica.");
    }
};