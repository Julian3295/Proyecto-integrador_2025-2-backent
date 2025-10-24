
import React from 'react';

const NotesSection = ({ 
    estudiante, 
    notas, 
    promedio, // Esta prop puede ser undefined inicialmente
    editingNoteId, 
    tempScore, 
    setTempScore, 
    handleEdit, 
    handleSave 
}) => {
    
    return (
        <div>
            <h1>Notas de {estudiante?.nombre}</h1>
            <p>
                **Código:** {estudiante?.codigo} | **Promedio:** {(promedio || 0).toFixed(2)} {/* ✅ CORRECCIÓN: Usa (promedio || 0) */}
            </p>
            
            <hr style={{ margin: '20px 0' }} />

            <h2>Detalle de Calificaciones</h2>
            
            {(!notas || notas.length === 0) ? (
                <p>No hay calificaciones registradas para este estudiante.</p>
            ) : (
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
                                        <span style={{ fontWeight: 'bold' }}>{(notaItem.nota || 0).toFixed(1)}</span>
                                    )}
                                </td>
                                
                                <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center', color: notaItem.nota >= 3.0 ? 'green' : 'red' }}>
                                    {notaItem.nota >= 3.0 ? 'Aprobado' : 'Reprobado'}
                                </td>
                                
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
            )}
        </div>
    );
};

export default NotesSection;