import { LuMapPin } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import art from '../photo/unsplash-photo-1.jpg';
import art1 from '../photo/unsplash-photo-2.jpg';
import art2 from '../photo/unsplash-photo-3.jpg';

export function Home() {
  return (
    <div className="container px-4 py-5" id="custom-cards">
      <h2 className="pb-2 border-bottom">Car shop</h2>
      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        <div className="col">
          <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{ backgroundImage: `url(${art})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }}>
            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
              <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Short title, long jacket</h3>
              <ul className="d-flex list-unstyled mt-auto">
                <li className="me-auto">
                  <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white" />
                </li>
                <li className="d-flex align-items-center me-3">
                  <LuMapPin className="me-2" />
                  <small>Earth</small>
                </li>
                <li className="d-flex align-items-center">
                  <FaCalendarAlt className="me-2" />
                  <small>3d</small>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{ backgroundImage: `url(${art1})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }}>
            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
              <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Much longer title that wraps to multiple lines</h3>
              <ul className="d-flex list-unstyled mt-auto">
                <li className="me-auto">
                  <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white" />
                </li>
                <li className="d-flex align-items-center me-3">
                  <LuMapPin className="me-2" />
                  <small>Pakistan</small>
                </li>
                <li className="d-flex align-items-center">
                  <FaCalendarAlt className="me-2" />
                  <small>4d</small>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{ backgroundImage: `url(${art2})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }}>
            <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
              <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Another longer title belongs here</h3>
              <ul className="d-flex list-unstyled mt-auto">
                <li className="me-auto">
                  <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white" />
                </li>
                <li className="d-flex align-items-center me-3">
                  <LuMapPin className="me-2" />
                  <small>California</small>
                </li>
                <li className="d-flex align-items-center">
                  <FaCalendarAlt className="me-2" />
                  <small>5d</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}