// src/App.jsx (o donde tengas definido el Router)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
// 🎯 IMPORTA EL NUEVO COMPONENTE
import StudentDetailPage from './pages/StudentDetailPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* 🎯 RUTA DINÁMICA: CAPTURA EL ID DEL ESTUDIANTE */}
        <Route path="/estudiantes/:id" element={<StudentDetailPage />} />
        
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;