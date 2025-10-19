// src/api/reportService.js (CÓDIGO COMPLETO Y FINAL)

const BASE_URL = '/api'; // Usamos el proxy de Vite

// Función auxiliar para obtener datos
const fetchData = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        // Mejorar el error para saber qué falló.
        throw new Error(`Fallo al cargar ${endpoint}. Estado: ${response.status}`);
    }
    return response.json();
};

export const getPlatformReports = async () => {
    try {
        // 1. Obtener todos los datos necesarios en paralelo
        const [usuarios, notas, estudiantes] = await Promise.all([
            fetchData('/usuarios'),
            fetchData('/notas'),
            fetchData('/estudiantes')
        ]);

        // 2. Cálculo de Profesores (corregido: usa u.rol)
        const profesores = usuarios.filter(u => u.rol === 'profesor').length;
        
        let aprobados = 0;
        let reprobados = 0;
        const notasPorEstudiante = {};

        // 3. Agrupar notas por estudiante
        notas.forEach(nota => {
            // CORRECCIÓN 1: Usar 'estudianteId' y forzar a String (para coincidir con el ID del estudiante que también es String)
            const idEst = String(nota.estudianteId); 

            if (!notasPorEstudiante[idEst]) notasPorEstudiante[idEst] = [];
            
            // CORRECCIÓN 2: Usar el campo correcto 'nota' (visto en tu JSON)
            notasPorEstudiante[idEst].push(nota.nota);
        });

        // 4. Calcular el promedio y contar Aprobados/Reprobados
        estudiantes.forEach(est => {
            // CORRECCIÓN 3: Forzar el ID del estudiante a String para buscar la clave
            const notasArray = notasPorEstudiante[String(est.id)] || [];
            
            if (notasArray.length > 0) {
                const suma = notasArray.reduce((acc, val) => acc + val, 0);
                const promedio = suma / notasArray.length;

                if (promedio >= 3.0) { // Criterio de aprobación
                    aprobados++;
                } else {
                    reprobados++;
                }
            }
        });

        return {
            totalUsuarios: usuarios.length,
            totalEstudiantes: estudiantes.length,
            totalNotas: notas.length,
            totalProfesores: profesores,
            aprobados: aprobados,
            reprobados: reprobados,
        };

    } catch (error) {
        console.error("Error al obtener reportes:", error);
        // Si hay un error, devolvemos un objeto de reportes vacío para no romper la UI
        return { 
            totalEstudiantes: 0, 
            totalProfesores: 0, 
            aprobados: 0, 
            reprobados: 0, 
            error: error.message 
        };
    }
};