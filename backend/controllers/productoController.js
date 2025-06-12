const fs = require("fs").promises;
const path = require("path");

const productosPath = path.join(__dirname, "../models/productos.json");

// Función auxiliar para leer el archivo JSON
async function leerProductos() {
  const data = await fs.readFile(productosPath, "utf8");
  return JSON.parse(data);
}

// Función auxiliar para escribir en el archivo JSON
async function escribirProductos(productos) {
  await fs.writeFile(productosPath, JSON.stringify(productos, null, 2));
}

exports.listarProductos = async (req, res) => {
  try {
    const data = await leerProductos();
    res.json(data.productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cargar los productos" });
  }
};

exports.obtenerProducto = async (req, res) => {
  try {
    const data = await leerProductos();
    const producto = data.productos.find(
      (p) => p.id === parseInt(req.params.id)
    );

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cargar el producto" });
  }
};

exports.mostrarFormularioNuevo = (req, res) => {
  res.render("nuevoProducto", { title: "Nuevo Producto" });
};

exports.crearProducto = async (req, res) => {
  try {
    const data = await leerProductos();
    const nuevoId =
      data.productos.length > 0
        ? Math.max(...data.productos.map((p) => p.id)) + 1
        : 1;

    const nuevoProducto = {
      id: nuevoId,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: parseFloat(req.body.precio),
      imagen: req.body.imagen,
    };

    data.productos.push(nuevoProducto);
    await escribirProductos(data);

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

exports.mostrarFormularioEditar = async (req, res) => {
  try {
    const data = await leerProductos();
    const producto = data.productos.find(
      (p) => p.id === parseInt(req.params.id)
    );

    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("editarProducto", {
      producto,
      title: "Editar Producto",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar el producto");
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const data = await leerProductos();
    const index = data.productos.findIndex(
      (p) => p.id === parseInt(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    data.productos[index] = {
      ...data.productos[index],
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: parseFloat(req.body.precio),
      imagen: req.body.imagen,
    };

    await escribirProductos(data);
    res.json(data.productos[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    const data = await leerProductos();
    const productoExistente = data.productos.find(
      (p) => p.id === parseInt(req.params.id)
    );

    if (!productoExistente) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    data.productos = data.productos.filter(
      (p) => p.id !== parseInt(req.params.id)
    );
    await escribirProductos(data);
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};
