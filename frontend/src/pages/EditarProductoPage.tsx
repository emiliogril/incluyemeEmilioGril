import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductoForm } from "../components/ProductoForm";
import { productoService } from "../services/productoService";
import type { Producto, ProductoInput } from "../types/producto";

export const EditarProductoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        if (!id) throw new Error("ID no proporcionado");
        const data = await productoService.obtenerPorId(parseInt(id));
        setProducto(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id]);

  const handleSubmit = async (productoData: ProductoInput) => {
    if (!id) throw new Error("ID no proporcionado");
    await productoService.actualizar(parseInt(id), productoData);
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

  if (error || !producto) {
    return (
      <div className="alert alert-danger mt-5" role="alert">
        {error || "Producto no encontrado"}
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-3">
      <ProductoForm
        producto={producto}
        onSubmit={handleSubmit}
        titulo="Editar Producto"
      />
    </div>
  );
};
