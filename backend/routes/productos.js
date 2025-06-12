const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

// Ruta al archivo JSON de productos
const productosPath = path.join(__dirname, "../models/productos.json");

// Función para leer productos
const leerProductos = async () => {
  try {
    const exists = await fs
      .access(productosPath)
      .then(() => true)
      .catch(() => false);
    if (!exists) {
      console.log("El archivo de productos no existe, creando uno nuevo...");
      const defaultData = { productos: [] };
      await fs.writeFile(productosPath, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    console.log("Leyendo archivo de productos...");
    const data = await fs.readFile(productosPath, "utf8");
    return JSON.parse(data || '{"productos": []}');
  } catch (error) {
    console.error("Error al leer productos:", error);
    return { productos: [] };
  }
};

// Función para guardar productos
const guardarProductos = async (data) => {
  try {
    console.log("Guardando productos...", data);
    const dirPath = path.dirname(productosPath);
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(productosPath, JSON.stringify(data, null, 2));
    console.log("Productos guardados exitosamente");
    return true;
  } catch (error) {
    console.error("Error al guardar productos:", error);
    return false;
  }
};

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    console.log("GET /productos - Obteniendo todos los productos");
    const data = await leerProductos();
    res.json(data.productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Obtener un producto por ID
router.get("/:id", async (req, res) => {
  try {
    const data = await leerProductos();
    const producto = data.productos.find(
      (p) => p.id === parseInt(req.params.id)
    );
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ error: "Error al obtener producto" });
  }
});

// Crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    console.log("========== INICIO CREACIÓN DE PRODUCTO ==========");
    console.log("Headers recibidos:", req.headers);
    console.log("Body recibido:", req.body);

    const data = await leerProductos();
    console.log("Datos actuales en productos.json:", data);

    const nuevoProducto = {
      id:
        data.productos.length > 0
          ? Math.max(...data.productos.map((p) => p.id)) + 1
          : 1,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: parseFloat(req.body.precio),
      imagen: req.body.imagen,
    };

    console.log("Nuevo producto a guardar:", nuevoProducto);
    data.productos.push(nuevoProducto);

    const guardado = await guardarProductos(data);
    console.log("Resultado del guardado:", guardado);

    if (guardado) {
      console.log("Producto guardado exitosamente:", nuevoProducto);
      console.log("========== FIN CREACIÓN DE PRODUCTO ==========");
      res.status(201).json(nuevoProducto);
    } else {
      console.error("Error al guardar el producto en el archivo");
      res.status(500).json({ error: "Error al guardar el producto" });
    }
  } catch (error) {
    console.error("Error al crear producto:", error);
    res
      .status(500)
      .json({ error: "Error al crear el producto: " + error.message });
  }
});

// Actualizar un producto
router.put("/:id", async (req, res) => {
  try {
    console.log(
      `PUT /productos/${req.params.id} - Actualizando producto:`,
      req.body
    );
    const data = await leerProductos();
    const index = data.productos.findIndex(
      (p) => p.id === parseInt(req.params.id)
    );

    if (index !== -1) {
      data.productos[index] = {
        ...data.productos[index],
        ...req.body,
        id: parseInt(req.params.id),
      };

      const guardado = await guardarProductos(data);
      if (guardado) {
        console.log(
          "Producto actualizado exitosamente:",
          data.productos[index]
        );
        res.json(data.productos[index]);
      } else {
        res.status(500).json({ error: "Error al actualizar el producto" });
      }
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

// Eliminar un producto
router.delete("/:id", async (req, res) => {
  try {
    console.log(`DELETE /productos/${req.params.id} - Eliminando producto`);
    const data = await leerProductos();
    const index = data.productos.findIndex(
      (p) => p.id === parseInt(req.params.id)
    );

    if (index !== -1) {
      data.productos.splice(index, 1);

      const guardado = await guardarProductos(data);
      if (guardado) {
        console.log("Producto eliminado exitosamente");
        res.status(204).send();
      } else {
        res.status(500).json({ error: "Error al eliminar el producto" });
      }
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

module.exports = router;
