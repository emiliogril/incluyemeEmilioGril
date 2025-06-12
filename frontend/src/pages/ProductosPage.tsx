import { useState, useEffect } from "react";
import { ProductoCard } from "../components/ProductoCard";
import { productoService } from "../services/productoService";
import type { Producto } from "../types/producto";

export const ProductosPage = () => {
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
    try {
      await productoService.eliminar(id);
      await cargarProductos();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      alert("Error al eliminar el producto");
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
      <h1 className="text-center mb-4">Catálogo de Productos</h1>

      {productos.length === 0 ? (
        <div className="alert alert-info">No hay productos disponibles.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {productos.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onEliminar={handleEliminar}
            />
          ))}
        </div>
      )}
    </div>
  );
};
