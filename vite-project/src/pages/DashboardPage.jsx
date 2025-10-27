// src/pages/DashboardPage.jsx (CÓDIGO FINAL CORREGIDO DE IMPORTACIONES)

import React, { useEffect, useState } from 'react';
// 1. IMPORTAR useLocation (Para el scroll con #hash)
import { useNavigate, Link, useLocation } from 'react-router-dom'; 
import { getPlatformReports, getStudents } from '../api/reportService';

// ¡IMPORTACIONES CORREGIDAS CON .jsx PARA COINCIDIR CON TUS ARCHIVOS!
import Navbar from '../components/Navbar.jsx'; 
import Aside from '../components/Aside.jsx'; 
import Footer from '../components/Footer.jsx'; 

const DashboardPage = () => {
    const navigate = useNavigate();
    // OBTENER LA UBICACIÓN PARA LEER EL HASH
    const location = useLocation(); 
    
    const [currentUser, setCurrentUser] = useState(null);
    const [reports, setReports] = useState(null);
    const [studentsList, setStudentsList] = useState([]); 
    const [loading, setLoading] = useState(true);

    // Lógica para cargar reportes Y PROTEGER LA RUTA
    useEffect(() => {
        const userString = localStorage.getItem('currentUser'); 

        if (userString) {
            const user = JSON.parse(userString);
            
            // Protección de rol
            if (user.rol !== 'profesor' && user.rol !== 'coordinador') { 
                alert("Acceso Denegado: Tu perfil no tiene permiso para ver este panel.");
                localStorage.removeItem('currentUser'); 
                navigate('/');
                return;
            }
            
            setCurrentUser(user);
            
            const fetchAllData = async () => { 
                setLoading(true);
                try {
                    const reportData = await getPlatformReports(); 
                    setReports(reportData);
                    const studentData = await getStudents(); 
                    setStudentsList(studentData); 
                } catch (error) {
                    console.error("Error al cargar datos del dashboard:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchAllData();
        } else {
            navigate('/');
        }
    }, [navigate]);
    
    // 2. useEffect para hacer scroll al #hash
    useEffect(() => {
        if (location.hash === '#students') {
            const timer = setTimeout(() => {
                const targetElement = document.getElementById('students-section');
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100); 
            
            return () => clearTimeout(timer); 
        }
    }, [location.hash]);


    // 1. Mostrar estado de carga (Return si loading es true)
    if (loading) {
        return (
            <>
                <Navbar /> 
                <div className="main-layout-container">
                    <Aside /> 
                    <div className="dashboard-content loading-state" style={{ padding: '20px' }}>
                        <h1>Cargando Dashboard...</h1>
                        <p>Preparando reportes y lista de estudiantes...</p>
                    </div>
                </div>
                {/* Opcional: Footer en la vista de carga */}
                <Footer />
            </>
        );
    }
    
    const statsArray = reports ? [
        { title: "Total de Estudiantes", value: reports.totalEstudiantes },
        { title: "Total de Profesores", value: reports.totalProfesores },
        { title: "Estudiantes Aprobados", value: reports.aprobados },
        { title: "Estudiantes Reprobados", value: reports.reprobados }
    ] : [];


    // 2. Renderizar el Dashboard (Return principal)
    return (
        <>
            <Navbar /> 
            
            <div className="main-layout-container"> 
                
                <Aside /> 

                <div className="dashboard-content">
                    
                    <h1 style={{ color: '#f5f5f5' }}>Panel de Control Principal</h1>
                    <p style={{ color: '#d3d3d3' }}>Bienvenido, {currentUser ? currentUser.nombre : 'Usuario'}!</p>
                    
                    {/* ------------------------------------------- */}
                    {/* 1. SECCIÓN DE TARJETAS DE REPORTE (ESTADÍSTICAS) */}
                    {/* ------------------------------------------- */}
                    
                    <div className="dashboard-grid stats-section"> 
                        {statsArray.map((stat, index) => (
                            <div key={index} className="metric-card"> 
                                <h3>{stat.title}</h3>
                                <p>{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Separador */}
                    <hr style={{ margin: '40px 0', borderColor: '#444' }} />
                    
                    {/* ------------------------------------------- */}
                    {/* 2. SECCIÓN DE GESTIÓN DE NOTAS (LISTA DE ESTUDIANTES) */}
                    {/* ------------------------------------------- */}
                    
                    {/* 3. CLAVE: DIV CON EL ID DE SCROLL */}
                    <div id="students-section"> 
                        <h2>Gestión de Notas por Estudiante</h2>
                        
                        {studentsList.length === 0 && <p>No se encontraron estudiantes para gestionar.</p>}

                        <div className="student-list-grid">
                            {studentsList.map(est => (
                                <Link 
                                    key={est.id} 
                                    to={`/estudiantes/${est.id}`} 
                                    className="report-card" 
                                >
                                    <h4>{est.nombre}</h4> 
                                    <p>Código: {est.codigo}</p>
                                    
                                    <span className="view-details-link">
                                        Ver Notas Detalladas <span style={{ marginLeft: '8px' }}>&rarr;</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 4. EL FOOTER VA FUERA del main-layout-container para que ocupe todo el ancho */}
            <Footer /> 
        </>
    );
}; 

export default DashboardPage;