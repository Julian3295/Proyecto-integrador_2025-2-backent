
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
    
    // Estilo común para los bordes de la tabla
    const cellStyle = { 
        border: '1px solid #333', 
        padding: '10px', 
        color: '#333', // Asegura texto oscuro para las celdas de datos
    };

    return (
        <div>
            <h1>Notas de {estudiante?.nombre}</h1>
            <p>
                **Código:** {estudiante?.codigo} | **Promedio:** {(promedio || 0).toFixed(2)}
            </p>
            
            <hr style={{ margin: '20px 0' }} />

            <h2>Detalle de Calificaciones</h2>
            
            {(!notas || notas.length === 0) ? (
                <p>No hay calificaciones registradas para este estudiante.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                    <thead>
                        {/* Cabecera oscura con texto blanco */}
                        <tr style={{ backgroundColor: '#333', color: 'white' }}> 
                            <th style={{ ...cellStyle, color: 'white', textAlign: 'left' }}>Materia</th>
                            <th style={{ ...cellStyle, color: 'white', textAlign: 'center' }}>Nota</th>
                            <th style={{ ...cellStyle, color: 'white', textAlign: 'center' }}>Estado</th>
                            <th style={{ ...cellStyle, color: 'white', textAlign: 'center' }}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.map((notaItem, index) => (
                            // Aplicamos fondo alternado para mejor visibilidad y legibilidad
                            <tr 
                                key={notaItem.id}
                                style={{ 
                                    backgroundColor: index % 2 === 0 ? 'white' : '#f4f4f4', // Estilo "Cebra"
                                }}
                            >
                                {/* Celda de Materia */}
                                <td style={{ ...cellStyle, textAlign: 'left' }}>
                                    {notaItem.materiaNombre} 
                                </td>
                                
                                {/* Celda de Nota */}
                                <td style={{ ...cellStyle, textAlign: 'center' }}>
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
                                
                                {/* Celda de Estado (el color es dinámico, funciona bien) */}
                                <td style={{ ...cellStyle, textAlign: 'center', color: notaItem.nota >= 3.0 ? 'green' : 'red' }}>
                                    {notaItem.nota >= 3.0 ? 'Aprobado' : 'Reprobado'}
                                </td>
                                
                                {/* Celda de Acción */}
                                <td style={{ ...cellStyle, textAlign: 'center' }}>
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