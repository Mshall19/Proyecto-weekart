import { Link } from "react-router-dom";
import "./home.css";
import { useState, useEffect } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        setPosts([]);
      }
    };
    getData();

    // Obtener usuario autenticado
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Manejar like/unlike
  const handleLike = async (post) => {
    if (!user) return; // Solo usuarios autenticados

    // ¿El usuario ya votó este post?
    const alreadyLiked = post.votes_users?.includes(user.id);

    if (alreadyLiked) {
      // DELETE voto
      await fetch(
        `${import.meta.env.VITE_API_URL}/votes/${user.id}/${post.id}`,
        {
          method: "DELETE",
        }
      );
      // Actualizar estado local
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id
            ? {
                ...p,
                votes: p.votes - 1,
                votes_users: p.votes_users.filter((uid) => uid !== user.id),
              }
            : p
        )
      );
    } else {
      // POST voto
      await fetch(`${import.meta.env.VITE_API_URL}/votes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, post_id: post.id }),
      });
      console.log("Voto enviado:", { user_id: user.id, post_id: post.id });
      // Actualizar estado local
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id
            ? {
                ...p,
                votes: p.votes + 1,
                votes_users: [...(p.votes_users || []), user.id],
              }
            : p
        )
      );
    }
  };

  // Datos de ejemplo para las categorías
 const categories = [
    { id: 9, name: "Comida", count: 543, image: "../src/assets/categories/9c.jpg" },
    { id: 2, name: "Retratos", count: 987, image: "../src/assets/categories/2c.jpg" },
    { id: 6, name: "Minimalismo", count: 321, image: "../src/assets/categories/6c.jpg" },
    { id: 4, name: "Urbano", count: 756, image: "../src/assets/categories/4c.jpg" },
  ];

  // Datos de ejemplo para los perfiles destacados
  const featuredProfiles = [
    { id: 1, name: "María López", followers: 1200 },
    { id: 2, name: "Juan Pérez", followers: 980 },
    { id: 3, name: "Elena Rodríguez", followers: 1500 },
    { id: 4, name: "David García", followers: 850 },
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
          {posts.map((post) => {
            // Asegúrate de que votes_users sea un array de IDs de usuarios que han votado este post
            const liked = user && post.votes_users?.includes(user.id);
            return (
              <div key={post.id} className="post-card card">
                <div className="post-image">
                  <Link to={`/post/${post.id}`}>
                    <img
                      src={post.image_url || "/images/placeholder.jpg"}
                      alt={post.title}
                    />
                  </Link>
                </div>
                <div className="post-info">
                  <h3>{post.title}</h3>
                  <p>Por {post.username}</p>
                  <div className="post-stats">
                    <div className="stat">
                      <button
                        className={`like-btn${liked ? " liked" : ""}`}
                        onClick={() => handleLike(post)}
                        disabled={!user}
                        title={
                          user
                            ? liked
                              ? "Quitar voto"
                              : "Dar voto"
                            : "Inicia sesión para votar"
                        }
                        style={{
                          background: "none",
                          border: "none",
                          cursor: user ? "pointer" : "not-allowed",
                          padding: 0,
                          marginRight: "6px",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill={liked ? "#e74c3c" : "none"}
                          stroke="#e74c3c"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
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
            );
          })}
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
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className="category-card"
            >
              <div className="category-image">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                />
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
                <img src="../src/assets/default-profile.png" alt={profile.name} />
              </div>
              <div className="profile-info">
                <h3>{profile.name}</h3>
                <p>{profile.followers} Likes</p>
                <button className="btn btn-outline">Ver Perfil</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
