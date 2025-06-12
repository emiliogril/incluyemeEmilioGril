import { ProductoForm } from "../components/ProductoForm";
import { productoService } from "../services/productoService";
import type { ProductoInput } from "../types/producto";

export const NuevoProductoPage = () => {
  const handleSubmit = async (producto: ProductoInput) => {
    await productoService.crear(producto);
  };

  return (
    <div className="container mt-5 pt-3">
      <ProductoForm onSubmit={handleSubmit} titulo="Nuevo Producto" />
    </div>
  );
};
