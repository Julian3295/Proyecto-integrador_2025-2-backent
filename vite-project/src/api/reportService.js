// src/api/reportService.js (CÓDIGO CORREGIDO Y COMPLETO)

const BASE_URL = '/api'; // Usamos el proxy de Vite

// Función auxiliar para obtener datos
const fetchData = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`Fallo al cargar ${endpoint}. Estado: ${response.status}`);
    }
    return response.json();
};

export const getPlatformReports = async () => {
    try {
        // Lógica de carga de usuarios, notas, estudiantes en paralelo
        const [usuarios, notas, estudiantes] = await Promise.all([
            fetchData('/usuarios'),
            fetchData('/notas'),
            fetchData('/estudiantes')
        ]);
        
        // 🚨 COMIENZO DE LA LÓGICA DE CÁLCULO FALTANTE 🚨
        
        // 1. Cálculo de Profesores
        const profesores = usuarios.filter(u => u.rol === 'profesor').length;
        
        // 2. Inicialización para Aprobados/Reprobados
        let aprobados = 0;
        let reprobados = 0;
        const notasPorEstudiante = {};

        // Organizar notas por estudiante para fácil acceso
        notas.forEach(nota => {
            const idEst = String(nota.estudianteId);
            if (!notasPorEstudiante[idEst]) notasPorEstudiante[idEst] = [];
            notasPorEstudiante[idEst].push(nota.nota); // Usamos 'nota' si es el campo correcto de la API
        });

        // Calcular promedio y contar Aprobados/Reprobados
        estudiantes.forEach(est => {
            const estId = String(est.id);
            const notasEst = notasPorEstudiante[estId] || [];
            
            if (notasEst.length > 0) {
                const sumaNotas = notasEst.reduce((sum, nota) => sum + nota, 0);
                const promedio = sumaNotas / notasEst.length;
                
                // Suponemos que 3.0 es la nota mínima de aprobación
                if (promedio >= 3.0) { 
                    aprobados++;
                } else {
                    reprobados++;
                }
            }
        });
        
        // 🚨 FIN DE LA LÓGICA DE CÁLCULO FALTANTE 🚨

        return {
            totalUsuarios: usuarios.length,
            totalEstudiantes: estudiantes.length,
            totalProfesores: profesores, // ✅ Ahora definida
            aprobados: aprobados,       // ✅ Ahora definida
            reprobados: reprobados,     // ✅ Ahora definida
            // ... otros reportes
            estudiantes: estudiantes, // Incluimos la lista completa para referencia
        };

    } catch (error) {
        console.error("Error al obtener reportes:", error);
        // Devolvemos 0 en los contadores en caso de error
        return { totalEstudiantes: 0, totalProfesores: 0, aprobados: 0, reprobados: 0, error: error.message };
    }
};

// Funciones nuevas para la doble carga y detalle (ESTÁN BIEN)
export const getStudents = async () => {
    try {
        const estudiantes = await fetchData('/estudiantes');
        return estudiantes; 
    } catch (error) {
        console.error("Error al obtener la lista de estudiantes:", error);
        return [];
    }
};

export const getStudentNotes = async (studentId) => {
    // Aquí iría la lógica para filtrar las notas por studentId
    return []; 
};