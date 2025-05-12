import { Link } from "react-router-dom"
import { Heart, MessageCircle } from "lucide-react"
import "../styles/Home.css"

const Home = () => {
  // Datos de ejemplo para las publicaciones
  const posts = [
    { id: 1, title: "Montañas al atardecer", author: "Carlos Ruiz", likes: 120, comments: 24 },
    { id: 2, title: "Calles de la ciudad", author: "Ana Martínez", likes: 85, comments: 12 },
    { id: 3, title: "Retrato en blanco y negro", author: "Miguel Sánchez", likes: 210, comments: 32 },
    { id: 4, title: "Paisaje urbano", author: "Laura Gómez", likes: 95, comments: 18 },
  ]

  // Datos de ejemplo para las categorías
  const categories = [
    { id: 1, name: "Animales", image: "/placeholder.svg?height=100&width=150" },
    { id: 2, name: "Paisajes", image: "/placeholder.svg?height=100&width=150" },
    { id: 3, name: "Retratos", image: "/placeholder.svg?height=100&width=150" },
    { id: 4, name: "Ciudades", image: "/placeholder.svg?height=100&width=150" },
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
                <img src={`/placeholder.svg?height=200&width=300&text=${post.title}`} alt={post.title} />
              </div>
              <div className="post-info">
                <h3>{post.title}</h3>
                <p>Por {post.author}</p>
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
                <img src={`/placeholder.svg?height=150&width=150&text=${profile.name.charAt(0)}`} alt={profile.name} />
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
