import { Link } from "react-router-dom"
import "../home.css"

function Home() {
  // Datos de ejemplo para las publicaciones
  const posts = [
    { id: 1, title: "Montañas al atardecer", author: "Carlos Ruiz", likes: 120, comments: 24 },
    { id: 2, title: "Calles de la ciudad", author: "Ana Martínez", likes: 85, comments: 12 },
    { id: 3, title: "Retrato en blanco y negro", author: "Miguel Sánchez", likes: 210, comments: 32 },
    { id: 4, title: "Paisaje urbano", author: "Laura Gómez", likes: 95, comments: 18 },
  ]

  // Datos de ejemplo para las categorías
  const categories = [
    { id: 1, name: "Animales", image: "/images/placeholder.jpg" },
    { id: 2, name: "Paisajes", image: "/images/placeholder.jpg" },
    { id: 3, name: "Retratos", image: "/images/placeholder.jpg" },
    { id: 4, name: "Ciudades", image: "/images/placeholder.jpg" },
  ]

  // Datos de ejemplo para los perfiles destacados
  const featuredProfiles = [
    { id: 1, name: "María López", followers: 1200 },
    { id: 2, name: "Juan Pérez", followers: 980 },
    { id: 3, name: "Elena Rodríguez", followers: 1500 },
    { id: 4, name: "David García", followers: 850 },
  ]

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Busca tu inspiración y compártela con todos</h1>
          <p>Descubre fotografías increíbles y comparte tus mejores momentos con la comunidad.</p>
          <Link to="/register" className="btn btn-primary">
            Únete ahora
          </Link>
        </div>
      </section>

      {/* Weekly Challenge Section */}
      <section className="challenge-section">
        <div className="challenge-content">
          <h2>Desafío de esta semana: Paisajes Urbanos</h2>
          <p>
            Captura la esencia de la ciudad con sus luces, edificios y movimiento. Tienes hasta el 20 de junio para
            participar y compartir tu visión de la ciudad.
          </p>
          <div className="challenge-info">
            <span>3 días 14 horas</span>
            <Link to="/challenge" className="btn btn-primary">
              Subir mi trabajo
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Posts Section */}
      <section className="posts-section">
        <div className="section-header">
          <h2 className="section-title">Publicaciones más votadas</h2>
          <Link to="/popular" className="see-more">
            Ver más
          </Link>
        </div>
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card card">
              <div className="post-image">
                <img src="/images/placeholder.jpg" alt={post.title} />
              </div>
              <div className="post-info">
                <h3>{post.title}</h3>
                <p>Por {post.author}</p>
                <div className="post-stats">
                  <div className="stat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                        fill="#333333"
                      />
                    </svg>
                    <span>{post.likes}</span>
                  </div>
                  <div className="stat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z"
                        fill="#333333"
                      />
                    </svg>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Categorías populares</h2>
          <Link to="/categories" className="see-more">
            Ver todas
          </Link>
        </div>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link to={`/category/${category.id}`} key={category.id} className="category-card">
              <div className="category-image">
                <img src={category.image || "/placeholder.svg"} alt={category.name} />
              </div>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Profiles Section */}
      <section className="profiles-section">
        <div className="section-header">
          <h2 className="section-title">Perfiles destacados</h2>
          <Link to="/profiles" className="see-more">
            Ver más
          </Link>
        </div>
        <div className="profiles-grid">
          {featuredProfiles.map((profile) => (
            <div key={profile.id} className="profile-card card">
              <div className="profile-image">
                <img src="/images/placeholder.jpg" alt={profile.name} />
              </div>
              <div className="profile-info">
                <h3>{profile.name}</h3>
                <p>{profile.followers} seguidores</p>
                <button className="btn btn-outline">Seguir</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
