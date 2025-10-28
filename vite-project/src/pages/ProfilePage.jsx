import React from 'react';
// Asumo que tienes los datos del perfil disponibles, quizás del AuthContext
const dummyProfile = {
    fullName: "Ana García",
    email: "ana.garcia@escuela.edu",
    rol: "Estudiante",
    userCode: "N/A"
};

const ProfilePage = () => {
    // Aquí obtendrías el perfil del usuario real (ej: const { currentUser } = useAuth();)
    const profile = dummyProfile; 

    return (
        // Usamos la misma clase de contenido principal
        <div className="dashboard-content p-8"> 
            
            {/* Contenedor blanco para el contenido */}
            <div className="card-container white-background p-6 shadow-lg rounded-lg max-w-lg mx-auto"> 
                
                <h1 className="text-3xl font-bold mb-4" style={{ color: '#008cff' }}>
                    Perfil de {profile.fullName}
                </h1>

                <p className="text-gray-600 mb-6 border-b pb-4">
                    Tu información de acceso y rol.
                </p>

                {/* Sección de Datos Personales */}
                <div className="info-section mb-6">
                    <h2 className="text-xl font-semibold mb-2" style={{ color: '#333' }}>
                        Datos del Usuario
                    </h2>
                    <p>
                        **Nombre Completo:** {profile.fullName}
                    </p>
                    <p>
                        **Correo Electrónico:** {profile.email}
                    </p>
                    <p>
                        **Rol en BrainNote:** {profile.rol}
                    </p>
                    <p>
                        **Código de Usuario:** {profile.userCode}
                    </p>
                    <p className="text-sm italic mt-2 text-gray-500">
                        Esta información es privada y solo visible para ti.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;