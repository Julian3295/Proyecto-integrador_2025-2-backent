// src/components/NotesSection.jsx (INTEGRADO CON ESTILOS OSCUROS)

import React from 'react';

const NotesSection = ({ 
    estudiante, 
    notas, 
    promedio, 
    editingNoteId, 
    tempScore, 
    setTempScore, 
    handleEdit, 
    handleSave 
}) => {
    
    // Clase condicional para el promedio general
    const averageClass = (promedio || 0) >= 3.0 ? 'average-approved' : 'average-failed';

    return (
        // ✅ Aplicamos el contenedor principal 'notes-section-container'
        <div className="notes-section-container">
            <h1>Notas de {estudiante?.nombre}</h1>
            <p>
                {/* Usamos clases del profile-card para mantener la consistencia */}
                <strong className="profile-card-label">Código:</strong> {estudiante?.codigo} 
                {' '} | {' '}
                <strong className="profile-card-label">Promedio:</strong> 
                <span className={`average-value ${averageClass}`}>
                    {(promedio || 0).toFixed(2)}
                </span>
            </p>
            
            <hr style={{ margin: '20px 0', borderColor: '#444' }} />

            <h2>Detalle de Calificaciones</h2>
            
            {(!notas || notas.length === 0) ? (
                <p>No hay calificaciones registradas para este estudiante.</p>
            ) : (
                // ✅ Aplicamos la clase principal 'notes-table'
                <table className="notes-table"> 
                    <thead>
                        <tr>
                            <th>Materia</th>
                            <th>Nota</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.map((notaItem) => {
                            // Clases condicionales para el estado de la nota
                            const statusClass = notaItem.nota >= 3.0 ? 'status-approved' : 'status-failed';
                            
                            return (
                                <tr key={notaItem.id}>
                                    <td style={{ textAlign: 'left' }}>
                                        {notaItem.materiaNombre} 
                                    </td>
                                    
                                    <td style={{ textAlign: 'center' }}>
                                        {editingNoteId === notaItem.id ? (
                                            // ✅ Aplicamos la clase 'edit-input'
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="5.0"
                                                value={tempScore}
                                                onChange={(e) => setTempScore(e.target.value)}
                                                className="edit-input" 
                                            />
                                        ) : (
                                            <span style={{ fontWeight: 'bold', color: '#ffeba7' }}>{(notaItem.nota || 0).toFixed(1)}</span>
                                        )}
                                    </td>
                                    
                                    {/* ✅ Aplicamos la clase condicional 'status-...' */}
                                    <td className={statusClass} style={{ textAlign: 'center' }}>
                                        {notaItem.nota >= 3.0 ? 'Aprobado' : 'Reprobado'}
                                    </td>
                                    
                                    <td style={{ textAlign: 'center' }}>
                                        {editingNoteId === notaItem.id ? (
                                            // ✅ Aplicamos la clase 'save-btn'
                                            <button onClick={() => handleSave(notaItem.id)} className="action-btn save-btn">
                                                Guardar
                                            </button>
                                        ) : (
                                            // ✅ Aplicamos la clase 'edit-btn'
                                            <button onClick={() => handleEdit(notaItem)} className="action-btn edit-btn">
                                                Editar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default NotesSection;