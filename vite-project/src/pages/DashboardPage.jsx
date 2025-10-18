// src/pages/DashboardPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlatformReports } from '../api/reportService'; 

// ... (ReportCard y demás componentes) ...

// src/pages/DashboardPage.jsx (FRAGMENTO CORREGIDO Y COMPLETO)

// ...
const DashboardPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [reports, setReports] = useState(null);
    const [loading, setLoading] = useState(true);

    // Lógica para cargar reportes Y PROTEGER LA RUTA
    useEffect(() => {
        const userString = localStorage.getItem('currentUser'); // 👈 Aquí se define 'userString'

        if (userString) {
            const user = JSON.parse(userString);
            
            // 🎯 Protección: Usamos 'user.rol' porque así lo define la API
            if (user.rol !== 'profesor' && user.rol !== 'coordinador') { 
                alert("Acceso Denegado: Tu perfil no tiene permiso para ver este panel.");
                localStorage.removeItem('currentUser'); 
                navigate('/');
                return;
            }
            
            // Si el perfil es correcto, cargar la información del Dashboard
            setCurrentUser(user);
            const fetchReports = async () => {
                setLoading(true);
                // ESTA FUNCIÓN NECESITA QUE EXISTA src/api/reportService.js
                const data = await getPlatformReports(); 
                setReports(data);
                setLoading(false);
            };
            fetchReports();
        } else {
            navigate('/'); // Si no hay usuario, redirigir al login
        }
    }, [navigate]);

    // ... (El resto del componente sigue abajo)
// ...

    // ... (handleLogout y return del componente) ...
};

export default DashboardPage;