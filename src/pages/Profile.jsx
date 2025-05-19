import "../profile.css"

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover">
          <img src="/images/placeholder.jpg" alt="Portada" className="cover-image" />
        </div>
        <div className="profile-info">
          <div className="profile-avatar">
            <img src="/images/placeholder.jpg" alt="Avatar" />
          </div>
          <div className="profile-details">
            <h1>Nombre de Usuario</h1>
            <p className="profile-bio">
              Fotógrafo aficionado | Amante de la naturaleza | Explorando el mundo a través de mi lente
            </p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">125</span>
                <span className="stat-label">Publicaciones</span>
              </div>
              <div className="stat">
                <span className="stat-value">1.5k</span>
                <span className="stat-label">Seguidores</span>
              </div>
              <div className="stat">
                <span className="stat-value">300</span>
                <span className="stat-label">Siguiendo</span>
              </div>
            </div>
          </div>
          <button className="btn btn-primary edit-profile-btn">Editar perfil</button>
        </div>
      </div>

      <div className="profile-tabs">
        <button className="tab-btn active">Mis fotos</button>
        <button className="tab-btn">Me gusta</button>
        <button className="tab-btn">Colecciones</button>
      </div>

      <div className="profile-content">
        <div className="photos-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div key={item} className="photo-item">
              <img src="/images/placeholder.jpg" alt={`Foto ${item}`} />
              <div className="photo-overlay">
                <div className="photo-stats">
                  <span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                        fill="white"
                      />
                    </svg>
                    45
                  </span>
                  <span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z"
                        fill="white"
                      />
                    </svg>
                    12
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
