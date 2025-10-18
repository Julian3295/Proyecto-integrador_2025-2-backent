// src/api/reportService.js
const BASE_URL = '/api'; // Usamos el proxy de Vite

const fetchData = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`Fallo al cargar ${endpoint}. Estado: ${response.status}`);
    }
    return response.json();
};

export const getPlatformReports = async () => {
    try {
        // Obtenemos los datos necesarios para los reportes (usuarios, notas, estudiantes)
        const [usuarios, notas, estudiantes] = await Promise.all([
            fetchData('/usuarios'),
            fetchData('/notas'),
            fetchData('/estudiantes')
        ]);

        // Cálculo de Estadísticas (Protección de perfil, Profesores, Aprobados/Reprobados)
        const profesores = usuarios.filter(u => u.perfil === 'profesor').length;
        
        let aprobados = 0;
        let reprobados = 0;
        const notasPorEstudiante = {};

        notas.forEach(nota => {
            const idEst = nota.idEstudiante;
            if (!notasPorEstudiante[idEst]) notasPorEstudiante[idEst] = [];
            notasPorEstudiante[idEst].push(nota.valor);
        });

        estudiantes.forEach(est => {
            const notasArray = notasPorEstudiante[est.id] || [];
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
        return { error: error.message };
    }
};