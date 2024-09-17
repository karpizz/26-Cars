import { useState } from "react"
import defaultImg from '../photo/carusel1.jpg';

export function Carousel() {
  const [carousel1, changeCarousel1] = useState(false);

  return (

    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      <h2 className="pb-2 border-bottom my-5">Car shop</h2>
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3" className="" aria-current="true"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={defaultImg} alt="" style={{height: '400px',objectFit: 'cover'}}  />
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={defaultImg} alt="" style={{height: '400px',objectFit: 'cover'}}  />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={defaultImg} alt="" style={{height: '400px',objectFit: 'cover'}}  />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}