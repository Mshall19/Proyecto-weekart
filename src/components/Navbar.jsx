"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Menu, X } from "lucide-react"
import "../styles/Navbar.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
                fill="#8A2BE2"
              />
            </svg>
          </div>
          <span className="logo-text">WeekArt</span>
        </Link>

        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Buscar..." className="search-input" />
        </div>

        <div className="navbar-links">
          <Link to="/upload" className="upload-btn btn btn-primary">
            Subir
          </Link>
          <Link to="/login" className="login-btn">
            Iniciar sesión
          </Link>
          <Link to="/register" className="register-btn btn btn-outline">
            Registrarse
          </Link>
        </div>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/upload" className="mobile-link">
            Subir
          </Link>
          <Link to="/login" className="mobile-link">
            Iniciar sesión
          </Link>
          <Link to="/register" className="mobile-link">
            Registrarse
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
