import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Producto, ProductoInput } from "../types/producto";
import { productoService } from "../services/productoService";

interface ProductoFormProps {
  producto?: Producto;
  modo: "crear" | "editar";
}

const BACKEND_URL = "http://localhost:3001";

export const ProductoForm: React.FC<ProductoFormProps> = ({
  producto,
  modo,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductoInput>({
    nombre: "",
    descripcion: "",
    precio: 0,
    imagen: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagen: producto.imagen.replace(BACKEND_URL, ""),
      });
      setPreviewUrl(
        producto.imagen.startsWith("http")
          ? producto.imagen
          : `${BACKEND_URL}${producto.imagen.startsWith("/") ? "" : "/"}${
              producto.imagen
            }`
      );
    }
  }, [producto]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newValue = name === "precio" ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Archivo seleccionado:", file.name);
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      setFormData((prev) => ({
        ...prev,
        imagen: `/images/${file.name}`,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let imagePath = formData.imagen;

      if (selectedFile) {
        console.log("Subiendo archivo:", selectedFile.name);
        const formDataFile = new FormData();
        formDataFile.append("imagen", selectedFile);

        const uploadResponse = await fetch(`${BACKEND_URL}/api/upload`, {
          method: "POST",
          body: formDataFile,
        });

        if (!uploadResponse.ok) {
          throw new Error("Error al subir la imagen");
        }

        const uploadResult = await uploadResponse.json();
        console.log("Respuesta de subida de imagen:", uploadResult);
        imagePath = uploadResult.ruta;
      }

      const productoData: ProductoInput = {
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        precio: parseFloat(formData.precio.toString()),
        imagen: imagePath,
      };

      console.log("Enviando datos del producto:", productoData);

      // Intento crear el producto directamente usando fetch
      try {
        console.log(
          "Haciendo petición POST directa a",
          `${BACKEND_URL}/api/productos`
        );
        const response = await fetch(`${BACKEND_URL}/api/productos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productoData),
        });

        console.log("Status de la respuesta:", response.status);
        if (!response.ok) {
          const errorData = await response.text();
          console.error("Error del servidor:", errorData);
          throw new Error(`Error del servidor: ${errorData}`);
        }

        const nuevoProducto = await response.json();
        console.log("Producto creado con POST directo:", nuevoProducto);

        // También intentamos con el servicio
        if (modo === "crear") {
          const nuevoProductoService = await productoService.crear(
            productoData
          );
          console.log("Producto creado con servicio:", nuevoProductoService);
        } else if (producto) {
          const productoActualizado = await productoService.actualizar(
            producto.id,
            productoData
          );
          console.log("Producto actualizado:", productoActualizado);
        }
      } catch (fetchError) {
        console.error("Error en fetch directo:", fetchError);
        throw fetchError;
      }

      navigate("/admin/productos");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      setError(
        error instanceof Error ? error.message : "Error al guardar el producto"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 pt-3">
      <h2 className="mb-4">
        {modo === "crear" ? "Nuevo Producto" : "Editar Producto"}
      </h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            rows={3}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="precio" className="form-label">
            Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">
            Imagen
          </label>
          <div className="input-group">
            <input
              type="file"
              className="form-control"
              id="imagen"
              accept="image/*"
              onChange={handleFileChange}
              required={modo === "crear"}
            />
          </div>
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Vista previa"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
                className="img-thumbnail"
              />
            </div>
          )}
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Guardando...
              </>
            ) : modo === "crear" ? (
              "Crear"
            ) : (
              "Guardar"
            )}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/productos")}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
