// src/api/authService.js

// La URL base es simplemente la dirección de Render.
const API_BASE_URL = 'https://api-sistema-notas.onrender.com'; 

/**
 * Función para iniciar sesión llamando al recurso /usuarios de la API.
 * * NOTA: JSON Server no tiene un endpoint /login por defecto. 
 * Esta función simula la autenticación obteniendo el usuario por email y 
 * luego verificando la contraseña en el cliente.
 * * @param {string} email El correo electrónico del usuario.
 * @param {string} password La contraseña del usuario.
 * @returns {Promise<object>} El objeto de usuario si el login es exitoso.
 * @throws {Error} Lanza un error si la solicitud falla o si las credenciales son incorrectas.
 */
export const loginUser = async (email, password) => {
    try {
        // 1. Intentar obtener el usuario por email
        // La URL será: https://api-sistema-notas.onrender.com/usuarios?email=ana.garcia@escuela.edu
        const response = await fetch(`${API_BASE_URL}/usuarios?email=${email}`, {
            method: 'GET', // Cambiamos a GET para buscar el usuario
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Manejar errores de conexión o servidor
            throw new Error(`Error ${response.status}: Error al buscar el usuario.`);
        }

        const users = await response.json();

        // 2. Verificar si se encontró el usuario
        if (users.length === 0) {
            throw new Error("Credenciales incorrectas. Verifique email y contraseña.");
        }

        const user = users[0];

        // 3. Verificar la contraseña
        // IMPORTANTE: Esto asume que la contraseña está almacenada en el JSON
        // en texto plano (como se ve en la imagen de los datos de usuarios).
        if (user.password !== password) {
            throw new Error("Credenciales incorrectas. Verifique email y contraseña.");
        }

        // 4. Si todo es correcto, devolver el objeto del usuario autenticado
        return user;

    } catch (error) {
        console.error("Fallo en la llamada a la API de login (JSON Server Logic):", error);
        // Si el error es de credenciales, lo propagamos para mostrarlo al usuario
        if (error.message.includes("Credenciales")) {
            throw error;
        }
        throw new Error("Error de conexión. Intente de nuevo más tarde.");
    }
};