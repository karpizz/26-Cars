import { Link } from "react-router-dom";
import { FaTwitter, FaTwitch, FaFacebookF } from "react-icons/fa";

export function Footer() {
    return (
        <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
      <Link to="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
      </Link>
      <span className="mb-3 mb-md-0 text-body-secondary">© 2024 Company, Inc</span>
    </div>
    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><Link className="text-body-secondary" to="/"><FaTwitter></FaTwitter></Link></li>
      <li className="ms-3"><Link className="text-body-secondary" to="/"><FaTwitch></FaTwitch></Link></li>
      <li className="ms-3"><Link className="text-body-secondary" to="/"><FaFacebookF></FaFacebookF></Link></li>
    </ul>
  </footer>
</div>
    )
}