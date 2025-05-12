"use client"

import { useState } from "react"
import { UploadIcon, ImageIcon, X } from "lucide-react"
import "../styles/Upload.css"

const Upload = () => {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)

  // Manejar el arrastre de archivos
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Manejar la caída de archivos
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  // Manejar la selección de archivos
  const handleChange = (e) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  // Procesar el archivo seleccionado
  const handleFile = (file) => {
    setSelectedFile(file)

    // Crear una URL para la vista previa
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  // Eliminar el archivo seleccionado
  const removeFile = () => {
    setSelectedFile(null)
    setPreview(null)
  }

  return (
    <div className="upload-container">
      <h1>Subir una nueva imagen</h1>
      <p className="upload-description">Comparte tus mejores fotografías con la comunidad</p>

      <div className="upload-content">
        <div className="upload-form">
          {!selectedFile ? (
            <div
              className={`upload-area ${dragActive ? "active" : ""}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input type="file" id="file-upload" className="upload-input" accept="image/*" onChange={handleChange} />
              <label htmlFor="file-upload" className="upload-label">
                <div className="upload-icon">
                  <UploadIcon size={40} />
                </div>
                <p>Arrastra y suelta tu imagen aquí o</p>
                <button className="btn btn-primary">Seleccionar archivo</button>
                <p className="upload-hint">PNG, JPG o GIF (máx. 10MB)</p>
              </label>
            </div>
          ) : (
            <div className="preview-container">
              <div className="preview-header">
                <h3>Vista previa</h3>
                <button className="remove-btn" onClick={removeFile}>
                  <X size={20} />
                </button>
              </div>
              <div className="preview-image">
                <img src={preview || "/placeholder.svg"} alt="Preview" />
              </div>
              <div className="file-info">
                <div className="file-icon">
                  <ImageIcon size={20} />
                </div>
                <div className="file-details">
                  <p className="file-name">{selectedFile.name}</p>
                  <p className="file-size">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}

          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input type="text" id="title" className="form-control" placeholder="Añade un título a tu imagen" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea id="description" className="form-control" rows="4" placeholder="Describe tu imagen"></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <select id="category" className="form-control">
                <option value="">Selecciona una categoría</option>
                <option value="landscapes">Paisajes</option>
                <option value="portraits">Retratos</option>
                <option value="urban">Urbano</option>
                <option value="nature">Naturaleza</option>
                <option value="animals">Animales</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Etiquetas</label>
              <input type="text" id="tags" className="form-control" placeholder="Añade etiquetas separadas por comas" />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn btn-outline">Cancelar</button>
            <button className="btn btn-primary">Publicar</button>
          </div>
        </div>

        <div className="upload-tips">
          <h3>Consejos para mejores publicaciones</h3>
          <ul>
            <li>Utiliza imágenes de alta calidad para destacar</li>
            <li>Añade un título descriptivo y atractivo</li>
            <li>Incluye una descripción detallada de tu imagen</li>
            <li>Selecciona la categoría adecuada para mayor visibilidad</li>
            <li>Usa etiquetas relevantes para que otros usuarios encuentren tu contenido</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Upload
