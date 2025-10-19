// src/pages/StudentDetailPage.jsx (Paso inicial)
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const StudentDetailPage = () => {
    // 🎯 Capturamos el ID de la URL
    const { id } = useParams();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Detalle del Estudiante ID: {id}</h1>
            <p>Aquí se mostrarán el nombre del estudiante y sus notas.</p>
            <Link to="/dashboard">Volver al Panel de Control</Link>
        </div>
    );
};

export default StudentDetailPage;