import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ProductosPage } from "./pages/ProductosPage";
import { NuevoProductoPage } from "./pages/NuevoProductoPage";
import { EditarProductoPage } from "./pages/EditarProductoPage";
import { AdminPage } from "./pages/AdminPage";
import { AdminProductosPage } from "./pages/AdminProductosPage";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/productos"
              element={
                <ProtectedRoute>
                  <AdminProductosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/productos/nuevo"
              element={
                <ProtectedRoute>
                  <NuevoProductoPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/productos/:id/editar"
              element={
                <ProtectedRoute>
                  <EditarProductoPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
