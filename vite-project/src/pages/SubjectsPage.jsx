import React from 'react';

// Datos de ejemplo para simular la información real
const dummySubjects = [
    { id: 1, name: "Matemáticas Avanzadas (10A)", professor: "Alberto Gómez", schedule: "Lun/Mié 8:00 AM", code: "MAT-1" },
    { id: 2, name: "Literatura Española (10A)", professor: "Carolina Soto", schedule: "Mar/Jue 10:00 AM", code: "MAT-2" },
    { id: 3, name: "Ciencias Sociales Contemporáneas (10A)", professor: "Daniel Herrera", schedule: "Vie 2:00 PM", code: "MAT-3" },
];

const SubjectsPage = () => {
    const userName = "Ana García"; 

    return (
        // 🎯 CLASE CORREGIDA: Usamos 'page-content-wrapper' para limitar el ancho y centrar
        <div className="page-content-wrapper max-w-4xl mx-auto p-8"> 
            
            {/* Tarjeta de contenido: Fondo blanco y sombra para destacarse */}
            <div className="bg-white p-8 shadow-2xl rounded-xl"> 

                <h1 className="text-3xl font-extrabold mb-2 text-cyan-700 border-b pb-2">
                    Mis Materias
                </h1>
                <p className="text-gray-600 mb-6">
                    Aquí puedes ver las asignaturas a las que estás registrado, {userName}.
                </p>

                <div className="space-y-6">
                    {dummySubjects.map((subject) => (
                        <div key={subject.id} className="subject-item p-4 border rounded-lg hover:bg-gray-50 transition duration-300">
                            <h2 className="text-xl font-bold mb-1 text-gray-800">
                                {subject.name} <span className="text-sm font-medium text-blue-500">({subject.code})</span>
                            </h2>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Profesor:</span> {subject.professor}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Horario:</span> {subject.schedule}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubjectsPage;