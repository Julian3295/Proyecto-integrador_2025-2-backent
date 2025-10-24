// src/components/ProfileSection.jsx (INTEGRADO CON ESTILOS OSCUROS)

import React from 'react';

const ProfileSection = ({ student, promedio }) => {

    if (!student) {
        // Usamos la clase para que el mensaje de carga también tenga el estilo oscuro
        return <div className="profile-card">Cargando perfil...</div>; 
    }
    
    // Determinamos la clase CSS basada en el promedio (para el color condicional)
    const averageClass = (promedio || 0) >= 3.0 ? 'average-approved' : 'average-failed';
    
    return (
        // ✅ Aplicamos la clase principal 'profile-card'
        <div className="profile-card"> 
            <h2>Perfil de {student.nombre}</h2>
            <p><strong>Código:</strong> {student.codigo}</p>
            <p><strong>Grado:</strong> {student.grado}</p>
            
            <p>
                <strong>Promedio General:</strong> 
                <span className={`average-value ${averageClass}`}> {/* Aplicamos las clases condicionales */}
                    {(promedio || 0).toFixed(2)}
                </span>
            </p>
            
            {/* El estilo de los h3 y h4 se maneja en el CSS ahora */}
            <h3>Contacto</h3> 
            <p><strong>Teléfono:</strong> {student.telefono}</p>
            <p><strong>Email:</strong> {student.email}</p>
            
            {student.acudiente && (
                <div> {/* Eliminamos el estilo en línea */}
                    <h4>Acudiente</h4>
                    <p><strong>Nombre:</strong> {student.acudiente.nombre}</p>
                    <p><strong>Teléfono:</strong> {student.acudiente.telefono}</p>
                    <p><strong>Email:</strong> {student.acudiente.email}</p> 
                </div>
            )}
        </div>
    );
};

export default ProfileSection;