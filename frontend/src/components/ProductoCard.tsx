import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { Producto } from "../types/producto";

interface ProductoCardProps {
  producto: Producto;
  onEliminar?: (id: number) => void;
}

export const ProductoCard: React.FC<ProductoCardProps> = ({
  producto,
  onEliminar,
}) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
    return `http://localhost:3001${imageUrl}`;
  };

  const handleEliminar = () => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      onEliminar?.(producto.id);
    }
  };

  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={getImageUrl(producto.imagen)}
          className="card-img-top"
          alt={producto.nombre}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">{producto.descripcion}</p>
          <p className="card-text">
            <strong>
              Precio: ${producto.precio.toLocaleString("es-AR")}.-
            </strong>
          </p>
          {isAdmin && onEliminar && (
            <div className="d-flex justify-content-between mt-3">
              <Link
                to={`/admin/productos/${producto.id}/editar`}
                className="btn btn-primary"
              >
                <i className="bi bi-pencil me-1"></i>
                Editar
              </Link>
              <button onClick={handleEliminar} className="btn btn-danger">
                <i className="bi bi-trash me-1"></i>
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
