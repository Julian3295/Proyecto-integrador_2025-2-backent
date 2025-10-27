// src/components/Footer.jsx
import React from 'react';

function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-content-container">

                {/* 1. Derechos de autor */}
                <p className="copyright-text">
                    © 2025 BrainNote — Todos los derechos reservados
                </p>

                {/* 2. Enlaces de navegación */}
                <div className="footer-links">
                    {/* Nota: Estos son enlaces ficticios. Puedes usar <Link> si tienes rutas */}
                    <a href="#" className="footer-link">Sobre nosotros</a>
                    <a href="#" className="footer-link">Contacto</a>
                    <a href="#" className="footer-link">Ayuda</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;