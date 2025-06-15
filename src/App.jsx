import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Importar componentes
import Navbar from './components/navbar';
import Footer from './components/footer';
import Login from './components/login';
import Signup from './components/signup';

// Importar páginas
import Home from './pages/Home';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Categories from './pages/Categories';
import PostDetail from './pages/PostDetail';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        <Navbar 
          isLoggedIn={isLoggedIn} 
          onLoginClick={() => setShowLogin(true)}
          onSignupClick={() => setShowSignup(true)}
          onLogout={handleLogout}
        />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={
              isLoggedIn ? <Profile /> : <Navigate to="/" />
            } />
            <Route path="/upload" element={
              isLoggedIn ? <Upload /> : <Navigate to="/" />
            } />
            <Route path="/categories" element={<Categories />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>
        
        <Footer />
        
        {showLogin && (
          <Login 
            onClose={() => setShowLogin(false)} 
            onLogin={handleLogin}
            onSignupClick={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
        )}
        
        {showSignup && (
          <Signup 
            onClose={() => setShowSignup(false)}
            onRegister={handleLogin}
            onLoginClick={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
