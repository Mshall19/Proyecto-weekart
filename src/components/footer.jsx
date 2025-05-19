import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="#FFFFFF"/>
          </svg>
          <span>WeekArt</span>
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h4>Empresa</h4>
            <Link to="/about">Sobre nosotros</Link>
            <Link to="/privacy">Privacidad</Link>
            <Link to="/terms">Términos</Link>
          </div>
          
          <div className="footer-section">
            <h4>Comunidad</h4>
            <Link to="/blog">Blog</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/support">Soporte</Link>
          </div>
          
          <div className="footer-section">
            <h4>Social</h4>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2023 WeekArt. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
