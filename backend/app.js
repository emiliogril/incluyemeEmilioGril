const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware para parsear JSON y form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para loguear todas las peticiones
app.use((req, res, next) => {
  console.log(`\n==== NUEVA PETICIÓN: ${req.method} ${req.url} ====`);
  console.log("Headers:", JSON.stringify(req.headers, null, 2));

  // Para peticiones con body (POST/PUT), imprimirlo
  if (req.method === "POST" || req.method === "PUT") {
    // Evitamos imprimir el body de la subida de archivos que es muy grande
    if (req.url !== "/api/upload") {
      console.log("Body:", JSON.stringify(req.body, null, 2));
    } else {
      console.log("Body: [Contenido de archivo]");
    }
  }

  // Capturar también la respuesta
  const oldSend = res.send;
  res.send = function (data) {
    console.log(
      `Respuesta ${res.statusCode}:`,
      typeof data === "string" && data.length < 1000
        ? data
        : "[Contenido muy largo]"
    );
    oldSend.apply(res, arguments);
  };

  next();
});

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta para subir imágenes
app.post("/api/upload", upload.single("imagen"), (req, res) => {
  try {
    console.log("Archivo subido:", req.file);
    res.json({
      mensaje: "Archivo subido correctamente",
      ruta: `/images/${req.file.filename}`,
    });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    res.status(500).json({ error: "Error al subir el archivo" });
  }
});

// Rutas
const productosRoutes = require("./routes/productos");
console.log("Registrando rutas de productos en /api/productos");
app.use("/api/productos", productosRoutes);

// Ruta principal
app.get("/", (req, res) => {
  res.json({ mensaje: "API de Emi Flash" });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Configuración de seguridad
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' http://localhost:3001 http://localhost:5173; img-src 'self' data: http://localhost:3001; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net chrome-extension:; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' data: https://cdn.jsdelivr.net; connect-src 'self' http://localhost:3001 ws://localhost:5173 http://localhost:5173;"
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API corriendo en el puerto ${PORT}`);
});
