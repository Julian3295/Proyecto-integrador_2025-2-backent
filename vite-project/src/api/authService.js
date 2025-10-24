// src/api/authService.js (CÓDIGO CORREGIDO PARA SIMULAR API LOCAL)

// ✅ Usuarios de prueba proporcionados (simulando la base de datos)
const USERS = [
  {
    "id": "1",
    "nombre": "Ana García",
    "email": "ana.garcia@escuela.edu",
    "rol": "profesor", // <-- USAR ESTE ROL PARA EL DASHBOARD
    "password": "password123", // <-- USAR ESTA CONTRASEÑA
    "telefono": "+57 301 234 5678",
    "activo": true
  },
  {
    "id": "3",
    "nombre": "María López (Coordinador)",
    "email": "maria.lopez@escuela.edu",
    "rol": "coordinador", // <-- ROL ALTERNATIVO
    "password": "password789",
    "activo": true
  },
  // ... puedes incluir los demás usuarios si quieres: Carlos, Luis...
];

/**
 * Simula la llamada a la API de inicio de sesión.
 * @param {object} credentials - {email, password}
 * @returns {object|null} - Objeto de usuario con token, o null si falla.
 */
export const loginUser = async ({ email, password }) => {
    // Simulamos la latencia de una API
    await new Promise(resolve => setTimeout(resolve, 500));

    // 1. Buscar el usuario por email
    const userFound = USERS.find(u => u.email === email);

    // 2. Verificar existencia y contraseña
    if (userFound && userFound.password === password) {
        
        // 3. Devolver los datos del usuario + un token simulado
        // Esto es lo que 'LoginPage.jsx' espera para ingresar.
        return {
            id: userFound.id,
            nombre: userFound.nombre,
            email: userFound.email,
            rol: userFound.rol,
            token: `jwt-${userFound.id}-${Math.random().toString(36).substring(7)}`, // Token simulado
        };
    }

    // 4. Si falla, devolver null
    return null;
};

// Puedes dejar otras funciones de autenticación aquí (ej: logoutUser)
export const logoutUser = () => {
    localStorage.removeItem('currentUser');
};

// ... otras funciones como getUserData, etc.