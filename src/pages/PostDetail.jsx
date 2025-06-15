import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./home.css"; // reutiliza estilos base
import "./postDetail.css"; // estilos específicos para el detalle del post

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [related, setRelated] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    // Obtener post detallado
    const fetchPost = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`);
      const data = await res.json();
      setPost(data);
      // Opcional: cargar relacionados
      const rel = await fetch(`${import.meta.env.VITE_API_URL}/posts?category=${data.category_id}`);
      setRelated(await rel.json());
      // Opcional: cargar comentarios
      const com = await fetch(`${import.meta.env.VITE_API_URL}/comments/post/${id}`);
      setComments(await com.json());
    };
    fetchPost();
    // Usuario autenticado
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [id]);

  // Like/Unlike
  const handleLike = async () => {
    if (!user || !post) return;
    const liked = post.votes_users?.includes(user.id);
    if (liked) {
      await fetch(`${import.meta.env.VITE_API_URL}/votes/${user.id}/${post.id}`, { method: "DELETE" });
      setPost((prev) => ({
        ...prev,
        votes: prev.votes - 1,
        votes_users: prev.votes_users.filter((uid) => uid !== user.id),
      }));
    } else {
      await fetch(`${import.meta.env.VITE_API_URL}/votes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, post_id: post.id }),
      });
      setPost((prev) => ({
        ...prev,
        votes: prev.votes + 1,
        votes_users: [...(prev.votes_users || []), user.id],
      }));
    }
  };

  // Comentar
const handleComment = async (e) => {
    e.preventDefault();
    if (!user || !commentText.trim()) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            author_id: user.id,
            post_id: post.id,
            content: commentText,
            reply_to: null
        }),
    });
    if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [...prev, newComment]);
        setCommentText("");
    }
};

  if (!post) return <div className="home-container">Cargando...</div>;

  const liked = user && post.votes_users?.includes(user.id);

  return (
    <div className="home-container" style={{ flexDirection: "row", gap: "40px" }}>
    {/* Main Content */}
        <div style={{ flex: 2, minWidth: 0 }}>
          <div className="post-card" style={{ boxShadow: "var(--box-shadow)", borderRadius: "var(--border-radius)", background: "var(--white)", overflow: "hidden" }}>
            <div className="post-image" style={{  height: "min-content" }}>
            <img
              src={post.image_url || "/images/placeholder.jpg"}
              alt={post.title}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            </div>
            <div className="post-info" style={{ padding: 24 }}>
            <h1 style={{ fontSize: "2rem", marginBottom: 8 }}>{post.title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <span style={{ color: "var(--dark-gray)" }}>
                Por <b>{post.username}</b>
              </span>
              <span style={{ color: "#aaa" }}>{new Date(post.created_at).toLocaleDateString()}</span>
              <button
                className={`like-btn${liked ? " liked" : ""}`}
                onClick={handleLike}
                disabled={!user}
                title={user ? (liked ? "Quitar voto" : "Dar voto") : "Inicia sesión para votar"}
                style={{
                background: "none",
                border: "none",
                cursor: user ? "pointer" : "not-allowed",
                padding: 0,
                marginLeft: 12,
                display: "flex",
                alignItems: "center",
                }}
              >
                <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={liked ? "#e74c3c" : "none"}
                stroke="#e74c3c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span style={{ marginLeft: 6 }}>{post.votes}</span>
              </button>
            </div>
            <p style={{ marginBottom: 24 }}>{post.description}</p>
            <div>
              <b>Etiquetas:</b>{" "}
              {post.tags?.length
                ? post.tags.map((tag, i) => (
                  <span key={i} style={{ background: "#eee", borderRadius: 12, padding: "2px 10px", marginRight: 6, fontSize: 13 }}>
                    #{tag}
                  </span>
                ))
                : <span style={{ color: "#aaa" }}>Sin etiquetas</span>}
            </div>
            </div>
          </div>

          {/* Comentarios */}
          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: 16 }}>Comentarios</h2>
            <form onSubmit={handleComment} style={{ marginBottom: 24, display: "flex", gap: 8 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Escribe un comentario..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={!user}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" disabled={!user || !commentText.trim()}>
              Comentar
            </button>
            </form>
            <div>
            {comments.length === 0 && <div style={{ color: "#aaa" }}>Sé el primero en comentar.</div>}
            {comments.map((c) => {
              let dateString = "Fecha desconocida";
              if (c.created_at) {
                const dateObj = new Date(c.created_at);
                if (!isNaN(dateObj.getTime())) {
                dateString = dateObj.toLocaleString();
                }
              }
              return (
                <div key={c.id} style={{ marginBottom: 18, paddingBottom: 12, borderBottom: "1px solid #eee" }}>
                <b>{c.username}</b> <span style={{ color: "#aaa", fontSize: 12 }}>{dateString}</span>
                <div>{c.content}</div>
                </div>
              );
            })}
            </div>
          </div>
        </div>

        {/* Sidebar: Relacionados */}}
      <aside style={{ flex: 1, minWidth: 280 }}>
        <div style={{ background: "var(--white)", borderRadius: "var(--border-radius)", boxShadow: "var(--box-shadow)", padding: 20 }}>
          <h3 style={{ marginBottom: 16, fontSize: "1.1rem" }}>Relacionados</h3>
          {related
            .filter((r) => r.id !== post.id)
            .slice(0, 4)
            .map((r) => (
              <Link
                to={`/post/${r.id}`}
                key={r.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                  textDecoration: "none",
                  color: "var(--dark-gray)",
                }}
              >
                <img
                  src={r.image_url || "/images/placeholder.jpg"}
                  alt={r.title}
                  style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>{r.title}</div>
                  <div style={{ fontSize: 13, color: "#aaa" }}>Por {r.username}</div>
                </div>
              </Link>
            ))}
        </div>
      </aside>
    </div>
  );
}

export default PostDetail;