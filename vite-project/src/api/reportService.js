// src/api/reportService.js (CÓDIGO COMPLETO Y REVISADO)

const BASE_URL = '/api'; // Usamos el proxy de Vite

// Función auxiliar para obtener datos
const fetchData = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        // Lanzamos un error si la respuesta HTTP no es OK (ej: 404, 500)
        throw new Error(`Fallo al cargar ${endpoint}. Estado: ${response.status}`);
    }
    return response.json();
};

// -------------------------------------------------------------
// 1. Dashboard Reports
// -------------------------------------------------------------
export const getPlatformReports = async () => {
    try {
        const [usuarios, notas, estudiantes] = await Promise.all([
            fetchData('/usuarios'),
            fetchData('/notas'),
            fetchData('/estudiantes')
        ]);
        
        const profesores = usuarios.filter(u => u.rol === 'profesor').length;
        
        let aprobados = 0;
        let reprobados = 0;
        const notasPorEstudiante = {};

        notas.forEach(nota => {
            const idEst = String(nota.estudianteId);
            if (!notasPorEstudiante[idEst]) notasPorEstudiante[idEst] = [];
            notasPorEstudiante[idEst].push(nota.nota);
        });

        estudiantes.forEach(est => {
            const estId = String(est.id);
            const notasEst = notasPorEstudiante[estId] || [];
            
            if (notasEst.length > 0) {
                const sumaNotas = notasEst.reduce((sum, nota) => sum + nota, 0);
                const promedio = sumaNotas / notasEst.length;
                
                if (promedio >= 3.0) { 
                    aprobados++;
                } else {
                    reprobados++;
                }
            }
        });
        
        return {
            totalUsuarios: usuarios.length,
            totalEstudiantes: estudiantes.length,
            totalProfesores: profesores,
            aprobados: aprobados,
            reprobados: reprobados,
            estudiantes: estudiantes,
        };

    } catch (error) {
        console.error("Error al obtener reportes:", error);
        return { totalEstudiantes: 0, totalProfesores: 0, aprobados: 0, reprobados: 0, error: error.message };
    }
};

// -------------------------------------------------------------
// 2. Student List
// -------------------------------------------------------------
export const getStudents = async () => {
    try {
        const estudiantes = await fetchData('/estudiantes');
        // Nos aseguramos de devolver un array, incluso si está vacío.
        return Array.isArray(estudiantes) ? estudiantes : []; 
    } catch (error) {
        console.error("Error al obtener la lista de estudiantes:", error);
        return [];
    }
};

// -------------------------------------------------------------
// 3. Student Detail and Notes (Incluye mapeo de materia)
// -------------------------------------------------------------
export const getStudentNotes = async (studentId) => {
    let estudiantes;
    let notas;
    let materias;
    
    try {
        // Obtenemos los 3 arrays en paralelo
        [estudiantes, notas, materias] = await Promise.all([
            fetchData('/estudiantes'),
            fetchData('/notas'),
            fetchData('/materias'), // Nueva llamada
        ]);

        // Verificamos que los datos sean arrays
        if (!Array.isArray(estudiantes) || !Array.isArray(notas) || !Array.isArray(materias)) {
            throw new Error('Datos de la API no válidos (falló la carga de estudiantes, notas o materias).');
        }

        // Lógica de TIPO DE DATOS: ID de Estudiante es STRING, Notas es NUMBER
        const targetIdString = studentId; 
        const targetIdNumber = parseInt(studentId, 10); 

        // 1. BUSCAR ESTUDIANTE (usa STRING vs STRING)
        const estudiante = estudiantes.find(est => est.id === targetIdString); 
        
        if (!estudiante) {
            return { error: 'Estudiante no encontrado' }; 
        }

        // 2. FILTRAR Y ENRIQUECER NOTAS (mapeo y enriquecimiento)
        const notasEstudiante = notas
            .filter(nota => nota.estudianteId === targetIdNumber)
            .map(nota => {
                // Buscamos la materia. Usamos String() para asegurar la comparación de IDs.
                const materiaEncontrada = materias.find(
                    m => String(m.id) === String(nota.materiaId)
                );
                
                return {
                    ...nota,
                    materiaNombre: materiaEncontrada ? materiaEncontrada.nombre : "Materia Desconocida", 
                };
            });
        
        return {
            estudiante: estudiante,
            notas: notasEstudiante,
        };

    } catch (error) {
        console.error(`Error en getStudentNotes para ID ${studentId}:`, error);
        return { error: `Fallo de API: ${error.message}` };
    }
}; 

// -------------------------------------------------------------
// 4. Update Note (Edición)
// -------------------------------------------------------------
export const updateStudentNote = async (noteId, newScore) => {
    const endpoint = `/notas/${noteId}`;
    
    // Convertir el puntaje a un número y validar
    const notaNumerica = parseFloat(newScore);
    
    if (isNaN(notaNumerica) || notaNumerica < 0 || notaNumerica > 5.0) {
        throw new Error("La nota debe ser un número entre 0.0 y 5.0."); 
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            nota: notaNumerica 
        }),
    });

    if (!response.ok) {
        throw new Error(`Fallo al actualizar la nota ${noteId}. Estado: ${response.status}`);
    }
    
    return response.json();
};