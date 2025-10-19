// src/pages/DashboardPage.jsx (VERSIÓN FINAL)

import React, { useEffect, useState } from 'react';
import ReportCard from '../components/ReportCard' // 🎯 Componente Importado
import { useNavigate } from 'react-router-dom';
import { getPlatformReports } from '../api/reportService'; 

const DashboardPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [reports, setReports] = useState(null);
    const [loading, setLoading] = useState(true);

    // Lógica para cargar reportes Y PROTEGER LA RUTA
    useEffect(() => {
        const userString = localStorage.getItem('currentUser'); 

        if (userString) {
            const user = JSON.parse(userString);
            
            // Protección de rol: Verifica si es profesor o coordinador
            if (user.rol !== 'profesor' && user.rol !== 'coordinador') { 
                alert("Acceso Denegado: Tu perfil no tiene permiso para ver este panel.");
                localStorage.removeItem('currentUser'); 
                navigate('/');
                return;
            }
            
            setCurrentUser(user);
            const fetchReports = async () => {
                setLoading(true);
                const data = await getPlatformReports(); 
                setReports(data);
                setLoading(false);
            };
            fetchReports();
        } else {
            navigate('/'); // Si no hay usuario, redirigir al login
        }
    }, [navigate]);

    // 1. Mostrar estado de carga (Return si loading es true)
    if (loading) {
        return (
            <div className="dashboard-loading">
                <h1>Cargando Dashboard...</h1>
            </div>
        );
    }

    // 2. Renderizar el Dashboard (Return principal)
    return (
        <div className="dashboard-content">
            <h1>Panel de Control Principal</h1>
            <p>Bienvenido, {currentUser ? currentUser.nombre : 'Usuario'}!</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {reports && (
                    <>
                        <ReportCard 
                            title="Total de Estudiantes" 
                            value={reports.totalEstudiantes} 
                            icon="🧑‍🎓"
                        />
                        <ReportCard 
                            title="Total de Profesores" 
                            value={reports.totalProfesores} 
                            icon="👨‍🏫"
                        />
                        <ReportCard 
                            title="Estudiantes Aprobados" 
                            value={reports.aprobados} 
                            icon="✅"
                        />
                        <ReportCard 
                            title="Estudiantes Reprobados" 
                            value={reports.reprobados} 
                            icon="❌"
                        />
                    </>
                )}
            </div>
        </div>
    );
}; 

export default DashboardPage;