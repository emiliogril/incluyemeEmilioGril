import { Link } from "react-router-dom";

export const AdminPage = () => {
  return (
    <div className="container mt-5 pt-3">
      <h2 className="mb-4">Panel de Administración</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-box-seam me-2"></i>
                Gestión de Productos
              </h5>
              <p className="card-text">
                Administra el catálogo de productos: agregar, editar o eliminar
                productos.
              </p>
              <Link
                to="/admin/productos/nuevo"
                className="btn btn-primary me-2"
              >
                <i className="bi bi-plus-circle me-2"></i>
                Nuevo Producto
              </Link>
              <Link to="/admin/productos" className="btn btn-secondary">
                <i className="bi bi-list me-2"></i>
                Ver Productos
              </Link>
            </div>
          </div>
        </div>
        {/* Puedes agregar más secciones administrativas aquí */}
      </div>
    </div>
  );
};
