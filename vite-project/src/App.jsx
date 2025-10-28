import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; 
import LoginPage from './pages/LoginPage'; 
import DashboardPage from './pages/DashboardPage'; 
import StudentDetailPage from './pages/StudentDetailPage'; 
import ProfilePage from './pages/ProfilePage'; 
import SubjectsPage from './pages/SubjectsPage'; 
import Navbar from './components/Navbar';
import Aside from './components/Aside';

// ----------------------------------------------------
// Componente de Layout
// ----------------------------------------------------
const Layout = ({ children }) => {
    return (
        <div className="app-container flex min-h-screen"> 
            <Aside />
            <div className="flex-1 flex flex-col">
                <Navbar /> 
                <main className="page-content flex-1 p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

// ----------------------------------------------------
// Lógica de Rutas (Protección)
// ----------------------------------------------------
const AppRoutes = () => {
    const { currentUser, isAuthReady } = useAuth();
    
    if (!isAuthReady) {
        return null; 
    }

    // Rutas protegidas (si hay un usuario logueado)
    if (currentUser) {
        return (
            <Routes>
                {/* 1. Raíz y Home (Home y Dashboard son lo mismo) */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/home" element={<Navigate to="/dashboard" replace />} />

                {/* 2. Rutas del Dashboard */}
                <Route 
                    path="/dashboard" 
                    element={<Layout><DashboardPage /></Layout>} 
                />
                <Route 
                    path="/student-detail/:studentId" 
                    element={<Layout><StudentDetailPage /></Layout>} 
                />
                {/* 🎯 Rutas según el menú que mostraste: "Mis Materias" y "Perfil" */}
                <Route 
                    path="/mis-materias" 
                    element={<Layout><SubjectsPage /></Layout>} 
                />
                <Route 
                    path="/perfil" 
                    element={<Layout><ProfilePage /></Layout>} 
                />
                
                {/* 3. 404 (cualquier otra ruta) */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        );
    }
    
    // Rutas públicas (solo si NO hay usuario logueado)
    return (
        <Routes>
            {/* Solo permitimos acceso a la página de Login */}
            <Route path="*" element={<LoginPage />} />
        </Routes>
    );
};


// ----------------------------------------------------
// Componente principal
// ----------------------------------------------------
const App = () => {
    return (
        <Router>
            <AuthProvider> 
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
};

export default App;