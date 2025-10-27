// src/api/authService.js

const BASE_URL = '/api'; // 🎯 Usar /api para activar el proxy

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/usuarios`); 
        
        // Si el proxy falló, el catch lo toma como un error de conexión, que es el mensaje que ves.
        if (!response.ok) {
             throw new Error(`Error en la conexión a /usuarios: ${response.status}`);
        }

        const usuarios = await response.json();

        // Lógica de Búsqueda correcta
        const usuarioEncontrado = usuarios.find(u => 
            u.email === email && u.password === password 
        );
        
        return usuarioEncontrado || null; 

    } catch (error) {
        console.error("Fallo la simulación de Login:", error);
        // Aquí es donde el error se convierte en "Error del servidor."
        throw new Error('Error de conexión.');
    }
};