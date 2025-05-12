import { Heart, MessageCircle, Users, ImageIcon, Award, MapPin, Calendar, LinkIcon } from "lucide-react"
import "../styles/Profile.css"

const Profile = () => {
  // Datos de ejemplo para el perfil
  const profile = {
    name: "Juan Doe",
    username: "@juandoe",
    bio: "Fotógrafo profesional especializado en paisajes y retratos. Amante de la naturaleza y los viajes.",
    location: "Madrid, España",
    joined: "Junio 2022",
    website: "www.juandoe.com",
    followers: 1240,
    following: 356,
    posts: 87,
  }

  // Datos de ejemplo para las publicaciones
  const userPosts = [
    { id: 1, title: "Montañas al atardecer", likes: 120, comments: 24 },
    { id: 2, title: "Calles de la ciudad", likes: 85, comments: 12 },
    { id: 3, title: "Retrato en blanco y negro", likes: 210, comments: 32 },
    { id: 4, title: "Paisaje urbano", likes: 95, comments: 18 },
  ]

  // Datos de ejemplo para los logros
  const achievements = [
    { id: 1, name: "Fotógrafo del mes", icon: <Award size={20} /> },
    { id: 2, name: "1000+ seguidores", icon: <Users size={20} /> },
    { id: 3, name: "50+ publicaciones", icon: <ImageIcon size={20} /> },
    { id: 4, name: "Destacado en portada", icon: <Award size={20} /> },
  ]

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover">
          <img src="/placeholder.svg?height=300&width=1200" alt="Cover" />
        </div>
        <div className="profile-avatar">
          <img src="/placeholder.svg?height=150&width=150&text=JD" alt={profile.name} />
        </div>
        <div className="profile-actions">
          <button className="btn btn-primary">Seguir</button>
          <button className="btn btn-outline">Mensaje</button>
        </div>
      </div>

      <div className="profile-info-container">
        <div className="profile-info">
          <h1>{profile.name}</h1>
          <p className="username">{profile.username}</p>
          <p className="bio">{profile.bio}</p>

          <div className="profile-stats">
            <div className="stat">
              <strong>{profile.followers}</strong>
              <span>Seguidores</span>
            </div>
            <div className="stat">
              <strong>{profile.following}</strong>
              <span>Siguiendo</span>
            </div>
            <div className="stat">
              <strong>{profile.posts}</strong>
              <span>Publicaciones</span>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail">
              <MapPin size={16} />
              <span>{profile.location}</span>
            </div>
            <div className="detail">
              <Calendar size={16} />
              <span>Se unió en {profile.joined}</span>
            </div>
            <div className="detail">
              <LinkIcon size={16} />
              <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer">
                {profile.website}
              </a>
            </div>
          </div>
        </div>

        <div className="profile-achievements">
          <h2>Logros</h2>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">{achievement.icon}</div>
                <span>{achievement.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button className="tab active">Publicaciones</button>
          <button className="tab">Guardados</button>
          <button className="tab">Me gusta</button>
        </div>

        <div className="posts-grid">
          {userPosts.map((post) => (
            <div key={post.id} className="post-card card">
              <div className="post-image">
                <img src={`/placeholder.svg?height=200&width=300&text=${post.title}`} alt={post.title} />
              </div>
              <div className="post-info">
                <h3>{post.title}</h3>
                <div className="post-stats">
                  <div className="stat">
                    <Heart size={16} />
                    <span>{post.likes}</span>
                  </div>
                  <div className="stat">
                    <MessageCircle size={16} />
                    <span>{post.comments}</span>
                  </div>
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
