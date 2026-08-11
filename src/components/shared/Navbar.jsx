import React, { useState } from 'react';
import { Navigate, Link, useNavigate, useLocation } from 'react-router';
import "./Navbar.css"

const Navbar= () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('pacademy_token');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('pacademy_token');
    localStorage.removeItem('player_data');
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="vanguard-nav">
      <div className="nav-container">
        {/* Brand Logo */}
        <Link to="/" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>          
          <span className="logo-text">P. ACADEMY</span>
          <span className="logo-accent">修</span>
          <span className="logo-badge">By Tomas Puello</span>
        </Link>

        {/* Hamburger Toggle (Mobile) */}
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Links de Navegación */}
        <div className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            LEADERBOARD
          </Link>
          <Link 
            to="/all_challenges" 
            className={`nav-link ${isActive('/all_challenges') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            RETOS
          </Link>
          <Link 
            to="/players" 
            className={`nav-link ${isActive('/players') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            RANKING
          </Link>

          {token ? (
            <>
              <Link 
                to="/my_challenges" 
                className={`nav-link ${isActive('/my_challenges') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                MIS RETOS
              </Link>
              <button onClick={handleLogout} className="btn-logout">
                CERRAR SESIÓN
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="btn-login-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              INGRESAR
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;