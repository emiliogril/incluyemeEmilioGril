# Instrucciones para la Entrega Final

## Estructura de Archivos a Entregar

Tu entrega final debe incluir los siguientes archivos y carpetas:

```
incluyeme/
│
├── README.md                   # Documentación principal del proyecto
├── .gitignore                  # Archivos y carpetas a ignorar en control de versiones
│
├── frontend/                   # Carpeta del frontend en React/TypeScript
│   ├── public/                 # Archivos estáticos públicos (favicon, index.html, etc.)
│   ├── src/                    # Código fuente del frontend
│   │   ├── components/         # Componentes React
│   │   ├── pages/              # Páginas de la aplicación
│   │   ├── services/           # Servicios para comunicación con API
│   │   ├── types/              # Tipos TypeScript
│   │   └── ...
│   ├── package.json            # Dependencias del frontend
│   └── ...
│
└── backend/                    # Carpeta del backend en Node.js/Express
    ├── public/                 # Archivos públicos (imágenes subidas)
    │   └── images/             # Imágenes de productos
    ├── routes/                 # Definición de rutas API
    ├── controllers/            # Controladores de la lógica de negocio
    ├── models/                 # Modelos de datos
    ├── app.js                  # Archivo principal del servidor
    ├── package.json            # Dependencias del backend
    └── ...
```

## Lo que NO debes incluir

1. **node_modules**: No incluyas esta carpeta en tu entrega. Es muy pesada y se genera automáticamente al ejecutar `npm install`. Asegúrate de incluirla en `.gitignore`.

2. **Archivos de entorno (.env)**: Si tienes variables de entorno sensibles, no las incluyas directamente. En su lugar, proporciona un archivo `.env.example` como plantilla.

3. **Archivos temporales o logs**: Excluye estos archivos que no son parte del código fuente.

## Preparar la Entrega

1. **Limpia el Proyecto**:

   ```bash
   # En la carpeta frontend
   npm run build   # Genera una versión optimizada si es necesario

   # Elimina node_modules en ambas carpetas (se reinstalarán en la evaluación)
   rm -rf frontend/node_modules
   rm -rf backend/node_modules
   ```

2. **Comprime el Proyecto**:

   ```bash
   # Desde la carpeta raíz del proyecto
   zip -r incluyeme_proyecto_final.zip . -x "*/node_modules/*" "*/build/*" "*/dist/*"
   ```

3. **Verifica el ZIP**: Asegúrate de que el archivo comprimido incluya todo el código fuente necesario para ejecutar el proyecto, pero no archivos innecesarios.

## Instrucciones de Instalación para el Evaluador

Incluye estas instrucciones en tu README.md para que el evaluador pueda instalar y ejecutar tu proyecto:

```
# Instalar dependencias del backend
cd backend
npm install
npm run dev

# En otra terminal, instalar dependencias del frontend
cd frontend
npm install
npm run dev
```

## Requisitos de Ejecución

- Node.js (v14 o superior recomendado)
- npm o yarn
- Navegador web moderno (Chrome, Firefox, Edge, etc.)
