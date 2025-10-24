// src/pages/StudentDetailPage.jsx (CÓDIGO CORREGIDO Y COMPLETO)

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// ✅ CORRECCIÓN APLICADA: Importación de funciones de API.
// Asumo que están en '../api/dataService' y se exportan con 'export const nombreFuncion = ...'
import { 
    getStudentNotes, 
    updateStudentNote,
    // Podrías necesitar getStudentData si la API fuera separada, pero fetchNotes ya lo maneja
} from '../api/dataService'; 

// ✅ Importaciones corregidas sin llaves
import Navbar from '../components/Navbar.jsx'; 
import ProfileSection from '../components/ProfileSection.jsx';
import NotesSection from '../components/NotesSection.jsx';

const StudentDetailPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    // Estados
    const [studentData, setStudentData] = useState({ estudiante: null, notas: [] }); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [tempScore, setTempScore] = useState('');

    const fetchNotes = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Usa la función de API importada
            const data = await getStudentNotes(id);
            
            if (data.error || !data.estudiante) {
                setError(data.error || "Estudiante no encontrado o datos inválidos.");
                setStudentData({ estudiante: null, notas: [] });
            } else {
                setStudentData(data);
            }
        } catch (err) {
            // Muestra el error de referencia en la consola para depuración
            console.error("Fallo al obtener datos:", err); 
            setError("Error de conexión o fallo de API.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    const handleEdit = (notaItem) => {
        setEditingNoteId(notaItem.id);
        // Protege contra notas nulas o indefinidas (Error anteriormente reportado: .toFixed)
        setTempScore(notaItem.nota !== null && notaItem.nota !== undefined ? notaItem.nota.toFixed(1) : '0.0');
    };

    const handleSave = async (noteId) => {
        try {
            const score = parseFloat(tempScore);
            if (isNaN(score) || score < 0 || score > 5.0) {
                alert("La nota debe ser un número entre 0.0 y 5.0");
                return;
            }
            
            await updateStudentNote(noteId, score);
            await fetchNotes(); // Recargar datos
            
            setEditingNoteId(null);
            setTempScore('');

        } catch (error) {
            console.error("Error al guardar la nota:", error);
            alert(`Fallo al guardar: ${error.message}`);
        }
    };
    
    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]); 

    // RETORNOS CONDICIONALES
    if (loading && !error) {
        return (
            <>
                <Navbar />
                <div style={{ padding: '20px', textAlign: 'center', color: '#f5f5f5' }}>
                    <h1>Cargando notas y perfil del estudiante...</h1> 
                </div>
            </>
        );
    }
    
    if (error || !studentData.estudiante) {
        const errorMessage = error || "Estudiante no encontrado o datos inválidos.";
        return (
            <>
                <Navbar />
                <div style={{ padding: '40px 20px', color: '#ffeba7', textAlign: 'center', backgroundColor: '#1f2029' }}>
                    <h1 style={{ color: '#e3342f' }}>Error de Carga</h1>
                    <p style={{ color: '#d3d3d3' }}>{errorMessage}</p>
                    <Link to="/dashboard" className="detail-return-link" style={{ marginTop: '20px', textDecoration: 'none' }}> 
                        &larr; Volver al Panel de Control
                    </Link>
                </div>
            </>
        );
    }
    
    // RENDERIZADO FINAL 
    const { estudiante, notas } = studentData;
    const promedio = notas.length > 0 
        ? notas.reduce((sum, n) => sum + (n.nota || 0), 0) / notas.length
        : 0;

    return (
        <>
            <Navbar /> 
            <div className="student-detail-main-content"> 
                
                {/* Enlace de retorno con estilo de acento */}
                <Link to="/dashboard" className="detail-return-link"> 
                    &larr; Volver al Panel de Control 
                </Link>
                
                <div className="student-detail-grid"> 
                    
                    {/* 1. SECCIÓN DE PERFIL */}
                    <div className="profile-column"> 
                        <ProfileSection student={estudiante} promedio={promedio} /> 
                    </div>
                    
                    {/* 2. SECCIÓN DE NOTAS */}
                    <div className="notes-column">
                        <NotesSection 
                            estudiante={estudiante}
                            notas={notas}
                            promedio={promedio}
                            editingNoteId={editingNoteId}
                            tempScore={tempScore}
                            setTempScore={setTempScore}
                            handleEdit={handleEdit}
                            handleSave={handleSave}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentDetailPage;