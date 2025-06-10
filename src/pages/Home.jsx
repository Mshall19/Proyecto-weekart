import { Link } from "react-router-dom";
import "../home.css";
import { useState, useEffect } from "react";

function Home() {
  // Datos de ejemplo para las publicaciones
  /*
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
  */

  //aca modificas los datos de los post simulados
  const posts = [
    {
      id: 1,
      title: "Atardecer en la Playa",
      username: "user1",
      image_url: "https://images.pexels.com/photos/11311708/pexels-photo-11311708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      votes: 120,
      comments: 45,
    },
    {
      id: 2,
      title: "Montañas Nevadas",
      username: "user2",
      image_url: "src/assets/2f.jpg",
      votes: 200,
      comments: 30,
    },
    {
      id: 3,
      title: "Ciudad Nocturna",
      username: "user3",
      image_url: "src/assets/3f.jpg",
      votes: 150,
      comments: 60,
    },
    {
      id: 4,
      title: "Bosque Encantado",
      username: "user4",
      image_url: "src/assets/4f.jpg",
      votes: 180,
      comments: 50,
    },
  ];  
  // Datos de ejemplo para las categorías
  const categories = [
    { id: 9, name: "Comida", count: 543, image: "/src/assets/9c.jpg" },
    { id: 2, name: "Retratos", count: 987, image: "/src/assets/2c.jpg" },
    { id: 6, name: "Minimalismo", count: 321, image: "/src/assets/6c.jpg" },
    { id: 4, name: "Urbano", count: 756, image: "/src/assets/4c.jpg" },
  ];

  // Datos de ejemplo para los perfiles destacados
  const featuredProfiles = [
    { id: 1, name: "María López", followers: 1200, image_url: "/src/assets/1p.png" },
    { id: 2, name: "Juan Pérez", followers: 980, image_url: "/src/assets/2p.jpg" },
    { id: 3, name: "Elena Rodríguez", followers: 1500, image_url: "/src/assets/3p.jpg" },
    { id: 4, name: "David García", followers: 850, image_url: "/src/assets/4p.jpg" },

  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Busca tu inspiración y compártela con todos</h1>
          <p>
            Descubre fotografías increíbles y comparte tus mejores momentos con
            la comunidad.
          </p>
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
            Captura la esencia de la ciudad con sus luces, edificios y
            movimiento. Tienes hasta el 20 de junio para participar y compartir
            tu visión de la ciudad.
          </p>
          <div className="challenge-info">
            <span>3 días 14 horas</span>images/placeholder.jpg
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
                <img src={post.image_url || "/src/assets/1f.jpg"} alt={post.title} />
              </div>
              <div className="post-info">
                <h3>{post.title}</h3>
                <p>Por {post.username}</p>
                <div className="post-stats">
                  <div className="stat">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                        fill="#333333"
                      />
                    </svg>
                    <span>{post.votes}</span>
                  </div>
                  <div className="stat">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
              <div className="category-overlay">
                <h3>{category.name}</h3>
                <span>{category.count} fotos</span>
              </div>
            </div>
          </Link>
          ))}
        </div>
      </section>

      {/* Weekly Winner Section */}
      <section className="winner-section">
        <div className="section-header">
          <h2 className="section-title">Ganador de la semana pasada</h2>
        </div>
        <div className="posts-grid">
          <div className="post-card winner-post-card">
            <div className="post-image">
              <img src="/src/assets/1f.jpg" alt="Sueños de Neón" />
            </div>
            <div className="post-info">
              <h3>Sueños de Neón</h3>
              <p>Por Jane Doe</p>
              <p>
                Una impresionante captura de la vida nocturna de Tokio, mezclando
                elementos tradicionales con estética de neón moderna.
              </p>
              <div className="post-stats">
                <div className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                      fill="#333"
                    />
                  </svg>
                  <span>243</span>
                  <Link to="/profile" className="mobile-link">ver Perfil</Link>
                </div>
              </div>
            </div>
          </div>
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
                <img src={profile.image_url} alt={profile.name} />
              </div>
              <div className="profile-info">
                <h3>{profile.name}</h3>
                <p>{profile.followers} seguidores</p>
                <Link to="/profile" className="mobile-link">ver Perfil</Link>
                <button className="btn btn-outline">Seguir</button>
                
                
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
