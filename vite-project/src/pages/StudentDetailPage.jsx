// src/pages/StudentDetailPage.jsx (CÓDIGO CORREGIDO Y FINAL)

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getStudentNotes, updateStudentNote } from '../api/reportService'; 
import Navbar from '../components/Navbar'; 
import ProfileSection from '../components/ProfileSection'; 
import NotesSection from '../components/NotesSection'; 

const StudentDetailPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    // Estado inicial que garantiza que estudiante es null y notas es un array vacío
    const [studentData, setStudentData] = useState({ estudiante: null, notas: [] }); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Estados para edición
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [tempScore, setTempScore] = useState('');

    const fetchNotes = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await getStudentNotes(id);
            
            if (data.error || !data.estudiante) {
                setError(data.error || "Estudiante no encontrado o datos inválidos.");
                setStudentData({ estudiante: null, notas: [] });
            } else {
                setStudentData(data);
            }
        } catch (err) {
            console.error("Fallo al obtener datos:", err);
            setError("Error de conexión o fallo de API.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    // MANEJADORES DE EDICIÓN
    const handleEdit = (notaItem) => {
        setEditingNoteId(notaItem.id);
        setTempScore(notaItem.nota ? notaItem.nota.toFixed(1) : '0.0');
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

    // RETORNOS CONDICIONALES (Se mantienen intactos)
    if (loading && !error) {
        return (
            <>
                <Navbar />
                <div style={{ padding: '20px', textAlign: 'center' }}>
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
                <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
                    <h1>Error de Carga</h1>
                    <p>{errorMessage}</p>
                    <Link to="/" style={{ marginTop: '15px', display: 'block', textDecoration: 'underline' }}>
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
            <div className="student-detail-main" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}> 
                
                {/* ✅ ÚNICA INSTANCIA DEL BOTÓN DE RETORNO (FUERA DE LA COLUMNA FLEX) */}
                <Link 
                    to="/dashboard" 
                    style={{ 
                        display: 'inline-block', 
                        marginBottom: '20px', 
                        textDecoration: 'underline', 
                        color: 'blue' 
                    }}
                >
                    &larr; Volver al Panel de Control 
                </Link>
                
                {/* ESTRUCTURA FLEX: Contiene SOLO las dos columnas */}
                <div style={{ display: 'flex', gap: '30px' }}>
                    
                    {/* 1. SECCIÓN DE PERFIL (Solo una instancia de ProfileSection) */}
                    <div style={{ flex: '0 0 300px', paddingRight: '30px' }}>
                        <ProfileSection student={estudiante} promedio={promedio} /> 
                    </div>
                    
                    {/* 2. SECCIÓN DE NOTAS */}
                    <div style={{ flex: '1' }}>
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
                
                {/* ❌ ELIMINADO: La sección de <Link> y el segundo <ProfileSection> duplicado. */}
                {/* ❌ ELIMINADO: El <div style={{ flex: '1' }}> de NotesSection estaba fuera de lugar. */}

            </div>
        </>
    );
};

export default StudentDetailPage;