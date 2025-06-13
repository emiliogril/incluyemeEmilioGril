import { ProductoForm } from "../components/ProductoForm";

export const NuevoProductoPage = () => {
  return (
    <div className="container mt-5 pt-3">
      <ProductoForm modo="crear" />
    </div>
  );
};
