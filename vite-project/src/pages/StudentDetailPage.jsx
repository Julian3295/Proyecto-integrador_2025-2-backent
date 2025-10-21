// src/pages/StudentDetailPage.jsx (Versión con Lógica de Edición)

// ... (imports y estado studentData van arriba) ...
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // 👈 ¡CORRECCIÓN AQUÍ!
import { getStudentNotes, updateStudentNote } from '../api/reportService';

const StudentDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🎯 NUEVOS ESTADOS PARA EDICIÓN
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [tempScore, setTempScore] = useState('');

    // Función de carga (la misma de antes, pero reutilizable)
    const fetchNotes = async () => {
        setLoading(true);
        const data = await getStudentNotes(id);
        
        if (data.error) {
            alert(`Error: ${data.error}`);
            navigate('/dashboard'); 
            return;
        }
        
        setStudentData(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchNotes();
    }, [id, navigate]); 

    // --- MANEJADORES DE EDICIÓN ---

    const handleEdit = (notaItem) => {
        setEditingNoteId(notaItem.id);
        setTempScore(notaItem.nota.toFixed(1));
    };

    const handleSave = async (noteId) => {
        try {
            await updateStudentNote(noteId, tempScore);
            alert("Nota actualizada con éxito.");
            
            // Recargar datos después de guardar
            await fetchNotes(); 
            
            setEditingNoteId(null);
            setTempScore('');

        } catch (error) {
            console.error("Error al guardar la nota:", error);
            alert(`Fallo al guardar: ${error.message}`);
        }
    };

    // ... (El código de loading, error handling y el h1 va aquí) ...
    // (Asegúrate de copiar el código completo del paso anterior y añadir las nuevas funciones)

    if (loading) {
        return <div style={{ padding: '20px' }}>Cargando notas y perfil del estudiante...</div>;
    }
    // ... (manejo de error de estudiante no encontrado) ...

    const { estudiante, notas } = studentData;
    const promedio = notas.length > 0 
        ? notas.reduce((sum, n) => sum + n.nota, 0) / notas.length
        : 0;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/dashboard" style={{ marginBottom: '20px', display: 'block', fontWeight: 'bold' }}>
                &larr; Volver al Panel de Control
            </Link>

            <h1>Notas de {estudiante.nombre}</h1>
            <p>
                **Código:** {estudiante.codigo} | **Promedio:** {promedio.toFixed(2)}
            </p>
            
            <hr style={{ margin: '20px 0' }} />

            <h2>Detalle de Calificaciones</h2>
            
            {/* ... (Tabla head va aquí) ... */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Materia</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Nota</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Estado</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {notas.map((notaItem) => (
                        <tr key={notaItem.id}>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                                {notaItem.curso || `Materia Desconocida`} 
                            </td>
                            {/* 🎯 CELDA DE NOTA CON LÓGICA DE EDICIÓN */}
                            <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
                                {editingNoteId === notaItem.id ? (
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5.0"
                                        value={tempScore}
                                        onChange={(e) => setTempScore(e.target.value)}
                                        style={{ width: '60px', textAlign: 'center' }}
                                    />
                                ) : (
                                    <span style={{ fontWeight: 'bold' }}>{notaItem.nota.toFixed(1)}</span>
                                )}
                            </td>
                            {/* CELDA DE ESTADO */}
                            <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center', color: notaItem.nota >= 3.0 ? 'green' : 'red' }}>
                                {notaItem.nota >= 3.0 ? 'Aprobado' : 'Reprobado'}
                            </td>
                            {/* CELDA DE ACCIÓN CON BOTÓN DINÁMICO */}
                            <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
                                {editingNoteId === notaItem.id ? (
                                    <button onClick={() => handleSave(notaItem.id)} style={{ padding: '5px 10px', backgroundColor: 'green', color: 'white' }}>
                                        Guardar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(notaItem)} style={{ padding: '5px 10px' }}>
                                        Editar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentDetailPage;