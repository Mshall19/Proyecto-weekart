import "../profile.css"
import { useState, useEffect } from "react";


function Profile() {



  const user = JSON.parse(localStorage.getItem('user'));
  console.log("Usuario:", user);
  console.log("nombre de usuario:", user?.username);

  const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/`);
          const data = await res.json();
          setPosts(data);
        } catch (error) {
          setPosts([]); // O manejar error como prefieras
        }
      };
      getData();
    }, []); 

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover">
          <img src="src/assets/profile_banner.png" alt="Portada" className="cover-image" />
        </div>
        <div className="profile-info">
          <div className="profile-avatar">
            <img src="/src/assets/profile.png" alt="Avatar" />
          </div>
          <div className="profile-details">
            <h1>{user?.username || "Nombre de Usuario"}</h1>
            <p className="profile-bio">
              {user?.description || "Esta es una breve descripción del usuario. Aquí puedes hablar sobre tus intereses, pasiones o cualquier cosa que quieras compartir con la comunidad."}
            </p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value"> {posts.length}</span>
                <span className="stat-label">Publicaciones</span>
              </div>
            {/*}
              <div className="stat">
                <span className="stat-value">1.5k</span>
                <span className="stat-label">Seguidores</span>
              </div>
         
              <div className="stat">
                <span className="stat-value">300</span>
                <span className="stat-label">Siguiendo</span>
              </div> */}
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
          {posts.map((item) => (
            <div key={item.id} className="photo-item">
              <img src={item.image_url} alt={`Foto ${item.id}`} />
              <div className="photo-overlay">
                <div className="photo-stats">
                  <span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                        fill="white"
                      />
                    </svg>
                    {item.votes}
                  </span>
                  <span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z"
                        fill="white"
                      />
                    </svg>
                    {item.comments}
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
