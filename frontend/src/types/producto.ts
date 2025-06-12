export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export interface ProductoInput {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}
