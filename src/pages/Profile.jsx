import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./profile.css"; // Asegúrate de importar tu CSS

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likesCount, setLikesCount] = useState(0);

  const [likedPosts, setLikedPosts] = useState([]);
  const [loadingLikes, setLoadingLikes] = useState(false);

  const [tab, setTab] = useState("photos");

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`);
        const data = await res.json();
        setUser(data);
      } else {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (user && user.id) {
      const fetchPosts = async () => {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/user/${user.id}`
        );
        const data = await res.json();
        setPosts(data);
      };
      fetchPosts();
    }
  }, [user]);

  // Fetch liked posts
 useEffect(() => {
    const fetchLikedPosts = async () => {
      if (!user || !user.id) return;
      setLoadingLikes(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/votes/user/${user.id}`);
        const votes = await res.json();
        setLikesCount(votes.length); // <-- Conteo de likes
        const postPromises = votes.map((vote) =>
          fetch(`${import.meta.env.VITE_API_URL}/posts/${vote.post_id}`).then((r) => r.json())
        );
        const liked = await Promise.all(postPromises);
        setLikedPosts(liked);
      } catch {
        setLikedPosts([]);
        setLikesCount(0);
      }
      setLoadingLikes(false);
    };
    if ((tab === "likes" || tab === "photos") && user && user.id) {
      fetchLikedPosts();
    }
  }, [tab, user]);

  if (!user) return <div className="profile-container">Cargando perfil...</div>;

  return (
    <div className="profile-container">
      {/* Header con portada y avatar */}
      <div className="profile-header">
        <div className="profile-cover">
          <img
            className="cover-image"
            src={user.cover_url || "../src/assets/profile_banner.png"}
            alt="Portada"
          />
        </div>
        <div className="profile-info">
          <div className="profile-avatar">
            <img
              src={user.avatar_url || "../src/assets/default-profile.png"}
              alt={user.username}
            />
          </div>
          <div className="profile-details">
            <h1>{user.username}</h1>
            <div className="profile-bio">{user.bio || "Sin biografía."}</div>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">{posts.length}</span>
                <span className="stat-label">Fotos</span>
              </div>
              <div className="stat">
                <span className="stat-value">{likesCount || 0}</span>
                <span className="stat-label">Likes</span>
              </div>
            </div>
          </div>
          {/* Botón de editar solo si es el propio usuario */}
          {!id && (
            <button className="btn btn-outline edit-profile-btn">
              Editar perfil
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`tab-btn${tab === "photos" ? " active" : ""}`}
          onClick={() => setTab("photos")}
        >
          Fotos
        </button>
        <button
          className={`tab-btn${tab === "likes" ? " active" : ""}`}
          onClick={() => setTab("likes")}
        >
          Mis me gusta
        </button>
        <button
          className={`tab-btn${tab === "about" ? " active" : ""}`}
          onClick={() => setTab("about")}
        >
          Sobre mí
        </button>
      </div>

      {/* Contenido */}
      <div className="profile-content-with-bg">
        {tab === "photos" && (
          <div className="photos-grid">
            {posts.length === 0 && (
              <div
                style={{
                  color: "#888",
                  gridColumn: "1/-1",
                  textAlign: "center",
                }}
              >
                Este usuario no ha publicado fotos aún.
              </div>
            )}
            {posts.map((post) => (
              <div className="photo-item" key={post.id}>
                <Link to={`/post/${post.id}`}>
                  <img
                    src={post.image_url || "/images/placeholder.jpg"}
                    alt={post.title}
                  />
                </Link>
                <div className="photo-overlay">
                  <div>
                    <div style={{ fontWeight: 600 }}>{post.title}</div>
                    <div className="photo-stats">
                      <span>
                        <svg
                          width="16"
                          height="16"
                          fill="#fff"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {post.votes}
                      </span>
                      <span>
                        <svg
                          width="16"
                          height="16"
                          fill="#fff"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" />
                        </svg>
                        {post.comments || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "likes" && (
          <div className="photos-grid">
            {loadingLikes ? (
              <div
                style={{
                  color: "#888",
                  gridColumn: "1/-1",
                  textAlign: "center",
                }}
              >
                Cargando me gusta...
              </div>
            ) : likedPosts.length === 0 ? (
              <div
                style={{
                  color: "#888",
                  gridColumn: "1/-1",
                  textAlign: "center",
                }}
              >
                No has dado me gusta a ninguna foto aún.
              </div>
            ) : (
              likedPosts.map((post) => (
                <div className="photo-item" key={post.id}>
                  <Link to={`/post/${post.id}`}>
                    <img
                      src={post.image_url || "/images/placeholder.jpg"}
                      alt={post.title}
                    />
                  </Link>
                  <div className="photo-overlay">
                    <div>
                      <div style={{ fontWeight: 600 }}>{post.title}</div>
                      <div className="photo-stats">
                        <span>
                          <svg
                            width="16"
                            height="16"
                            fill="#fff"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          {post.votes}
                        </span>
                        <span>
                          <svg
                            width="16"
                            height="16"
                            fill="#fff"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" />
                          </svg>
                          {post.comments || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {tab === "about" && (
          <div>
            <h2>Sobre {user.username}</h2>
            <p>{user.bio || "Este usuario no ha escrito una biografía."}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
