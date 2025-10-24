// src/pages/DashboardPage.jsx (CORREGIDO CON ESTILOS OSCUROS)

import React, { useEffect, useState } from 'react';
// import ReportCard from '../components/ReportCard' // ❌ Lo sustituimos por la estructura HTML/CSS
import { useNavigate, Link } from 'react-router-dom';
import { getPlatformReports, getStudents } from '../api/reportService';
// Asumo que Navbar es tu componente de navegación principal, si es Header, cámbialo de vuelta.
import Navbar from '../components/Navbar'; 


const DashboardPage = () => {
    const navigate = useNavigate();
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
                    // Cargar reportes (contadores)
                    const reportData = await getPlatformReports(); 
                    setReports(reportData);
                    
                    // Cargar lista de estudiantes 
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
    

    // 1. Mostrar estado de carga (Return si loading es true)
    if (loading) {
        return (
            <>
                <Navbar /> {/* Asumimos Navbar */}
                <div className="dashboard-loading" style={{ padding: '20px' }}>
                    <h1>Cargando Dashboard...</h1>
                    <p>Preparando reportes y lista de estudiantes...</p>
                </div>
            </>
        );
    }
    
    // Preparar el array de estadísticas para mapear con las nuevas clases CSS
    const statsArray = reports ? [
        { title: "Total de Estudiantes", value: reports.totalEstudiantes },
        { title: "Total de Profesores", value: reports.totalProfesores },
        { title: "Estudiantes Aprobados", value: reports.aprobados },
        { title: "Estudiantes Reprobados", value: reports.reprobados }
    ] : [];


    // 2. Renderizar el Dashboard (Return principal)
    return (
        <div className="main-dashboard-container"> {/* Añadimos un contenedor principal */}
            <Navbar /> 
            
            <div className="dashboard-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                <h1 style={{ color: '#f5f5f5' }}>Panel de Control Principal</h1>
                <p style={{ color: '#d3d3d3' }}>Bienvenido, {currentUser ? currentUser.nombre : 'Usuario'}!</p>
                
                {/* ------------------------------------------- */}
                {/* 1. SECCIÓN DE TARJETAS DE REPORTE (ESTADÍSTICAS) */}
                {/* ------------------------------------------- */}
                
                {/* ✅ Aplicamos la clase CSS 'stats-grid' */}
                <div className="stats-grid" > 
                    {statsArray.map((stat, index) => (
                        // ✅ Aplicamos la clase CSS 'stat-card'
                        <div key={index} className="stat-card"> 
                            <p className="stat-title">{stat.title}</p>
                            <p className="stat-value">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Separador */}
                <hr style={{ margin: '40px 0', borderColor: '#444' }} />
                
                {/* ------------------------------------------- */}
                {/* 2. SECCIÓN DE GESTIÓN DE NOTAS (LISTA DE ESTUDIANTES) */}
                {/* ------------------------------------------- */}
                
                <h2>Gestión de Notas por Estudiante</h2>
                
                {studentsList.length === 0 && <p>No se encontraron estudiantes para gestionar.</p>}

                {/* ✅ Aplicamos la clase CSS 'student-card-grid' */}
                <div className="student-card-grid">
                    {studentsList.map(est => (
                        // ✅ Aplicamos la clase CSS 'student-card'
                        <Link 
                            key={est.id} 
                            to={`/estudiantes/${est.id}`} 
                            className="student-card" 
                        >
                            {/* ✅ Aplicamos las clases CSS 'student-name' y 'student-code' */}
                            <p className="student-name">{est.nombre}</p> 
                            <p className="student-code">Código: {est.codigo}</p>
                            
                            {/* ✅ Aplicamos la clase CSS 'detail-link-btn' */}
                            <span className="detail-link-btn">
                                Ver Notas Detalladas <span style={{ marginLeft: '8px' }}>&rarr;</span>
                            </span>
                        </Link>
                    ))}
                </div>
                
            </div>
        </div>
    );
    
}; 

export default DashboardPage;