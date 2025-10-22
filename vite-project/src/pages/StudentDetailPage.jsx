// src/pages/StudentDetailPage.jsx (CÓDIGO CORREGIDO Y REORDENADO)

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getStudentNotes, updateStudentNote } from '../api/reportService';
import Header from '../components/Header';

const StudentDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // 🎯 Estado inicial para evitar el error de referencia
    const [studentData, setStudentData] = useState({ estudiante: null, notas: [] }); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Nuevo estado para errores
    
    // Estados para edición
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [tempScore, setTempScore] = useState('');

    // Función de carga (la misma de antes, pero bien ubicada)
    const fetchNotes = async () => {
        setLoading(true);
        setError(null);

        const data = await getStudentNotes(id);
        
        if (data.error) {
            console.error(`Error al cargar notas: ${data.error}`);
            setError(data.error);
            // Si el error es "Estudiante no encontrado" o similar, no navegamos, solo mostramos el error.
            setLoading(false); 
            return;
        }
        
        setStudentData(data);
        setLoading(false);
    };

    // --- MANEJADORES DE EDICIÓN (DEBEN IR ANTES DEL RETURN) ---
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
    
    // useEffect (DEBE IR ANTES DEL RETURN)
    useEffect(() => {
        fetchNotes();
        // Incluimos fetchNotes y handleSave en dependencies para evitar warnings, 
        // aunque sabemos que no cambiarán. Si causa problemas, puedes ignorar el warning.
    }, [id, navigate]); 

    // -------------------------------------------------------------
    // RETORNOS CONDICIONALES (DEBEN IR ANTES DEL RETURN PRINCIPAL)
    // -------------------------------------------------------------

    // 1. Manejo de Carga
    if (loading) {
        return (
            <>
                <Header />
                <div style={{ padding: '20px' }}>
                    <h1>Cargando notas y perfil del estudiante...</h1>
                </div>
            </>
        );
    }

    // 2. Manejo de Errores (Si hay error O si studentData.estudiante es null después de cargar)
    if (error || !studentData.estudiante) {
        // Usamos el error reportado por la API o un mensaje genérico.
        const errorMessage = error || "Estudiante no encontrado o datos inválidos.";
        return (
            <>
                <Header />
                <div style={{ padding: '20px', color: 'red' }}>
                    <h1>Error de Carga</h1>
                    <p>{errorMessage}</p>
                    <Link to="/dashboard" style={{ marginTop: '10px', display: 'block' }}>
                        &larr; Volver al Panel de Control
                    </Link>
                </div>
            </>
        );
    }
    
    // -------------------------------------------------------------
    // CÓDIGO FINAL DE RENDERIZADO (Solo si loading=false y no hay error)
    // -------------------------------------------------------------

    // Desestructuración (Ahora es seguro hacerlo aquí)
    const { estudiante, notas } = studentData;
    const promedio = notas.length > 0 
        ? notas.reduce((sum, n) => sum + n.nota, 0) / notas.length
        : 0;

    return (
        <>
            <Header /> 
            <div style={{ padding: '0 20px 20px' }}>
                
                {/* Enlace para volver (Puedes eliminarlo si solo quieres usar el Header) */}
                <Link to="/dashboard" style={{ marginBottom: '20px', display: 'block', fontWeight: 'bold' }}>
                    &larr; Volver al Panel de Control 
                </Link>

                <h1>Notas de {estudiante.nombre}</h1>
                <p>
                    **Código:** {estudiante.codigo} | **Promedio:** {promedio.toFixed(2)}
                </p>
                
                <hr style={{ margin: '20px 0' }} />

                <h2>Detalle de Calificaciones</h2>
                
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
                                <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>
                                    {notaItem.materiaNombre} 
                                </td>
                                
                                {/* CELDA DE NOTA CON LÓGICA DE EDICIÓN */}
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
        </>
    );
};

export default StudentDetailPage;