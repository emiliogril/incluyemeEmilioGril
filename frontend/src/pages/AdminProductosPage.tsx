import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productoService } from "../services/productoService";
import type { Producto } from "../types/producto";

export const AdminProductosPage = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarProductos = async () => {
    try {
      const data = await productoService.obtenerTodos();
      setProductos(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await productoService.eliminar(id);
        await cargarProductos();
      } catch (err) {
        console.error("Error al eliminar producto:", err);
        alert("Error al eliminar el producto");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productos</h2>
        <Link to="/admin/productos/nuevo" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Nuevo Producto
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>
                  <img
                    src={
                      producto.imagen.startsWith("http")
                        ? producto.imagen
                        : `http://localhost:3001${producto.imagen}`
                    }
                    alt={producto.nombre}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{producto.nombre}</td>
                <td>${producto.precio.toLocaleString("es-AR")}.-</td>
                <td>
                  <div className="btn-group">
                    <Link
                      to={`/admin/productos/${producto.id}/editar`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Editar
                    </Link>
                    <button
                      onClick={() => handleEliminar(producto.id)}
                      className="btn btn-sm btn-danger"
                    >
                      <i className="bi bi-trash me-1"></i>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
