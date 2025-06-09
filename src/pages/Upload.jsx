"use client";

import { useState } from "react";
import "../upload.css";

function Upload() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/events/`);
    const data = await response.json();
    setEvents(data);
  };
  useState(() => {
    fetchEvents();
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile || !title || !category) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Usuario no autenticado.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("event_id", category);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", selectedFile);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir la fotografía");
      }

      alert("Imagen subida con éxito");
      setSelectedFile(null);
      setPreview(null);
      setTitle("");
      setDescription("");
      setCategory("");
      setTags("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Subir nueva fotografía</h1>

      <div className="upload-content">
        <div className="upload-area">
          {preview ? (
            <div className="preview-container">
              <img
                src={preview || "/placeholder.svg"}
                alt="Vista previa"
                className="image-preview"
              />
              <button
                className="change-image-btn"
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                }}
              >
                Cambiar imagen
              </button>
            </div>
          ) : (
            <label className="drop-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <div className="drop-content">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 13V19H5V13H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13H19ZM12 12.67L15.59 9.08L17 10.5L12 15.5L7 10.5L8.41 9.08L12 12.67ZM12 3L12 13.5H10L10 3H12Z"
                    fill="#8A2BE2"
                  />
                </svg>
                <p className="drop-text">
                  Arrastra y suelta tu imagen aquí o haz clic para seleccionar
                </p>
                <p className="drop-hint">
                  Formatos soportados: JPG, PNG, GIF (Max. 10MB)
                </p>
              </div>
            </label>
          )}
        </div>

        <div className="upload-form-container">
          <form className="upload-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Título de la fotografía</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Atardecer en la playa"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe tu fotografía..."
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <select
                id="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Selecciona una categoría</option>
                {events.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Etiquetas (separadas por comas)</label>
              <input
                type="text"
                id="tags"
                className="form-control"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Ej: naturaleza, montaña, viaje"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-outline">
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!selectedFile || !title || !category}
              >
                Publicar fotografía
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload;
