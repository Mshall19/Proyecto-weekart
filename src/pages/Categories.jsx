import { Link } from "react-router-dom"
import "./categories.css"

function Categories() {
  // Datos de ejemplo para las categorías
  const categories = [
    { id: 1, name: "Paisajes", count: 1245, image: "/images/placeholder.jpg" },
    { id: 2, name: "Retratos", count: 987, image: "/images/placeholder.jpg" },
    { id: 3, name: "Naturaleza", count: 1532, image: "/images/placeholder.jpg" },
    { id: 4, name: "Urbano", count: 756, image: "/images/placeholder.jpg" },
    { id: 5, name: "Abstracto", count: 432, image: "/images/placeholder.jpg" },
    { id: 6, name: "Minimalismo", count: 321, image: "/images/placeholder.jpg" },
    { id: 7, name: "Arquitectura", count: 654, image: "/images/placeholder.jpg" },
    { id: 8, name: "Viajes", count: 876, image: "/images/placeholder.jpg" },
    { id: 9, name: "Comida", count: 543, image: "/images/placeholder.jpg" },
    { id: 10, name: "Deportes", count: 432, image: "/images/placeholder.jpg" },
    { id: 11, name: "Animales", count: 765, image: "/images/placeholder.jpg" },
    { id: 12, name: "Macro", count: 321, image: "/images/placeholder.jpg" },
  ]

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h1>Explora por categorías</h1>
        <p>Descubre fotografías increíbles organizadas por temáticas</p>
      </div>

      <div className="categories-search">
        <div className="search-input">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
              fill="#333333"
            />
          </svg>
          <input type="text" placeholder="Buscar categorías..." />
        </div>
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

      <div className="categories-featured">
        <h2>Categorías destacadas esta semana</h2>
        <div className="featured-categories">
          <div className="featured-category">
            <div className="featured-image">
              <img src="/images/placeholder.jpg" alt="Categoría destacada" />
              <div className="featured-overlay">
                <h3>Fotografía nocturna</h3>
                <p>Explora la belleza de la noche a través de estas increíbles fotografías</p>
                <button className="btn btn-primary">Ver galería</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
