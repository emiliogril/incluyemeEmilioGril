# Emi Flash - Tienda de Ciclismo

Este proyecto es una aplicación web full-stack para una tienda online de productos de ciclismo llamada "Emi Flash". La aplicación está construida utilizando React con TypeScript para el frontend y Node.js con Express para el backend.

## 📋 Descripción del Proyecto

Emi Flash es una tienda online especializada en productos de ciclismo donde los usuarios pueden:

- Ver un catálogo completo de productos
- Visualizar detalles específicos de cada producto
- Para administradores: gestionar el inventario (crear, editar y eliminar productos)

El proyecto demuestra la implementación de una arquitectura cliente-servidor, con separación clara entre frontend y backend, manejo de estados, subida de archivos, y persistencia de datos.

## 🏗️ Estructura del Proyecto

El proyecto está dividido en dos partes principales:

### Frontend (React + TypeScript)

- **Tecnologías principales**:

  - React 18
  - TypeScript
  - React Router para navegación
  - Bootstrap para estilos
  - Axios para peticiones HTTP

- **Estructura de archivos**:

  - `/src/components`: Componentes reutilizables
  - `/src/pages`: Páginas de la aplicación
  - `/src/services`: Servicios para comunicación con API
  - `/src/types`: Tipos de TypeScript
  - `/public`: Archivos estáticos como imágenes

- **Características implementadas**:
  - Diseño responsive usando Bootstrap
  - Gestión de estado para productos
  - Subida de imágenes
  - Formularios para creación y edición de productos

### Backend (Node.js + Express)

- **Tecnologías principales**:

  - Node.js
  - Express
  - Multer para manejo de archivos
  - CORS para manejo de políticas de mismo origen

- **Estructura de archivos**:

  - `/routes`: Definición de rutas de la API
  - `/controllers`: Lógica de negocio
  - `/models`: Estructura de datos (JSON en este caso)
  - `/public`: Archivos estáticos, incluyendo imágenes subidas

- **Características implementadas**:
  - API RESTful para productos
  - Manejo de subida de archivos para imágenes
  - Persistencia de datos en JSON
  - Headers y seguridad básica

## 🚀 Instalación y Ejecución

### Requisitos previos

- Node.js (v14 o superior)
- npm o yarn

### Pasos para instalar

1. **Clonar el repositorio**:

   ```
   git clone https://github.com/emiliogril/incluyemeEmilioGril.git
   cd incluyeme
   ```

2. **Instalar dependencias del backend**:

   ```
   cd backend
   npm install
   ```

3. **Instalar dependencias del frontend**:

   ```
   cd ../frontend
   npm install
   ```

4. **Iniciar el backend**:

   ```
   cd ../backend
   node app.js
   ```

5. **Iniciar el frontend (en una nueva terminal)**:

   ```
   cd frontend
   npm run dev
   ```

6. **Acceder a la aplicación**:
   - Frontend: http://localhost:5173
   - API Backend: http://localhost:3001

## 👤 Usuarios y Acceso

### Acceso al panel de administración

- **Usuario**: admin
- **Contraseña**: admin123
- **Ruta de acceso**: http://localhost:5173/admin

> Nota: Este es un sistema simple de autenticación para demostración. En un entorno de producción, se implementaría un sistema completo de autenticación con JWT o similar.

## 📝 Funcionalidades Principales

### Para Visitantes

- Explorar catálogo de productos
- Ver detalles de productos
- Conocer información sobre la tienda

### Para Administradores

- Gestionar productos (CRUD completo)
- Subir imágenes de productos
- Ver estadísticas básicas

## 🔧 API Endpoints

| Método | Endpoint           | Descripción                      |
| ------ | ------------------ | -------------------------------- |
| GET    | /api/productos     | Obtener todos los productos      |
| GET    | /api/productos/:id | Obtener un producto por ID       |
| POST   | /api/productos     | Crear un nuevo producto          |
| PUT    | /api/productos/:id | Actualizar un producto existente |
| DELETE | /api/productos/:id | Eliminar un producto             |
| POST   | /api/upload        | Subir una imagen                 |

## 📁 Persistencia de Datos

Los datos de los productos se almacenan en un archivo JSON (`backend/models/productos.json`) para simplificar la implementación. En un entorno de producción, se recomendaría usar una base de datos como MongoDB o PostgreSQL.

Las imágenes subidas se guardan en el directorio `backend/public/images`.

## 📱 Diseño Responsive

La aplicación está diseñada para funcionar en dispositivos de diferentes tamaños:

- Móviles (ancho < 576px)
- Tablets (576px < ancho < 992px)
- Escritorio (ancho > 992px)

## 🧪 Testing

Para ejecutar las pruebas:

```
# En el directorio frontend
npm test

# En el directorio backend
npm test
```

## 🔒 Seguridad

- Se han implementado medidas básicas de seguridad como:
  - Validación de datos tanto en cliente como en servidor
  - Políticas de CORS configuradas
  - Headers de seguridad para prevenir ataques comunes

## 🚧 Mejoras Futuras

- Implementar autenticación robusta con JWT
- Migrar a una base de datos SQL o NoSQL
- Agregar carrito de compras y proceso de checkout
- Implementar sistema de búsqueda y filtrado de productos
- Agregar tests automatizados

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo LICENSE para más detalles.

## 👨‍💻 Autor

Desarrollado por Emilio Gril para el proyecto final de Incluyeme.

---

© 2025 Emi Flash - Todos los derechos reservados.
