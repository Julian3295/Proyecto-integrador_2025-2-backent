import React, { createContext, useContext, useState, useEffect } from 'react';

// COMENTAMOS O ELIMINAMOS TODAS LAS IMPORTACIONES DE FIREBASE
// import { initializeApp } from 'firebase/app';
// import { 
//     getAuth, 
//     signInAnonymously, 
//     signInWithCustomToken, 
//     onAuthStateChanged, 
//     signOut,
//     signInWithEmailAndPassword 
// } from 'firebase/auth';
// import { getFirestore, collection, getDocs } from 'firebase/firestore'; 

// --- CONFIGURACIÓN ANTERIOR AHORA ES INNECESARIA ---
// const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// let firebaseConfig = null;
// ... (eliminado el bloque de inicialización de Firebase)

// --- EXPORTACIONES MOCK ---
// Exportamos null en lugar de las instancias reales
export const auth = null;
export const db = null;

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Inicializamos el estado leyendo de localStorage (si el usuario ya hizo login simulado)
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    
    // Estado de listo es TRUE inmediatamente, ya no hay carga asíncrona de Firebase
    const [isAuthReady, setIsAuthReady] = useState(true); 
    
    // El rol y los datos del usuario se extraen directamente de la sesión simulada
    const userRole = currentUser?.rol || null; 
    const userData = currentUser || null;

    
    // Función de Login Simulada (Mock)
    const login = async (email, password) => {
        // Simulación: solo permite el login con credenciales válidas
        if (email === 'profesor@test.com' && password === '123456') {
            const mockUser = {
                id: 'mock-prof-1',
                nombre: 'Ana García',
                rol: 'profesor', // CLAVE para acceder al Dashboard
                email: email,
            };

            // 1. Guardar en localStorage para que DashboardPage funcione
            localStorage.setItem('currentUser', JSON.stringify(mockUser));
            
            // 2. Actualizar el estado del contexto
            setCurrentUser(mockUser);
            
            // Devolver un resultado exitoso
            return mockUser; 
        } else {
            // Simulación de error
            throw new Error("Credenciales inválidas. Usa profesor@test.com / 123456");
        }
    };
    
    // Función de Logout Simulada
    const logout = async () => {
        // Eliminar de localStorage y limpiar el estado
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    // NO HAY useEffect para onAuthStateChanged
    useEffect(() => {
        // Lógica de carga anterior eliminada
    }, []);

    const value = { 
        currentUser, 
        isAuthReady, 
        userRole, 
        userData, 
        login, 
        logout, 
        auth: null, 
        db: null, 
        userId: currentUser?.id || 'anonymous', 
        appId: 'default-app-id' 
    };

    // ELIMINAMOS LA PANTALLA DE CARGA, ya que isAuthReady es TRUE inmediatamente
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};