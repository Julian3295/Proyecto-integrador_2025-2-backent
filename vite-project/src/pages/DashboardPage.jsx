// src/pages/DashboardPage.jsx

import React, { useEffect, useState } from 'react';
import ReportCard from '../components/ReportCard'
import { useNavigate, Link } from 'react-router-dom';
import { getPlatformReports, getStudents } from '../api/reportService';
import Header from '../components/Header';

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
            // 🎯 Usamos un Fragmento (<>) para devolver el Header y el mensaje de carga
            <>
                <Header /> 
                <div className="dashboard-loading" style={{ padding: '20px' }}>
                    <h1>Cargando Dashboard...</h1>
                    <p>Preparando reportes y lista de estudiantes...</p>
                </div>
            </>
        );
    }

    const estudiantes = studentsList; 

    // 2. Renderizar el Dashboard (Return principal)
    return (
        // 🎯 Usamos un Fragmento (<>) para devolver el Header y el contenido principal
        <>
            <Header /> 
            <div className="dashboard-content" style={{ padding: '0 20px 20px' }}>
                <h1>Panel de Control Principal</h1>
                <p>Bienvenido, {currentUser ? currentUser.nombre : 'Usuario'}!</p>
                
                {/* Sección de Tarjetas de Reporte */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
                    
                    {reports && (
                        <>
                            <ReportCard title="Total de Estudiantes" value={reports.totalEstudiantes} icon="🧑‍🎓" />
                            <ReportCard title="Total de Profesores" value={reports.totalProfesores} icon="👨‍🏫" />
                            <ReportCard title="Estudiantes Aprobados" value={reports.aprobados} icon="✅" />
                            <ReportCard title="Estudiantes Reprobados" value={reports.reprobados} icon="❌" />
                        </>
                    )}
                </div>

                {/* ------------------------------------------- */}
                {/* SECCIÓN DE GESTIÓN DE NOTAS */}
                {/* ------------------------------------------- */}
                
                <hr style={{ margin: '40px 0' }} />
                
                <h2>Gestión de Notas por Estudiante</h2>
                
                {estudiantes.length === 0 && <p>No se encontraron estudiantes para gestionar.</p>}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    {estudiantes.map(est => (
                        <div 
                            key={est.id} 
                            style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}
                        >
                            <h3>{est.nombre}</h3>
                            <p>Código: {est.codigo}</p>
                            
                            <Link 
                                to={`/estudiantes/${est.id}`} 
                                style={{ display: 'inline-block', marginTop: '10px', color: 'teal', textDecoration: 'none', fontWeight: 'bold' }}
                            >
                                Ver Notas Detalladas ➡️
                            </Link>
                        </div>
                    ))}
                </div>
                
            </div>
        </>
    );
    
}; 

export default DashboardPage;