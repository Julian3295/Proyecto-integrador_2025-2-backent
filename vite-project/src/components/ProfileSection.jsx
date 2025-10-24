// src/components/ProfileSection.jsx (CÓDIGO CORREGIDO)

import React from 'react';

const ProfileSection = ({ student, promedio }) => {

    if (!student) {
        return <div className="profile-card">Cargando perfil...</div>;
    }
    
    return (
        <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
            <h2>Perfil de {student.nombre}</h2>
            <p><strong>Código:</strong> {student.codigo}</p>
            <p><strong>Grado:</strong> {student.grado}</p>
            
            <p><strong>Promedio General:</strong> 
                {/* ✅ CORRECCIÓN: Usa (promedio || 0).toFixed(2) */}
                <span style={{ fontWeight: 'bold', color: promedio >= 3.0 ? 'green' : 'red' }}>
                    {(promedio || 0).toFixed(2)}
                </span>
            </p>
            
            <h3 style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '10px' }}>Contacto</h3>
            <p><strong>Teléfono:</strong> {student.telefono}</p>
            <p><strong>Email:</strong> {student.email}</p>
            
            {student.acudiente && (
                <div style={{ marginTop: '15px' }}>
                    <h4 style={{ margin: 0 }}>Acudiente</h4>
                    <p style={{ margin: '5px 0' }}>**Nombre:** {student.acudiente.nombre}</p>
                    <p style={{ margin: '5px 0' }}>**Teléfono:** {student.acudiente.telefono}</p>
                    {/* ✅ CORRECCIÓN: Agrega el campo de correo electrónico del acudiente */}
                    <p style={{ margin: '5px 0' }}>**Email:** {student.acudiente.email}</p> 
                </div>
            )}
        </div>
    );
};

export default ProfileSection;