import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar({ isLoggedIn, onLoginClick, onSignupClick, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="#8A2BE2"/>
            </svg>
          </div>
          <span className="logo-text">WeekArt</span>
        </Link>
        
        <div className="search-bar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#333333"/>
          </svg>
          <input type="text" placeholder="Buscar..." className="search-input" />
        </div>
        
        <div className="navbar-links">
          {isLoggedIn ? (
            <>
              <Link to="/upload" className="upload-btn btn btn-primary">Subir</Link>
              <Link to="/profile" className="profile-link">Mi Perfil</Link>
              <button onClick={onLogout} className="logout-btn">Cerrar sesión</button>
            </>
          ) : (
            <>
              <button onClick={onLoginClick} className="login-btn">Iniciar sesión</button>
              <button onClick={onSignupClick} className="register-btn btn btn-outline">Registrarse</button>
            </>
          )}
        </div>
        
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#333333"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#333333"/>
            </svg>
          )}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="mobile-menu">
          {isLoggedIn ? (
            <>
              <Link to="/upload" className="mobile-link">Subir</Link>
              <Link to="/profile" className="mobile-link">Mi Perfil</Link>
              <button onClick={onLogout} className="mobile-link">Cerrar sesión</button>
            </>
          ) : (
            <>
              <button onClick={onLoginClick} className="mobile-link">Iniciar sesión</button>
              <button onClick={onSignupClick} className="mobile-link">Registrarse</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
