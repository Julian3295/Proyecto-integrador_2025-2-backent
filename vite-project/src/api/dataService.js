// src/api/dataService.js (Código de Simulación Temporal)

// Función simulada que el StudentDetailPage está buscando
export const getStudentNotes = async (id) => {
    console.log(`[API SIMULADA]: Solicitando notas para el ID ${id}`);
    
    // Retorna una estructura válida esperada por StudentDetailPage
    return {
        estudiante: {
            id: id,
            nombre: "Isabella Ramírez",
            codigo: "EST002",
            grado: "10A",
            contacto: {
                telefono: "+57 311 234 5678",
                email: "isabella.ramirez@estudiante.edu"
            },
            acudiente: {
                nombre: "Carmen Ramírez",
                telefono: "+57 301 876 5432",
                email: "carmen.ramirez@gmail.com"
            }
        },
        notas: [
            { id: 101, materia: "Matemáticas", nota: 3.5, estado: "Aprobado" },
            { id: 102, materia: "Matemáticas", nota: 4.0, estado: "Aprobado" },
            { id: 103, materia: "Ciencias Naturales", nota: 4.7, estado: "Aprobado" },
            { id: 104, materia: "Ciencias Sociales", nota: 3.8, estado: "Aprobado" },
        ]
    };
};

// Función simulada necesaria para la edición
export const updateStudentNote = async (noteId, score) => {
    console.log(`[API SIMULADA]: Actualizando nota ${noteId} a ${score}`);
    // Simula éxito
    return { success: true };
};