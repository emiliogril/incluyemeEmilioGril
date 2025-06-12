import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <h5>Contacto</h5>
            <p>
              <i className="bi bi-telephone me-2"></i>
              +541 11 6171 8866
            </p>
            <p>
              <i className="bi bi-envelope me-2"></i>
              emiliogril@gmail.com
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Redes Sociales</h5>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/emi.flash.76/"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a
                href="https://www.instagram.com/emi.flash/"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/emilio-gril/"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-linkedin fs-4"></i>
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <h5>Ubicación</h5>
            <p>
              <i className="bi bi-geo-alt me-2"></i>
              Buenos Aires, Argentina
            </p>
          </div>
        </div>
        <hr />
        <div className="copyright">
          <p>© 2025 Emi Flash. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
