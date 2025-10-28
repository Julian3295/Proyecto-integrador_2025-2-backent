import { useEffect, useState } from 'react';
// ELIMINAMOS Navbar, Aside, y Footer. SOLO QUEDAN LAS NECESARIAS:
 
import Aside from "../components/Aside.jsx";
import { useNavigate, Link, useLocation } from 'react-router-dom'; 
import { getPlatformReports, getStudents } from '../api/reportService';

const DashboardPage = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    
    const [currentUser, setCurrentUser] = useState(null);
    const [reports, setReports] = useState(null);
    const [studentsList, setStudentsList] = useState([]); 
    const [loading, setLoading] = useState(true);

    // Lógica para cargar reportes Y PROTEGER LA RUTA (código mantenido)
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
    
    // useEffect para hacer scroll al #hash (código mantenido)
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


    // 1. Mostrar estado de carga (¡Sin Navbar, Aside ni Footer!)
    if (loading) {
        return (
            <div className="dashboard-content loading-state" style={{ padding: '20px' }}>
                <h1>Cargando Dashboard...</h1>
                <p>Preparando reportes y lista de estudiantes...</p>
            </div>
        );
    }
    
    const statsArray = reports ? [
        { title: "Total de Estudiantes", value: reports.totalEstudiantes },
        { title: "Total de Profesores", value: reports.totalProfesores },
        { title: "Estudiantes Aprobados", value: reports.aprobados },
        { title: "Estudiantes Reprobados", value: reports.reprobados }
    ] : [];


    // 2. Renderizar el Dashboard (¡Sin Navbar, Aside ni Footer!)
    return (
        // 🎯 SOLO CONTENIDO DE LA PÁGINA (el ProtectedLayout ya envuelve esto en un <main>)
        <div className="dashboard-content">
            
            <h1 className="text-3xl font-bold mb-4" style={{ color: '#f5f5f5' }}>
                Bienvenido, {currentUser?.nombre || 'usuario'}
            </h1>
            
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
            <hr style={{ margin: '40px 0', borderColor: '#008cff' }} />
            
            {/* ------------------------------------------- */}
            {/* 2. SECCIÓN DE GESTIÓN DE NOTAS (LISTA DE ESTUDIANTES) */}
            {/* ------------------------------------------- */}
            
            <div id="students-section"> 
                <h2>Gestión de Notas por Estudiante</h2>
                
                {studentsList.length === 0 && <p>No se encontraron estudiantes para gestionar.</p>}

                <div className="student-list-grid">
                    {studentsList.map(est => (
                        <Link 
                            key={est.id} 
                            // 🎯 CORRECCIÓN CLAVE: Usar la ruta anidada completa
                            to={`/dashboard/estudiantes/${est.id}`} 
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
    );
}; 

export default DashboardPage;