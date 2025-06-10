import "../profile.css";
import { useState } from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState("mis-fotos");

  // 👇 Aquí agregas manualmente tus publicaciones
  const mockPosts = [
    {
      id: 1,
      image_url: "/src/assets/5f.jpg",
      title: "Sueños de Neón",
      author: "Jane Doe",
      description: "Una impresionante captura de la vida nocturna de Tokio.",
      votes: 243,
      comments: 32,
      tab: "mis-fotos",
    },
    {
      id: 2,
      image_url: "/src/assets/6f.jpg",
      title: "Horizonte Metálico",
      author: "John Smith",
      description: "Reflejos urbanos desde una perspectiva minimalista.",
      votes: 120,
      comments: 18,
      tab: "mis-fotos",
    },
    {
      id: 3,
      image_url: "/src/assets/8f.jpg",
      title: "Niebla Digital",
      author: "Alice",
      description: "Estilo cyberpunk en un callejón de Seúl.",
      votes: 200,
      comments: 22,
      tab: "me-gusta",
    },
    {
      id: 4,
      image_url: "/src/assets/7f.jpg",
      title: "Futurismo Azul",
      author: "Bob",
      description: "Edificio postmoderno reflejado en charcos.",
      votes: 98,
      comments: 12,
      tab: "me-gusta",
    },
  ];

  const filteredPosts = mockPosts.filter((post) => post.tab === activeTab);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover">
          <img src="/src/assets/1w.jpg" alt="Portada" className="cover-image" />
        </div>
        <div className="profile-info">
          <div className="profile-avatar">
            <img src="/src/assets/2p.jpg" alt="Avatar" />
          </div>
          <div className="profile-details">
            <h1>{user?.username || "Nombre de Usuario"}</h1>
            <p className="profile-bio">
              {user?.description || "Esta es una breve descripción del usuario."}
            </p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">{filteredPosts.length}</span>
                <span className="stat-label">Publicaciones</span>
              </div>
            </div>
          </div>
          <button className="btn btn-primary edit-profile-btn">Editar perfil</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === "mis-fotos" ? "active" : ""}`}
          onClick={() => setActiveTab("mis-fotos")}
        >
          Mis fotos
        </button>
        <button
          className={`tab-btn ${activeTab === "me-gusta" ? "active" : ""}`}
          onClick={() => setActiveTab("me-gusta")}
        >
          Me gusta
        </button>
        <button
          className={`tab-btn ${activeTab === "colecciones" ? "active" : ""}`}
          onClick={() => setActiveTab("colecciones")}
        >
          Colecciones
        </button>
      </div>

      {/* Contenido con fondo */}
      <div className="profile-content-with-bg">
        {filteredPosts.length > 0 ? (
          <div className="photos-grid">
            {filteredPosts.map((item) => (
              <div key={item.id} className="photo-item">
                <img src={item.image_url} alt={item.title} />
                <div className="photo-overlay">
                  <div className="photo-stats">
                    <span>❤️ {item.votes}</span>
                    <span>💬 {item.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-posts">No hay publicaciones en esta pestaña.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
