// src/api/authService.js

export const loginUser = async (email, password) => {
    try {
        // ... obtener response ...
        const usuarios = await response.json();

        // 🎯 Lógica para encontrar el usuario
        const usuarioEncontrado = usuarios.find(u => 
            u.email === email && u.password === password 
        );
        
        // ¡IMPORTANTE! Revisa si la lógica de tu LoginPage pasa la contraseña sin encriptar
        
        return usuarioEncontrado || null; 

    } catch (error) {
        // ...
    }
};