import { Carousel } from "react-bootstrap";

export const HomePage = () => {
  return (
    <>
      {/* Carousel Section */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="2"
          ></button>
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/1.jpg" className="d-block w-100" alt="Ciclismo" />
          </div>
          <div className="carousel-item">
            <img src="/images/2.jpg" className="d-block w-100" alt="Ciclismo" />
          </div>
          <div className="carousel-item">
            <img src="/images/3.jpg" className="d-block w-100" alt="Ciclismo" />
          </div>
          <div className="carousel-item">
            <img src="/images/4.jpg" className="d-block w-100" alt="Ciclismo" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Quién Soy Section */}
      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="mb-4">Quién Soy</h2>
            <p className="lead">
              Soy Emilio Gril, un apasionado del ciclismo con años de
              experiencia en el deporte. Mi objetivo es compartir mi
              conocimiento y pasión con otros ciclistas, ofreciendo los mejores
              productos y asesoramiento personalizado.
            </p>
            <p>
              En Emi Flash, nos dedicamos a proporcionar equipamiento de alta
              calidad para ciclistas de todos los niveles. Nuestra experiencia
              nos permite ofrecerte las mejores recomendaciones para mejorar tu
              rendimiento.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="/images/quiensoy.jpg"
              alt="Emilio Gril"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>
    </>
  );
};
