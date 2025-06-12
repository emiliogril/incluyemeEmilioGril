import axios from "axios";
import type { Producto, ProductoInput } from "../types/producto";

const API_URL = "http://localhost:3001";

// Configuración global de axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const handleError = (error: any) => {
  console.error("Error en la petición:", error);
  if (error.response) {
    console.error("Respuesta del servidor:", error.response.data);
    throw new Error(error.response.data.error || "Error del servidor");
  } else if (error.request) {
    console.error("Error de conexión:", error.request);
    throw new Error(
      "No se pudo conectar con el servidor. Verifica que el backend esté corriendo en el puerto 3001."
    );
  } else {
    console.error("Error de configuración:", error.message);
    throw new Error("Error al procesar la petición: " + error.message);
  }
};

export const productoService = {
  obtenerTodos: async (): Promise<Producto[]> => {
    try {
      console.log("Obteniendo todos los productos...");
      const response = await axiosInstance.get("/api/productos");
      console.log("Productos obtenidos:", response.data);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  obtenerPorId: async (id: number): Promise<Producto> => {
    try {
      console.log(`Obteniendo producto con ID ${id}...`);
      const response = await axiosInstance.get(`/api/productos/${id}`);
      console.log("Producto obtenido:", response.data);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  crear: async (producto: ProductoInput): Promise<Producto> => {
    try {
      console.log("Creando nuevo producto:", producto);
      const response = await axiosInstance.post("/api/productos", producto);
      console.log("Producto creado:", response.data);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  actualizar: async (
    id: number,
    producto: ProductoInput
  ): Promise<Producto> => {
    try {
      console.log(`Actualizando producto ${id}:`, producto);
      const response = await axiosInstance.put(
        `/api/productos/${id}`,
        producto
      );
      console.log("Producto actualizado:", response.data);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  eliminar: async (id: number): Promise<void> => {
    try {
      console.log(`Eliminando producto ${id}...`);
      await axiosInstance.delete(`/api/productos/${id}`);
      console.log(`Producto ${id} eliminado correctamente`);
    } catch (error) {
      throw handleError(error);
    }
  },
};
